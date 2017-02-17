
// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container, FormGroup, ControlLabel,FormControl,HelpBlock} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';
import moment from 'moment';
import DatePicker from 'react-bootstrap-date-picker'
import Select from 'react-select';

// import actions
import {setActiveProjectId,updateActiveProjectInfo}  from './projects_actions';

// import constants
import {BASE_URL} from '../constants.js'




const FieldGroup = ({ id, label, help, ...props })=> {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class ProjectForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      projectShortList: {},
      value:" ",
      prevState:''
    };
  }  

  getOptions = (input) => {
  return fetch(`${BASE_URL}projects/?projectId=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({projectShortList:json})
      return { options:R.pluck('projectId',json).map((item)=>({'value':item, 'label':item})) };
    });
  }

  componentWillMount(){

  }
  
  _onChange = (e) =>{
    // console.log(this.state)
    this.props.updateActiveProjectInfo({[e.target.id]:e.target.value})
    // console.log(this.props.activeProjectInfo.name)
  }

  handleChangeStart = (date)=>{
       var activeId=this.props.activeProjectId
    this.props.updateActiveProjectInfo({startdate:date},activeId)
  }

  handleChangeEnd = (date)=>{
    var activeId=this.props.activeProjectId
    this.props.updateActiveProjectInfo({enddate:date},activeId)
  }

  _onSelectChange = (e)=>{
    
    let tempVal = this.state.value
    

    if (e.value!=tempVal){
      console.log('changestate')
      // this.setState({value:e.value})
      // this.props.updateActiveProjectInfo(this.state.projectShortList[0])
    }
  }

  // onChange={this._onChange.bind(this)}
  render() {
    return (
            
      <Col md={4} onChange={this._onChange.bind(this)} >

        <Select.Async 
          
          loadOptions={this.getOptions}
          onChange={this._onSelectChange.bind(this)} />

        <form>
         
          <FieldGroup
            id="projectId"
            type="text"
            label="Project ID"
            value={this.props.activeProjectInfo.projectId}
            placeholder="Name Project"/>           
         <FieldGroup
            id="name"
            type="text"
            label="Project Name"
            // onChange={this._onChange.bind(this)}
            value={this.props.activeProjectInfo.name}
            placeholder="Name Project"/>    
          <FieldGroup
            id="description"
            type="textarea"
            label="Project Description"
            value={this.props.activeProjectInfo.description}
            // onChange={this._onChange.bind(this)}
            placeholder="Describe Project"/>
          <Row>
            
          <Col md="6" >
          <ControlLabel>Start Date</ControlLabel>
          <DatePicker id="startdate"  onChange={this.handleChangeStart} />
          </Col>
          <Col md="6">
          <ControlLabel>End Date</ControlLabel>
          <DatePicker id="enddate" value={this.props.activeProjectInfo.enddate} onChange={this.handleChangeEnd} />
          </Col>
          </Row>
          <br/>
          <Button onClick={this._onClick}>
            Load Project
          </Button>
        </form>
    </Col>
    ) 
  } 
}


const mapStateToProps = ( {activeProjectInfo} ) => {
  return {
    activeProjectInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActiveProjectInfo

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
