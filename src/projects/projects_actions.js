import {BASE_URL} from '../constants.js';
import axios from 'axios';
import {normalize, schema}  from 'normalizr';
import R from 'ramda'
import moment from 'moment'    
import {batchActions} from 'redux-batched-actions';


// projects
export const UPDATE_ACTIVE_PROJECT_INFO   = 'UPDATE_ACTIVE_PROJECT_INFO'
export const SET_ACTIVE_PROJECT_ID = 'SET_ACTIVE_PROJECT_ID'
export const SET_ACTIVE_PROJECT_ALLOCATIONS = 'SET_ACTIVE_PROJECT_ALLOCATIONS'

// alllocations
export const UPDATE_TEMP_ALLOCATION = 'UPDATE_TEMP_ALLOCATION'
export const SET_PROJECT_ALLOCATION = 'SET_PROJECT_ALLOCATION'
export const UPDATE_PROJECT_ALLOCATION = 'UPDATE_PROJECT_ALLOCATION'
export const REMOVE_PROJECT_ALLOCATION = 'REMOVE_PROJECT_ALLOCATION'

// milestones
export const SET_ACTIVE_PROJECT_MILESTONES = 'SET_ACTIVE_PROJECT_MILESTONES'
export const UPDATE_PROJECT_MILESTONE = 'UPDATE_PROJECT_MILESTONE'
export const REMOVE_PROJECT_MILESTONE = 'REMOVE_PROJECT_MILESTONE'

//update a project
export function updateActiveProjectInfo(payload){
  // when updateActiveProjInfo also set projAllocation string.
  return function(dispatch){
      dispatch(
        {
          type: UPDATE_ACTIVE_PROJECT_INFO,
          payload
        })
    }
}


// Milestones

export function updateProjectMilestone(payload){
  return{
    type: UPDATE_PROJECT_MILESTONE,
    payload
  }
}

export function removeProjectMilestone(id){
  return{
    type: REMOVE_PROJECT_MILESTONE,
    id
  }
}

// Allocations

export function updateTempAllocation(payload){
  return{
    type: UPDATE_TEMP_ALLOCATION,
    payload
  }
}

// Project Allocations

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

export function removeProjectAllocation(staffId){
  return{
    type:REMOVE_PROJECT_ALLOCATION,
    staffId
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
    axios.get(`${BASE_URL}allocations/?to_project=${id}`,{
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
    axios.get(`${BASE_URL}milestones/?of_project=${id}`,{
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
