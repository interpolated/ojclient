 import axios from 'axios';
import {normalize, schema}  from 'normalizr';    

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

// export function upsertStaffInfo(authToken){
//   return dispatch=>{
//     axios.get('http://localhost:8000/api/staffmembers/',{
//       headers:{Authorization: `Token ${authToken}`}
//     }).then(response=>{
//       // this adds entity.staffMembers and will look for staffMembers:[list]
//       const staffMember = new schema.Entity('staffMembers');
//       // this makes the whole schema -> in this case only one entity
//       const staffSchema = { staffMembers: [ staffMember ] }
//       // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
//       const normalizedData = normalize({staffMembers: response.data.results}, staffSchema);
//       dispatch(
//         {
//           type:UPDATE_ALL_STAFF_INFO,
//           // need to normalize data here using normalizr
//           payload:normalizedData.entities.staffMembers
//         }
//       )
//     }).catch(error=>{
//       console.log(error)
//     })
//   }
  
// }


export function fetchStaffInfo(authToken){
  return dispatch=>{
    axios.get('http://localhost:8000/api/staffmembers/',{
      headers:{Authorization: `Token ${authToken}`}
    }).then(response=>{
      // this adds entity.staffMembers and will look for staffMembers:[list]
      const staffMember = new schema.Entity('staffMembers');
      // this makes the whole schema -> in this case only one entity
      const staffSchema = { staffMembers: [ staffMember ] }
      // first argument of normalize is data, looking for key staffMembers (as per schema entity), sencond argument is the entire schema.
      const normalizedData = normalize({staffMembers: response.data.results}, staffSchema);
      dispatch(
        {
          type:UPDATE_ALL_STAFF_INFO,
          // need to normalize data here using normalizr
          payload:normalizedData.entities.staffMembers
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



