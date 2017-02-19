import * as types from './staff_actions';


export function setActiveSkills(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_SKILLS:
      return action.payload 
    default:
     return state
  }
}
export function setActiveStaffAllocations(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_STAFF_ALLOCATIONS:
      return action.payload 
    default:
     return state
  }
}

