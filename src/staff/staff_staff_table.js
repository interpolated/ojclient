import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateStaffInfo,setActiveStaffId} from '../common/common_actions'
import {noDeskStaff} from '../selectors/staff_desks'
import R from 'ramda';
import { denormalize, schema } from 'normalizr';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {fetchStaffmemberSkills,fetchStaffmemberAllocations} from './staff_actions'



const StaffTable = (props) => {
  const staffArray = Object.values(props.staffInfo)  

  // the above is equivalent to Object.values(props.staffInfo)
  
  const onRowClick= (row)=>{
        props.setActiveStaffId(row.id)
        props.fetchStaffmemberSkills(props.userToken,row.id)
        props.fetchStaffmemberAllocations(props.userToken,row.id)
  }

  const options = {
    onRowClick: onRowClick
  };  

  // console.log(denormalizedData.users)
  return (  
      <div>
        <div>
          <BootstrapTable 
          height={'400'}
          // set table style offsets to 15
          containerStyle={ {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 10,
            marginLeft: 10,
          } }

          tableStyle={ {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5,
            marginLeft: 5,
          } }

          data={staffArray} 
          options = {options}
          hover
          striped
          search
          condensed>
              <TableHeaderColumn isKey dataField='id'>Staff ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name'    >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='deskId'  >Location</TableHeaderColumn>
              <TableHeaderColumn dataField='cluster'  >cluster</TableHeaderColumn>
          </BootstrapTable>
        </div>

      </div>
    )    

}


// code more efficiently
// write down problems and comment them out - spend more time in sublime text
// learn how to write tests - write to test
// don't fiddle so much in the browser = more time in browser than in sublime


const mapStateToProps = ( {staffInfo, activeStaffId,userToken} ) => {
  return {
    staffInfo,
    activeStaffId,
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateStaffInfo, setActiveStaffId, fetchStaffmemberAllocations,fetchStaffmemberSkills}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffTable);