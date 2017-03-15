import {fetchStaffInfo} from '../common/common_actions'
import {hashHistory} from 'react-router';
import axios from 'axios'
import {BASE_URL} from '../constants';

export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const TOGGLE_LOGGED_IN = 'TOGGLE_LOGGED_IN';
export const SET_USER_TOKEN  =  'SET_USER_TOKEN';

export function setRedirectUrl(payload){
  return {
    type: SET_REDIRECT_URL,
    payload
  }
}

export function toggleLoggedIn(){
  return {
    type: TOGGLE_LOGGED_IN
  }
}

export function setUserToken(payload){
  return {
    type: SET_USER_TOKEN,
    payload
  }
}

export function logIn(username,password){
  return dispatch=>{
    axios.post(`${BASE_URL}obtain_auth_token/`,{
      username:username,
      password:password
    }).then(response=>{
      dispatch(setUserToken(response.data));
      return response
    }).then((response)=>{
      dispatch(toggleLoggedIn())
      return response
    }).then((response)=>{
      console.log(response)
      // fetchStaffInfo could be a universal load state call - probably better that way. Keeping like this for now.
      dispatch(fetchStaffInfo(response.data.token)) 
    }).then(()=>{
      hashHistory.replace('/seats')
    }).catch(error=>{
      console.log(error)
    })
  }
}

