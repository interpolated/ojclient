import {combineReducers} from 'redux';
import {toggleStaffUp} from './seats/seats_reducers';
import {setActiveAllocations,setActiveSkills} from './staff/staff_reducers';
import {updateStaffInfo, setActiveStaffId} from './common/common_reducers'
import {setRedirectUrl, toggleLoggedIn, setUserToken} from './authentication/authentication_reducers'



const rootReducer = combineReducers(
      {
        staffUp:toggleStaffUp,
        activeStaffId:setActiveStaffId,
        activeStaffAllocations:setActiveAllocations,
        activeStaffSkills:setActiveSkills,
        staffInfo:updateStaffInfo,
        isLoggedIn:toggleLoggedIn,
        redirectUrl:setRedirectUrl,
        userToken:setUserToken
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


