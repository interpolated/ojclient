import * as types from './projects_actions'
import {merge,assign,cloneDeep} from 'lodash'
import R from 'ramda'
import moment from 'moment'
import {transformBadAllocation} from '../common/common_utils'
// state shape
// id:{projId:{date:number,date:number,date:number,...}}


// Project 
export function updateActiveProjectInfo(state = {}, action){
  switch(action.type){
  case types.UPDATE_ACTIVE_PROJECT_INFO:
          // return merge(state,newPayload)
          return assign({}, merge(state,action.payload));
  default:
    return state
  }
}


// Allocations
export function setActiveProjectAllocations(state=[], action){
  const newState=cloneDeep(state)
  switch(action.type){
    case types.SET_ACTIVE_PROJECT_ALLOCATIONS:
      return action.payload 
    case types.UPDATE_PROJECT_ALLOCATION:
        var index = R.findIndex(R.propEq('staffmember_id',action.staffId),newState)
        if(index<0){
          return(R.append(action.payload,newState))
        }else{
        // console.log(R.update(R.findIndex(R.propEq('staffmember',action.staffId),newState),action.payload,newState))
        return (R.update(R.findIndex(R.propEq('staffmember_id',action.staffId),newState),action.payload,newState))
      }
    case types.REMOVE_PROJECT_ALLOCATION:
        if(index<0){
          return state
        }else{
          const remover = (x)=>{
            console.log(R.propEq('staffmember_id',action.staffId,x))
            return(!R.propEq('staffmember_id',action.staffId,x))}         
          return (R.filter(remover,newState))
        }
    default:
     return state
  }
}

// Milestones
export function setActiveProjectMilestones(state=[], action){
  const newState=cloneDeep(state)
  switch(action.type){
    case types.SET_ACTIVE_PROJECT_MILESTONES:
      return action.payload 
    case types.UPDATE_PROJECT_MILESTONE:
        var index = R.findIndex(R.propEq('id',action.id),newState)
        if(index<0){
          return(R.append(action.payload,newState))
        }else{
        // console.log(R.update(R.findIndex(R.propEq('staffmember',action.staffId),newState),action.payload,newState))
        return (R.update(R.findIndex(R.propEq('id',action.id),newState),action.payload,newState))
      }
    case types.REMOVE_PROJECT_MILESTONE:
        if(index<0){
          return state
        }else{
          const remover = (x)=>{
            return(!R.propEq('id',action.id,x))
          }         
          return (R.filter(remover,newState))
        }
    default:
     return state
  }
}





// Temp Alllocation
export function updateTempAllocation(state = {}, action){
  const newState = cloneDeep(state)
  switch(action.type){
  case types.UPDATE_TEMP_ALLOCATION:
          return Object.assign({},newState,action.payload)
  default:
    return state
  }
}

