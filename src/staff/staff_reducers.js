import R from 'ramda'
import {cloneDeep} from 'lodash'
import * as types from './staff_actions';

export function setActiveSkills(state='', action){
  switch(action.type){
    case types.SET_ACTIVE_SKILLS:
      return action.payload 
    default:
     return state
  }
}
export function setActiveStaffAllocations(state=[], action){
  switch(action.type){
    case types.SET_ACTIVE_STAFF_ALLOCATIONS:
      return action.payload 
    case types.UPDATE_STAFF_ALLOCATION:
        const newState=cloneDeep(state)
        var index = R.findIndex(R.propEq('to_project',action.projectId),newState)
        console.log("updating index ===" + index)
        if(index<0){
          console.log("no index found so appending temp to state")
          return(R.append(action.payload,newState))
        }else{
        // console.log(R.update(R.findIndex(R.propEq('staffmember',action.staffId),newState),action.payload,newState))
        console.log(R.update(R.findIndex(R.propEq('to_project',action.projectId),newState),action.payload,newState))
        return (R.update(R.findIndex(R.propEq('to_project',action.projectId),newState),action.payload,newState))
      }
    default:
     return state
  }
}

