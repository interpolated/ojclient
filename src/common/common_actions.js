 import axios from 'axios';
import {normalize, schema}  from 'normalizr';    
import {BASE_URL} from '../constants.js'
import {merge} from 'lodash'
import R from 'ramda'
export const UPDATE_STAFF_INFO = "UPDATE_STAFF_INFO"
export const UPDATE_ALL_STAFF_INFO = "UPDATE_ALL_STAFF_INFO"
export const SET_ACTIVE_STAFF_ID = "SET_ACTIVE_STAFF_ID"

export function updateStaffInfo(payload,staffId){
  return {
    staffId,
    type: UPDATE_STAFF_INFO,
    payload
  }
}



export function fetchStaffInfo(authToken){
  return dispatch=>{
    axios.get('http://localhost:8000/api/staffmembers/',{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // console.log(response)
      // this adds entity.staffMembers and will look for staffMembers:[list]
      const staffMember = new schema.Entity('staffMembers');
      // this makes the whole schema -> in this case only one entity
      const staffSchema = { staffMembers: [ staffMember ] }
      // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      const normalizedData = normalize({staffMembers: response.data}, staffSchema);
      // console.log(normalizedData)
      dispatch(
        {
          type:UPDATE_ALL_STAFF_INFO,
          // need to normalize data here using normalizr
          payload:normalizedData.entities.staffMembers
        }
      )
    }).catch(error=>{
      // console.log(error)
    })
  }
}

export function setActiveStaffId(staffId){
  return {
    type: SET_ACTIVE_STAFF_ID,
    payload: staffId
  }
}


//get project id

// if response


// if no response
  // post new to projects: http://localhost:8000/api/projects/

export const createOrUpdate=(type,data,authToken)=>{

  var APItype = type+'s'
  if (type == 'project'){
    var filter = `projectId=${data.projectId}`
  }
  if (type == 'staffMember'){
    var filter = `id=${data.id}`
  }  
  // if we are dealing with an allocation already created it will have an id, we modify the data in place
  // then this will work
  var newData=data
  if (type == 'allocation'){
    var filter = `staffmember_id=${data.staffmember_id}&to_project=${data.to_project}`
  }
  console.log('calling API '+type)
  axios.get ( `${BASE_URL}${APItype}/?${filter}`,{
    headers:{Authorization: `Token ${authToken}`}
  }).then(response=>{
      if(!!response.data.length){
        axios.put(`${BASE_URL}${APItype}/${response.data[0].id}/`, data,{
          headers:{Authorization: `Token ${authToken}`}
        })
      }else{
        axios.post(`${BASE_URL}${APItype}/`, newData,{
            headers:{Authorization: `Token ${authToken}`}
        })
      }
  })
}

