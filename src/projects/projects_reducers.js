import * as types from './projects_actions'
import {merge,assign,cloneDeep} from 'lodash'
import R from 'ramda'
import moment from 'moment'
import {transformBadAllocation} from '../common/common_utils'
// state shape
// id:{projId:{date:number,date:number,date:number,...}}

export function updateActiveProjectInfo(state = {}, action){
  switch(action.type){
  case types.UPDATE_ACTIVE_PROJECT_INFO:
          // return merge(state,newPayload)
          return assign({}, merge(state,action.payload));
  default:
    return state
  }
}

export function setActiveProjectAllocations(state=[], action){
  switch(action.type){
    case types.SET_ACTIVE_PROJECT_ALLOCATIONS:
      return action.payload 
    case types.UPDATE_PROJECT_ALLOCATION:
        const newState=cloneDeep(state)
        var index = R.findIndex(R.propEq('staffmember_id',action.staffId),newState)
        if(index<0){
          return(R.append(action.payload,newState))
        }else{
        // console.log(R.update(R.findIndex(R.propEq('staffmember',action.staffId),newState),action.payload,newState))
        return (R.update(R.findIndex(R.propEq('staffmember_id',action.staffId),newState),action.payload,newState))
      }
    default:
     return state
  }
}

export function updateTempAllocation(state = {}, action){
  // console.trace('reducer trace')
  switch(action.type){
  case types.UPDATE_TEMP_ALLOCATION:
          return action.payload
  default:
    return state
  }
}

const toYYYYMMDD=(date)=>{
    return moment(date).format('YYYYMMDD')
  }



