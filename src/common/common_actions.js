 import axios from 'axios';
import {normalize, schema}  from 'normalizr';    
import {BASE_URL} from '../constants.js'
import {merge} from 'lodash'
import R from 'ramda'
import {transformBadAllocation} from './common_utils'

import {setactiveStaffId} from './common_actions'
import {updateActiveProjectInfo, fetchActiveProjectAllocations,updateTempAllocation}  from '../projects/projects_actions';
import {fetchStaffmemberSkills,fetchStaffmemberAllocations} from '../staff/staff_actions'

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

export function fetchStaffInfo(authToken){
  return dispatch=>{
    axios.get(`${BASE_URL}staffmembers/`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // console.log(response)
      // this adds entity.staffMembers and will look for staffMembers:[list]
      const staffMember = new schema.Entity('staffMembers');
      // this makes the whole schema -> in this case only one entity
      const staffSchema = { staffMembers: [ staffMember ] }
      // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      const normalizedData = normalize({staffMembers: response.data}, staffSchema);
      // console.log(normalizedData)
      dispatch(
        {
          type:UPDATE_ALL_STAFF_INFO,
          // need to normalize data here using normalizr
          payload:normalizedData.entities.staffMembers
        }
      )
    }).catch(error=>{
      // console.log(error)
    })
  }
}

export function setActiveStaffId(staffId){
  return {
    type: SET_ACTIVE_STAFF_ID,
    payload: staffId
  }
}


// create or update
export const createOrUpdate=(type,data,authToken)=>{

  var APItype = type+'s'
  if (type == 'project'){
    var filter = `projectId=${data.projectId}`
  }
  if (type == 'staffMember'){
    var filter = `id=${data.id}`
  }  
  var newData=data
  if (type == 'allocation'){
    var filter = `staffmember_id=${data.staffmember_id}&to_project=${data.to_project}`
  }
  if (type == 'milestone'){
    var filter = `id=${data.id}`
  }
  console.log('calling API '+type)
  axios.get ( `${BASE_URL}${APItype}/?${filter}`,{
    headers:{Authorization: `Token ${authToken}`}
  }).then(response=>{
      if(!!response.data.length){
        axios.put(`${BASE_URL}${APItype}/${response.data[0].id}/`, data,{
          headers:{Authorization: `Token ${authToken}`}
        })
      }else{
        axios.post(`${BASE_URL}${APItype}/`, newData,{
            headers:{Authorization: `Token ${authToken}`}
        })
      }
  })
}


export const deleteFromServer=(type,data,authToken)=>{

  var APItype = type+'s'
  if (type == 'project'){
    var item = `${data.id}`
  }
  if (type == 'staffMember'){
    var item = `${data.id}/`
  }  
  var newData=data
  if (type == 'allocation'){
    var item = `${data.id}`
  }
  if (type == 'milestone'){
    var item = `${data.id}`
  }
  console.log('calling API '+type)
  axios.delete( `${BASE_URL}${APItype}/${item}/`,{
    headers:{Authorization: `Token ${authToken}`}
  }).then(response=>{
        console.log(response)
      })
  }


