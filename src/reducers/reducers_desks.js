import * as types from '../actions/action_types';
import R from 'ramda';
import {merge} from 'lodash';
import {staffInfo} from '../assets/staff_list'

export function updateStaffInfo(state = staffInfo, action){
  switch(action.type){
  case types.UPDATE_STAFF_INFO:
    if (action.id !== undefined){
    // find staff member with deskId 
      const currentSitterId = (Object.keys(R.filter(R.propEq('deskId',action.payload.deskId),state)))
    //if there is one and it is not the same guy
      if(typeof currentSitterId[0]!='undefined'&&currentSitterId!=action.id&&currentSitterId.length<2&&action.payload.deskId.includes('desk')) {
        let CurrentSitter = (Object.values(R.filter(R.propEq('deskId',action.payload.deskId),state)))
    //set deskId to '' for that staff member
        CurrentSitter = CurrentSitter[0]
        let bootedSitter = merge(CurrentSitter, {deskId:''})
        console.log(bootedSitter)
        console.log(currentSitterId)
        const cleanState = merge(state,{[currentSitterId]:bootedSitter})
        console.log(cleanState)
        return merge(cleanState,{[action.id]: action.payload})
      }else{
        return merge(state,{[action.id]: action.payload})
      }

    }else{
      console.log('error!')
      return state}
  default:
    return state
  }
}



export function toggleStaffUp(state=false, action){
  switch(action.type){
    case types.TOGGLE_STAFF_UP:
      return !state 
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