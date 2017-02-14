
// import react and redux
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container,Panel} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions

// import selectors



const ProjectCard = (props)=>{
  return (
   <Col md="3">
      <Panel>
        <h4>{props.to_milestone}</h4>
        <h6>{props.allocation}</h6>
      </Panel>
    </Col>
    )
}


const SkillCard = (props)=>{
  return (
      <Col md="3"  >
        <Panel style={{backgroundColor:'#E89898'}}>
          <h4><strong>{props.name}</strong></h4>
          <h6>{props.description}</h6>
        </Panel>
      </Col>
    )
}


const StaffDetail = (props) => {

  const allocationList = Object.values(props.activeStaffAllocations)
  const skillList = Object.values(props.activeStaffSkills)
  console.log(props.activeStaffId)
  
  if(props.activeStaffId){
  return (
      <div>
        <Row>
          <h4>Staff details</h4>
          <Col md="12">
            <Panel>
             <Col md="4">
              <h4>{props.staffInfo[props.activeStaffId].name}</h4>
              <h5>{props.staffInfo[props.activeStaffId].title}</h5>
              <h6>{props.staffInfo[props.activeStaffId].name+'@cox.com.au'}</h6>
             </Col>   
             <Col md="4">
              <h5>phone extension ...</h5>
              <h5>cluster ....</h5>
              <h5>office .... </h5>
             </Col>   
            </Panel>
          </Col>
        </Row>
        <Row>
          <h4>Currently working on</h4>
          {allocationList.map(ProjectCard)}
        </Row>
        <Row>
          <h4>Skills</h4>
          {skillList.map(SkillCard)}
        </Row>
        
      </div>
    )
  }else{
    return (
      <div>Select Staff</div>
    )
  }
}

const mapStateToProps = ( {staffInfo,activeStaffId,activeStaffAllocations,activeStaffSkills} ) => {
  return {
    staffInfo,
    activeStaffId,
    activeStaffAllocations,
    activeStaffSkills
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ACTIONCREATORS}, dispatch)
// }

export default connect(mapStateToProps)(StaffDetail);