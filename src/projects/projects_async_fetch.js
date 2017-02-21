// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container,FormGroup,FormControl,Dropdown,MenuItem} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  
// import 3rd party libraries
import R from 'ramda';

// import actions
import {updateActiveProjectInfo, fetchActiveProjectAllocations,updateTempAllocation}  from './projects_actions';



// import selectors

import {BASE_URL} from '../constants.js'
class ProjectFetch extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projectShortList:[],
      value:''
    };
  }  
  
  getOptions = (input) => {
    return fetch(`${BASE_URL}projects/?projectId=${input}`)
      .then((response) => {
      return response.json();
      }).then((json) => {
      this.setState({projectShortList:json})
      // return { options:R.pluck('projectId',json).map((item)=>({'value':item, 'label':item})) };
    });
  }


  componentWillMount(){
  }

  onRowClick= (row)=>{
      // console.log(row.id)
      // console.log(this.state)
      // console.log(this.state.projectShortList)
      // console.log(R.filter(R.propEq('id',row.id),this.state.projectShortList)[0])
      var activeP = R.filter(R.propEq('id',row.id),this.state.projectShortList)[0]
      this.props.updateActiveProjectInfo(activeP)
      this.props.fetchActiveProjectAllocations(this.props.userToken,activeP.id)
      if(!!this.props.activeStaffId&&!!activeP.id){
        console.log('THIS SHOULD SET TEMP ALLOCATION')
        this.props.updateTempAllocation({
          staffmember_id:this.props.activeStaffId,
          to_project:activeP.id,
          allocation:R.filter(R.propEq('staffmember_id',this.props.activeStaffId),this.props.activeProjectAllocations)[0].allocation||[]
        },activeP.startdate,activeP.enddate)
      }
  }

  options = {
    onRowClick: this.onRowClick
  };  


  _onChange = (e)=>{
      // console.log(this.state.projectShortList[0])
      this.getOptions(e.target.value)
      this.setState({value:e.target.value})
    }
  
  _onBlur = ()=>{
    this.setState({value:''})
  }



  render() {
    return (

      <Col> 
        <FormControl 
          id="projectId"
          autocomplete="off"
          type="text"
          label="Search for   project by id..."
          onChange={this._onChange.bind(this)}
          // onChange={_onChange}
          value={this.state.value}
          onBlur={this._onBlur.bind(this)}
          placeholder="Search for projects by id..." />
      <br/>
          <BootstrapTable 
          height={'150'}
          // set table style offsets to 15
          containerStyle={ {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 10,
            marginLeft: 10,
          } }

          tableStyle={ {
            marginTop: 0,
            marginBottom: 0,
            marginRight: -10,
            marginLeft: -10,
          } }

          data={this.state.projectShortList} 
          options = {this.options}
          hover
          striped
          condensed>
              <TableHeaderColumn isKey dataField='projectId'>Project Id</TableHeaderColumn>
              <TableHeaderColumn dataField='name'    >Name</TableHeaderColumn>
          </BootstrapTable>
      </Col>
    );
  }
}





const mapStateToProps = ( {activeProjectInfo,userToken,activeStaffId,activeProjectAllocations} ) => {
  return {
    activeProjectInfo,
    activeStaffId,
    activeProjectAllocations,
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateActiveProjectInfo,fetchActiveProjectAllocations,updateTempAllocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFetch);
