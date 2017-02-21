import R from 'ramda';
import moment from 'moment'


export const transformBadAllocation = (allocationArray,projectStartdate,projectEnddate) => {

  // console.log('===============================================================')
  // console.log('this is pre-transformation')
  // console.log(allocationArray)
  // console.log('PROJECTSTART '+projectStartdate+ '   ----    PROJECTEND '+projectEnddate)
  // console.log('allocationStart '+allocationArray[0].day+ '   ----    allocation end '+allocationArray[allocationArray.length-1].day)

// function needs to do the following:
// 1. check if allocationArray is 'well formed'
// 2. make sure allocationArray is not longer than project timeline - to projectAllocationShort
// 3. if allocationArray is shorter than projectAllocation then pad allocation out.
// 
// Can I use this to truncate staffAllocations to display on StaffGraph - I think so.
// 
    const projectAllocation=toRange(projectStartdate,projectEnddate)||[1,2]
    // console.log(projectAllocation)
    // console.log('this is projectAllocation -----')
    // console.log(projectAllocation)
    if(!(typeof( allocationArray )== 'array'||
        typeof(allocationArray)=='object'&&
        typeof allocationArray[0] !== 'undefined'&&
        typeof(allocationArray[0].day)!=='undefined')){
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
    var bottomEndIndex = R.findIndex(R.propEq('day', trimmedTempAllocation[0].day), projectAllocation)
    var topStartIndex = R.findIndex(R.propEq('day', trimmedTempAllocation[trimmedTempAllocation.length-1].day), projectAllocation)

    // create set of all keys
    const projectDates=(R.pluck('day',projectAllocation))
    const allocationDates = (R.pluck('day', allocationArray))

    const dateSet= new Set([...projectDates,...allocationDates])

    // console.log('PROJECT data')
    // console.log(projectAllocation)
    // console.log('allocation data')
    // console.log(allocationArray)

    const allDates = [...dateSet].sort()

    var pairs = allDates.map((e)=>{
      
        const projBit = R.filter(R.propEq('day',e),projectAllocation)[0]
        if((typeof projBit=='undefined')){
            return null
        }else{
            const allocBit = R.filter(R.propEq('day',e),allocationArray)[0]
            if((typeof allocBit=='undefined')){
                return projBit
            }else{
                return allocBit
            }
        }        
    })

    // console.log('PAIRS')
    // console.log(pairs)
    // pairs = pairs.map((e)=>{if(e.length>1){return e[0]}})
    var cleanPairs = pairs.filter((x=>{return ((x!==null)&&(typeof x!=='undefined'))}))


    return(cleanPairs)

}


const toRange=(projectStartdate,projectEnddate)=>{
// helper function turn project into projDay series
    if(projectStartdate==null||projectEnddate==null){
      console.log('set start and end date')
      return
    }
    const start = new Date(projectStartdate);
    const end = new Date(projectEnddate);
    const range = moment.range(start, end);
    const days = Array.from(range.by('week'));
    const tA = R.mergeAll(days.map(m=>({[parseInt(m.format('YYYYMMDD'))]:0})))
    return(Object.values(R.mapObjIndexed((val,key,obj)=>({day:parseInt(key),projAllocation:1,allocation:0}),tA)))
}

