// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {fetchStaffInfo} from '../common/common_actions'
// import selectors
// import components
import SetAllocationGraph  from './projects_allocation_graph';
import SummaryGraph  from './projects_summary_graph';
import ExistingAllocationGraph  from './projects_existing_staff_allocation';
import ProjectForm  from './projects_new_project_form';
import ProjectFetch  from './projects_async_fetch';
import StaffTable  from '../staff/staff_staff_table';
import {setActiveStaffId }  from '../staff/staff_actions';


class Projects extends Component {
  
  componentWillMount(){
        this.props.fetchStaffInfo(this.props.userToken)
  }

  render() {
    return (
      <Row>
        <Col md="3">
          <ProjectFetch/>
          <StaffTable/>
        </Col>
        <Col md="9">
          <Col md="8">
            <SummaryGraph />
            <SetAllocationGraph/>
            <ExistingAllocationGraph/>
          </Col>
          <Col md="4">
            <ProjectForm/>
          </Col>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = ( {userToken,activeStaffId} ) => {
  return {
    userToken,
    activeStaffId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchStaffInfo,setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

