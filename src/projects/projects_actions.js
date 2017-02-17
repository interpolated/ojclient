import {BASE_URL} from '../constants.js';
import axios from 'axios';


export const UPDATE_ACTIVE_PROJECT_INFO   = "UPDATE_ACTIVE_PROJECT_INFO"
export const SET_ACTIVE_PROJECT_ID = "SET_ACTIVE_PROJECT_ID"

export  function updateActiveProjectInfo(payload){
  
  return {
    type: UPDATE_ACTIVE_PROJECT_INFO,
    payload
  }
}



export function fetchProject(authToken,projectId){
  return dispatch=>{
    axios.get(`${BASE_URL}projects/?projectId=${projectId}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      console.log(response)
      // // this adds entity.staffMembers and will look for staffMembers:[list]
      // const staffMember = new schema.Entity('staffMembers');
      // // this makes the whole schema -> in this case only one entity
      // const staffSchema = { staffMembers: [ staffMember ] }
      // // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      // const normalizedData = normalize({staffMembers: response.data}, staffSchema);
      // console.log(normalizedData)
      dispatch(
        {
          type:UPDATE_ACTIVE_PROJECT_INFO,
          // need to normalize data here using normalizr
          payload:response[0]
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}


export  function setActiveProjectId(projectId){
  return {
    projectId,
    type: SET_ACTIVE_PROJECT_ID
  }
}
