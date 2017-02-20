import * as types from './projects_actions'
import {merge,assign,cloneDeep} from 'lodash'
import R from 'ramda'
import moment from 'moment'
// state shape
// id:{projId:{date:number,date:number,date:number,...}}

export function updateActiveProjectInfo(state = {}, action){
  switch(action.type){
  case types.UPDATE_ACTIVE_PROJECT_INFO:
          // return merge(state,action.payload)
          return assign({}, merge(state,action.payload));
  default:
    return state
  }
}

export function setActiveProjectAllocations(state=[], action){
  switch(action.type){
    case types.SET_ACTIVE_PROJECT_ALLOCATIONS:
      return action.payload 
    case types.UPDATE_PROJECT_ALLOCATION:
        const newState=cloneDeep(state)
        var index = R.findIndex(R.propEq('staffmember_id',action.staffId),newState)
        if(index<0){
          return(R.append(action.payload,newState))
        }else{
        // console.log(R.update(R.findIndex(R.propEq('staffmember',action.staffId),newState),action.payload,newState))
        return (R.update(R.findIndex(R.propEq('staffmember_id',action.staffId),newState),action.payload,newState))
      }
    default:
     return state
  }
}

export function updateTempAllocation(state = {}, action){
  // console.trace('reducer trace')
  switch(action.type){
  case types.UPDATE_TEMP_ALLOCATION:
          const newState1=cloneDeep(state)
          const newState2=merge(newState1,action.payload)
          newState1.allocation=transformBadAllocation(action.payload.allocation,action.startdate,action.enddate)
          // console.log(newPayload)
          return newState1
  default:
    return state
  }
}


export function setActiveProjectAllocation(state = {}, action){
  switch(action.type){
  case types.SET_PROJECT_ALLOCATION:
          return action.payload
  default:
    return state
  }
}

const transformBadAllocation = (allocationArray,projectStartdate,projectEnddate) => {
// function needs to do the following:
// 1. check if allocationArray is 'well formed'
// 2. make sure allocationArray is not longer than project timeline - to projectAllocationShort
// 3. if allocationArray is shorter than projecAllocation then pad allocation out.
// 
// Can I use this to truncate staffAllocations to display on StaffGraph - I think so.
// 
    const projectAllocation=toRange(projectStartdate,projectEnddate)
    if(!(typeof( allocationArray )== 'array'||
        typeof(allocationArray)=='object'&&
        typeof allocationArray[0] !== 'undefined'&&
        typeof(allocationArray[0].day)!=='undefined')){
              console.log('TEMP ALLOCATION is bad')
              allocationArray=projectAllocation
        }
    // say tempAllocation is too long
    // find index of temp allocation that matches first item of project Allocation
    var lowAllocationArray = R.findIndex(R.propEq('day',projectAllocation[0].day),allocationArray)
    var highAllocationArray = R.findLast(R.propEq('day',projectAllocation[projectAllocation.length-1].day),allocationArray)

    var trimmedTempAllocation = allocationArray.slice(Math.max(lowAllocationArray,0),projectAllocation.length)
    // console.log(R.pluck('days',trimmedTempAllocation))
    // if allocation is too short

    // construct array from start of projectAllocation to start of allocatoin array
    var bottomEndIndex = R.findIndex(R.propEq('day', allocationArray[0].day), projectAllocation)
    var topStartIndex = R.findIndex(R.propEq('day', allocationArray[allocationArray.length-1].day), projectAllocation)

    var bottom = projectAllocation.slice(1,bottomEndIndex)
    var mid = projectAllocation.slice(bottomEndIndex,topStartIndex)
    var top = projectAllocation.slice(topStartIndex)

    var mergedMid=R.zipWith(R.merge,mid,trimmedTempAllocation)
    console.log(mergedMid)
    // construct array from end of allocation array to end of project allocation

    return([...bottom,...mergedMid,...top])

    // var lastIndexOfAllocation = R.findLast(R.propEq('day'),projectAllocation)
    // var firstIndexOfAllocation = R.findIndex(R.propEq('day'),projectAllocation)
    // var projectAllocationShort = allocationArray.slice(lastIndexOfAllocation)
    // var projectAllocationShort = allocationArray.slice(0,firstIndexOfAllocation)
    // var firstIndex = R.findIndex(R.propEq('day',allocationArray),projectAllocationShort)
    // // console.log(firstIndex)
    // var lastIndex = firstIndex+allocationArray.length
    // var firstArray = projectAllocationShort.slice(0,firstIndex)
    // // console.log(firstArray)
    // var midArray = projectAllocationShort.slice(firstIndex+1,lastIndex)
    // var lastArray = projectAllocationShort.slice(lastIndex)
    // // console.log(allocationArray)
    // var merged = R.zipWith(R.merge,midArray,allocationArray)
    // var firstJoin = R.concat(firstArray,merged)
    // var final= R.concat(firstJoin,lastArray)
    return allocationArray
}



const toRange=(projectStartdate,projectEnddate)=>{
// helper function turn project into projDay series
    if(projectStartdate==null||projectEnddate==null){
      console.log('set start and end date')
      console.trace('why no date')
      return
    }
    const start = new Date(projectStartdate);
    const end = new Date(projectEnddate);
    const range = moment.range(start, end);
    const days = Array.from(range.by('week'));
    const tA = R.mergeAll(days.map(m=>({[parseInt(m.format('YYYYMMDD'))]:0})))
    return(Object.values(R.mapObjIndexed((val,key,obj)=>({day:parseInt(key),projAllocation:1,allocation:0}),tA)))
}

