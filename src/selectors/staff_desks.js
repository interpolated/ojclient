import R from 'ramda';

const getDeskID = (obj,key) => {
  // console.log(obj)
  return obj.deskId
}

export const deskMap = (staffInfo) => {
  // console.log(staffInfo)
  const temp = (R.mapObjIndexed(getDeskID, staffInfo))
  return R.mergeAll(temp)
}

export const noDeskStaff = (staffInfo)=>{
  return R.filter(R.propSatisfies(deskFilter,'deskId'),staffInfo)
}

const deskFilter=(someString)=>{
  return !someString.includes('desk')
}