 import axios from 'axios';
import {normalize, schema}  from 'normalizr';    

export const FETCH_STAFFMEMBER_SKILLS = "FETCH_STAFFMEMBER_SKILLS"
export const FETCH_STAFFMEMBER_PROJECTS = "FETCH_STAFFMEMBER_PROJECTS"
export const SET_ACTIVE_SKILLS = "SET_ACTIVE_SKILLS"
export const SET_ACTIVE_ALLOCATIONS = "SET_ACTIVE_ALLOCATIONS"



export function fetchStaffmemberAllocations(authToken,id){
  return dispatch=>{
    axios.get(`http://localhost:8000/api/allocations/?staffid=${id}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // this adds entity.staffMembers and will look for staffMembers:[list]
      const allocation = new schema.Entity('allocations');
      // this makes the whole schema -> in this case only one entity
      const allocationSchema = { allocations: [ allocation ] }
      // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      const normalizedData = normalize({allocations: response.data}, allocationSchema);
      dispatch(
        {
          type:SET_ACTIVE_ALLOCATIONS,
          // need to normalize data here using normalizr
          payload:normalizedData.entities.allocations||{}
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}

export function fetchStaffmemberSkills(authToken,id){
  return dispatch=>{
    axios.get(`http://localhost:8000/api/skills/?staffid=${id}`,{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // this adds entity.staffMembers and will look for staffMembers:[list]
      const skill = new schema.Entity('skills');
      // this makes the whole schema -> in this case only one entity
      const skillSchema = { skills: [ skill ] }
      // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      const normalizedData = normalize({skills: response.data}, skillSchema);
      dispatch(
        {
          type:SET_ACTIVE_SKILLS,
          // need to normalize data here using normalizr
          payload:normalizedData.entities.skills||{}
        }
      )
    }).catch(error=>{
      console.log(error)
    })
  }
}
