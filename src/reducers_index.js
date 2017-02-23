import {combineReducers} from 'redux';
import {toggleStaffUp} from './seats/seats_reducers';
import {setActiveStaffAllocations,setActiveSkills} from './staff/staff_reducers';
import {updateStaffInfo, setActiveStaffId} from './common/common_reducers'
import {setRedirectUrl, toggleLoggedIn, setUserToken} from './authentication/authentication_reducers'

import {setActiveProjectAllocations,setActiveProjectMilestones,updateActiveProjectInfo,updateTempAllocation} from './projects/projects_reducers';


const rootReducer = combineReducers(
      {
        // seats reducers
        staffUp:toggleStaffUp,
        
        // allocations


        // active is currently selected

        activeStaffId:setActiveStaffId,
        activeStaffAllocations:setActiveStaffAllocations,
        activeProjectAllocations:setActiveProjectAllocations,
        activeProjectMilestones:setActiveProjectMilestones,

        tempAllocation:updateTempAllocation,

        // activeProject:setActiveProject,
        activeStaffSkills:setActiveSkills,

        // temp are entities created in client and yet to be sent to server

        activeProjectInfo:updateActiveProjectInfo,

        // this is strange - should I update to temp?
        staffInfo:updateStaffInfo,
        
        // auth management
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


