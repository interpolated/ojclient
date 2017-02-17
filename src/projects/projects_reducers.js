import * as types from './projects_actions'
import {merge} from 'lodash'

// state shape
// id:{projId:{date:number,date:number,date:number,...}}

export function updateActiveProjectInfo(state = {}, action){
  switch(action.type){
  case types.UPDATE_ACTIVE_PROJECT_INFO:
          return merge(state,action.payload)
  default:
    return state
  }
}


// id(pin): 2
// projectId(pin): "23441"
// created(pin): "2017-02-16T08:27:56.879707Z"
// enddate(pin): null
// startdate(pin): "2017-02-16"
// name(pin): "otherCentrals"
// description(pin): "asdf"


// export function updateActiveProjectInfo(state = {}, action){
//   switch(action.type){
//   case types.UPDATE_ACTIVE_PROJECT_INFO:
//         if(Object.keys(state)==action.projectId){
//           return merge(state,{[action.projectId]: action.payload})
//         }
//         else{
//           return {[action.projectId]:action.payload}
//         }
//   case types.UPDATE_ALL_STAFF_INFO:
//         return action.payload
//   default:
//     return state
//   }
// }