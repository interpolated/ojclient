import R from 'ramda';
import moment from 'moment'
import {cloneDeep} from 'lodash'

export const transformBadAllocation = (allocationObj,projectStartdate,projectEnddate) => {

    var allocationArray=cloneDeep(allocationObj.allocation)
    const projectAllocation=toRange(projectStartdate,projectEnddate)||[1,2]
    if(!(typeof( allocationArray )== 'array'||
        typeof(allocationArray)=='object'&&
        typeof allocationArray[0] !== 'undefined'&&
        typeof(allocationArray[0].day)!=='undefined')){
              allocationArray=projectAllocation
        }

    // console.log(projectAllocation)
    // create set of all keys
    const projectDates=(R.pluck('day',projectAllocation))
    var allocationDates = (R.pluck('day', allocationArray))
    allocationDates = allocationDates.map((m)=>{
        // console.log(m)
        // console.log(moment(m))
        return(parseInt(moment(m).format('YYYYMMDD')))
    })
    const dateSet= new Set([...projectDates,...allocationDates])
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
    var cleanPairs = pairs.filter((x=>{return ((x!==null)&&(typeof x!=='undefined'))}))
    const allocation = cloneDeep(allocationObj)
    const test = (R.merge(allocation,{allocation:cleanPairs}))
    return test
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



// [`${allocation}_${id}`]