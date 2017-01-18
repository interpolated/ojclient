import {combineReducers} from 'redux';
import {updateStaffInfo, toggleStaffUp, setActiveStaffId} from './reducers_desks';


const rootReducer = combineReducers(
      {
        staffUp:toggleStaffUp,
        activeStaffId:setActiveStaffId,
        staffInfo:updateStaffInfo
      }
  );


export default rootReducer;



  








// initialState = {
//     staffUp:
//     activeStaffMember: id,
//     staffInfo: {staffId:{deskId,name},staffId,deskId}
// }

// computed
//     unassignedDesks:
//     unassignedStaff:


