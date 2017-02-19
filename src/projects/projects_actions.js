import {BASE_URL} from '../constants.js';
import axios from 'axios';
import {normalize, schema}  from 'normalizr';
import R from 'ramda'
import moment from 'moment'    
import {batchActions} from 'redux-batched-actions';

export const UPDATE_ACTIVE_PROJECT_INFO   = "UPDATE_ACTIVE_PROJECT_INFO"
export const SET_ACTIVE_PROJECT_ID = "SET_ACTIVE_PROJECT_ID"
export const SET_ACTIVE_PROJECT_ALLOCATIONS = "SET_ACTIVE_PROJECT_ALLOCATIONS"
export const UPDATE_TEMP_ALLOCATION = "UPDATE_TEMP_ALLOCATION"
export const SET_PROJECT_ALLOCATION = "SET_PROJECT_ALLOCATION"

//update a project
export  function updateActiveProjectInfo(payload){
  // when updateActiveProjInfo also set projAllocation string.
  return function(dispatch){
      dispatch(
        {
          type: UPDATE_ACTIVE_PROJECT_INFO,
          payload
        })
      dispatch({
        type:SET_PROJECT_ALLOCATION,
        // need to normalize data here using normalizr
        payload:projToAllocation(payload)
      })
    }
}

export function updateTempAllocation(payload){
  return{
    type: UPDATE_TEMP_ALLOCATION,
    payload

  }
}

export function setProjectAllocation(payload){
  return{
    type: SET_PROJECT_ALLOCATION,
    payload

  }
}


const projToAllocation=(project)=>{
// helper function turn project into projDay series
    const start = new Date(project.startdate);
    const end = new Date(project.enddate);
    const range = moment.range(start, end);
    const days = Array.from(range.by('day'));
    const tA = R.mergeAll(days.map(m=>({[parseInt(m.format('YYYYMMDD'))]:0})))
    return(Object.values(R.mapObjIndexed((val,key,obj)=>({day:parseInt(key),projAllocation:1}),tA)))
}


// get a project
export function fetchProject(authToken,projectId){
  return dispatch=>{
    axios.get(`${BASE_URL}projects/?projectId=${projectId}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // // this adds entity.staffMembers and will look for staffMembers:[list]
      // const staffMember = new schema.Entity('staffMembers');
      // // this makes the whole schema -> in this case only one entity
      // const staffSchema = { staffMembers: [ staffMember ] }
      // // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      // const normalizedData = normalize({staffMembers: response.data}, staffSchema);
      // console.log(normalizedData)
        console.log('whaaa')
        dispatch(batchActions[
          {
            type:UPDATE_ACTIVE_PROJECT_INFO,
            // need to normalize data here using normalizr
            payload:response[0]
          },
          {
            type:SET_PROJECT_ALLOCATION,
            // need to normalize data here using normalizr
            payload:projToAllocation(response[0])
          }
        ])
      }).catch(error=>{
      console.log(error)
    })
  }
}

// get a projects allocations
export function fetchActiveProjectAllocations(authToken,id){
  return dispatch=>{
    axios.get(`http://localhost:8000/api/allocations/?to_project=${id}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // // this adds entity.staffMembers and will look for staffMembers:[list]
      // const allocation = new schema.Entity('allocations');
      // // this makes the whole schema -> in this case only one entity
      // const allocationSchema = { allocations: [ allocation ] }
      // // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      // const normalizedData = normalize({allocations: response.data}, allocationSchema);
      dispatch(
        {
          type:SET_ACTIVE_PROJECT_ALLOCATIONS,
          // need to normalize data here using normalizr
          payload:response.data
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}

