
// import react and redux
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {setActiveStaffId}  from '../common/common_actions';

// import selectors 



const StaffList = (props) => {

  return (
      <div>
        <div onClick={staffDown}>
          <BootstrapTable 
          height={'400'}
          data={denormalizedData.users} 
          options = {options}
          hover
          striped
          search
          condensed>
              <TableHeaderColumn isKey dataField='id'>Staff ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name'    >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='skills'    >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='deskId'  >Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )


}


const mapStateToProps = ( {activeStaffId} ) => {
  return {
    staffInfo,
    activeStaffId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);