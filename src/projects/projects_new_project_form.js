
// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container, FormGroup, ControlLabel,FormControl,HelpBlock} from 'react-bootstrap'
import {ButtonToolbar,BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';
import moment from 'moment';
import DatePicker from 'react-bootstrap-date-picker'

// import actions
import {setActiveProjectId,updateActiveProjectInfo}  from './projects_actions';
import {createOrUpdate,deleteFromServer}  from '../common/common_actions';
// import constants





const FieldGroup = ({ id, label, help, ...props })=> {
    return (
      <FormGroup controlId={id}>
        <ControlLabel >{label}</ControlLabel >
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

const ProjectForm = (props) => {


  
  const _onChange = (e) =>{
    // console.log(state)
    props.updateActiveProjectInfo({[e.target.id]:e.target.value})
    // console.log(props.activeProjectInfo.name)
  }

  const handleChangeStart = (date)=>{
       var activeId=props.activeProjectId
    props.updateActiveProjectInfo({startdate:moment(date).day(5).format('YYYY-MM-DD')},activeId)
  }

  const handleChangeEnd = (date)=>{
    var activeId=props.activeProjectId
    props.updateActiveProjectInfo({enddate:moment(date).day(5).format('YYYY-MM-DD')},activeId)
  }

  const _onClick = (e) => {
    e.stopPropagation()
    createOrUpdate('project',props.activeProjectInfo,props.userToken)
  }
  const _onClickDelete = (e) => {
    e.stopPropagation()
    deleteFromServer('project',props.activeProjectInfo,props.userToken)
  }

  // onChange={_onChange}
  
  return (
            
      <div onChange={_onChange} >
          <h4>Project Details</h4>
        <form>
          <Row>
            <Col md="6">
             <FieldGroup
                id="projectId"
                type="text"
                label="projectId"
                // onChange={_onChange}
                value={props.activeProjectInfo.projectId}
                placeholder="Project ID"/>          
            </Col>
            <Col md="6">
             <FieldGroup
                id="name"
                type="text"
                label="Project Name"
                // onChange={_onChange}
                value={props.activeProjectInfo.name}
                placeholder="Name Project"/> 
              </Col>   
          </Row>  
          <Row>
            <Col md="12">
              <FieldGroup
                id="description"
                type="textarea"
                label="Project Description"
                value={props.activeProjectInfo.description}
                // onChange={_onChange}
                placeholder="Describe Project"/>
            </Col>
            
          </Row>             
          <Row>
            
            <Col md="6" >
            <ControlLabel >Start Date</ControlLabel  >
            <DatePicker id="startdate" calendarPlacement="left"  value={props.activeProjectInfo.startdate} onChange={handleChangeStart} />
            </Col>
            <Col md="6">
            <ControlLabel >End Date</ControlLabel  >
            <DatePicker id="enddate" calendarPlacement="left" value={props.activeProjectInfo.enddate} onChange={handleChangeEnd} />
            </Col>
          </Row>
        </form>
          <br/>
          <Row>
            <Col md="6">
            <Button bsStyle="primary" block onClick={_onClick}>
              Load Project
            </Button>

            </Col>
            <Col md="6">
            <Button bsStyle="danger" block onClick={_onClickDelete}>
              Delete Project
            </Button>

            </Col>

          </Row>
    </div>
  )
} 


// 
const mapStateToProps = ( {activeProjectInfo, userToken} ) => {
  return {
    activeProjectInfo,
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActiveProjectInfo

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
