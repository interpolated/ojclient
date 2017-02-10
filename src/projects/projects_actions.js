export const SET_STAFF_ALLOCATION = "SET_STAFF_ALLOCATION"

export function setStaffAllocation(payload,staffId){
  return {
    staffId,
    type: SET_STAFF_ALLOCATION,
    payload
  }
}
