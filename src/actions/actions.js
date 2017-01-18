import * as types from '../actions/action_types'

export function updateStaffInfo(payload,staffId){
  return {
    id:staffId,
    type: types.UPDATE_STAFF_INFO,
    payload
  }
}
export function toggleStaffUp(){
  return {
    type: types.TOGGLE_STAFF_UP
  }
}
export function setActiveStaffId(staffId){
  return {
    type: types.SET_ACTIVE_STAFF_ID,
    payload: staffId
  }
}

