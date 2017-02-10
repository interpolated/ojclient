import * as types from './projects_actions'
import {merge} from 'lodash'

// state shape
// id:{projId:{date:number,date:number,date:number,...}}

export function updateStaffInfo(state = {}, action){
  switch(action.type){
  case types.SET_STAFF_ALLOCATION:
        return merge(state,{[action.staffId]: action.payload})
  default:
    return state
  }
}