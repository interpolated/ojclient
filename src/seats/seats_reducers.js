import * as types from './seats_actions';
import R from 'ramda';
import {merge} from 'lodash';
import {staffInfo} from '../assets/staff_list'
import {seatMap} from '../assets/staff_seat_map'


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
