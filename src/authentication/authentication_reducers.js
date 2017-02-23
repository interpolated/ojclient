import {SET_REDIRECT_URL, TOGGLE_LOGGED_IN, SET_USER_TOKEN} from './authentication_actions'
import axios from 'axios';


export function setRedirectUrl(state = '', action){
  switch(action.type){
  case SET_REDIRECT_URL:
    return action.payload    
  default:
    return state
  }
}

export function toggleLoggedIn(state = true, action){
  switch(action.type){
  case TOGGLE_LOGGED_IN:
    return !state   
  default:
    return state
  }
}

export function setUserToken(state = '', action){
  switch(action.type){
  case SET_USER_TOKEN:
    return action.payload.token
  default:
    return state
  }
}

