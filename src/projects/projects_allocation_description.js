
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
import {debounce} from 'lodash';
import DatePicker from 'react-bootstrap-date-picker'

// import actions
import {setActiveProjectId,updateProjectAllocation,updateActiveProjectInfo,updateTempAllocation,removeProjectAllocation}  from './projects_actions';
import {createOrUpdate,deleteFromServer}  from '../common/common_actions';
// import constants





const FieldGroup = ({ id, label, help, ...props })=> {
    return (
      <FormGroup controlId={id}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class AllocationDescription extends Component {

    constructor(props) {
        super(props);
        this.state={
          description:''
        }
    }

    componentWillReceiveProps(nextProps){
      const activeAllo = R.filter(R.propEq('staffmember_id',nextProps.activeStaffId),nextProps.activeProjectAllocations)
      if(activeAllo.length>0){
            this.setState({description:activeAllo[0].description})
          }
        else{
          this.setState({description:''})
        }
    }

_onChange=(e)=>{
  this.setState({description:e.target.value})
}

  _onClick = (e) => {
    e.stopPropagation()
    this.props.updateTempAllocation({description:this.state.description})
    this.props.updateProjectAllocation(this.props.activeStaffId,R.merge(this.props.tempAllocation,{description:this.state.description}))
    createOrUpdate('allocation',R.merge(this.props.tempAllocation,{description:this.state.description}),this.props.userToken)
  }


  _onClickDelete = (e) => {
    e.stopPropagation()
    this.props.removeProjectAllocation(this.props.activeStaffId)
    this.props.updateTempAllocation({description:'',allocation:'',staffmember_id:'',to_project:''})
    deleteFromServer('allocation',this.props.tempAllocation,this.props.userToken)
  }

  // onChange={_onChange}
  render(){return (
            
      <div >
          <h4>Allocation Details</h4>
        <form>
          <Row>
            <Col md="12">
             <FieldGroup
                componentClass="input"
                placeholder="describe involvement in project"
                id="projectId"
                type="text"
                label="projectId"
                onChange={this._onChange.bind(this)}
                value={this.state.description}/>          
            </Col>
          </Row>  
        </form>
          <Row>
            <Col md="6">
            <Button bsStyle="primary" block onClick={this._onClick.bind(this)}>
              {!!this.props.activeStaffId&&`Save allocation`}
            </Button>
            </Col>
            <Col md="6">
            <Button bsStyle="danger" block onClick={this._onClickDelete.bind(this)}>
              {!!this.props.activeStaffId&&`Remove allocation`}
            </Button>
            </Col>
          </Row>
    </div>
  )}
} 


// 
const mapStateToProps = ( {activeProjectInfo, activeProjectAllocations, userToken, tempAllocation,activeStaffId,staffInfo} ) => {
  return {
    activeProjectInfo,
    activeProjectAllocations,
    tempAllocation,
    userToken,
    activeStaffId,
    staffInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActiveProjectInfo,
    updateTempAllocation,
    updateProjectAllocation,
    removeProjectAllocation

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllocationDescription);
