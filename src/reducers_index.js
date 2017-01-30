import {combineReducers} from 'redux';
import {toggleStaffUp} from './seats/seats_reducers';
import {updateStaffInfo, setActiveStaffId} from './common/common_reducers'
import {setRedirectUrl, toggleLoggedIn, setUserToken} from './authentication/authentication_reducers'



const rootReducer = combineReducers(
      {
        staffUp:toggleStaffUp,
        activeStaffId:setActiveStaffId,
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


