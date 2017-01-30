import axios from 'axios';
import normalizer  from 'normalizer';    

export const UPDATE_STAFF_INFO = "UPDATE_STAFF_INFO"
export const UPDATE_ALL_STAFF_INFO = "UPDATE_ALL_STAFF_INFO"
export const SET_ACTIVE_STAFF_ID = "SET_ACTIVE_STAFF_ID"

export function updateStaffInfo(payload,staffId){
  return {
    staffId,
    type: UPDATE_STAFF_INFO,
    payload
  }
}

export function updateAllStaffInfo(authToken){
  return dispatch=>{
    axios.get('http://localhost:8000/api/staffmembers/',{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      dispatch(
        {
          type:UPDATE_ALL_STAFF_INFO,
          // need to normalize data here using normalizr
          payload:response.data.results
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}

export function setActiveStaffId(staffId){
  return {
    type: SET_ACTIVE_STAFF_ID,
    payload: staffId
  }
}
