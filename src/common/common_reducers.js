import * as types from './common_actions'
import {staffInfo} from '../assets/staff_list'
import {merge} from 'lodash'

export function updateStaffInfo(state = {name:'',title:'',deskId:''}, action){
  switch(action.type){
  case types.UPDATE_STAFF_INFO:
        return merge(state,{[action.staffId]: action.payload})
  case types.UPDATE_ALL_STAFF_INFO:
        return action.payload
  default:
    return state
  }
}


export function setActiveStaffId(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_STAFF_ID:
      return action.payload 
    default:
     return state
  }
}
