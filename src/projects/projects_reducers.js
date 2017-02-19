import * as types from './projects_actions'
import {merge,assign} from 'lodash'

// state shape
// id:{projId:{date:number,date:number,date:number,...}}

export function updateActiveProjectInfo(state = {}, action){
  switch(action.type){
  case types.UPDATE_ACTIVE_PROJECT_INFO:
          // return merge(state,action.payload)
          return assign({}, merge(state,action.payload));
  default:
    return state
  }
}

export function setActiveProjectAllocations(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_PROJECT_ALLOCATIONS:
      return action.payload 
    default:
     return state
  }
}

export function updateTempAllocation(state = {}, action){
  switch(action.type){
  case types.UPDATE_TEMP_ALLOCATION:
          return merge(state,action.payload)
  default:
    return state
  }
}


export function setActiveProjectAllocation(state = {}, action){
  switch(action.type){
  case types.SET_PROJECT_ALLOCATION:
          return action.payload
  default:
    return state
  }
}

