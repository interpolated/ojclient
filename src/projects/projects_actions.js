import {BASE_URL} from '../constants.js';
import axios from 'axios';
import {normalize, schema}  from 'normalizr';
import R from 'ramda'
import moment from 'moment'    
import {batchActions} from 'redux-batched-actions';

export const UPDATE_ACTIVE_PROJECT_INFO   = 'UPDATE_ACTIVE_PROJECT_INFO'
export const SET_ACTIVE_PROJECT_ID = 'SET_ACTIVE_PROJECT_ID'
export const SET_ACTIVE_PROJECT_ALLOCATIONS = 'SET_ACTIVE_PROJECT_ALLOCATIONS'
export const UPDATE_TEMP_ALLOCATION = 'UPDATE_TEMP_ALLOCATION'
export const SET_PROJECT_ALLOCATION = 'SET_PROJECT_ALLOCATION'
export const UPDATE_PROJECT_ALLOCATION = 'UPDATE_PROJECT_ALLOCATION'
export const SET_ACTIVE_PROJECT_MILESTONES = 'SET_ACTIVE_PROJECT_MILESTONES'

//update a project
export  function updateActiveProjectInfo(payload){
  // when updateActiveProjInfo also set projAllocation string.
  return function(dispatch){
      dispatch(
        {
          type: UPDATE_ACTIVE_PROJECT_INFO,
          payload
        })
    }
}

export function updateTempAllocation(payload,startdate,enddate){
  return{
    type: UPDATE_TEMP_ALLOCATION,
    startdate,
    enddate,
    payload
  }
}

export function updateProjectAllocation(staffId,payload){
  return function(dispatch){
    dispatch(
        {
          type: UPDATE_PROJECT_ALLOCATION,
          payload,
          staffId
        }
      )
  }
}


// ASYNCHRONOUS ACTIONS

// get a project
export function fetchProject(authToken,projectId){
  return dispatch=>{
    axios.get(`${BASE_URL}projects/?projectId=${projectId}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
        dispatch(batchActions[
          {
            type:UPDATE_ACTIVE_PROJECT_INFO,
            payload:response[0]
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
      dispatch(
        {
          type:SET_ACTIVE_PROJECT_ALLOCATIONS,
          payload:response.data
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}

// get a projects milestones
export function fetchActiveProjectMilestones(authToken,id){
  return dispatch=>{
    axios.get(`http://localhost:8000/api/milestones/?of_project=${id}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      dispatch(
        {
          type:SET_ACTIVE_PROJECT_MILESTONES,
          payload:response.data
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}
