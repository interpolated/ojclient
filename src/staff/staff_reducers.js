import * as types from './staff_actions';


export function setActiveSkills(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_SKILLS:
      return action.payload 
    default:
     return state
  }
}
export function setActiveAllocations(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_ALLOCATIONS:
      return action.payload 
    default:
     return state
  }
}
