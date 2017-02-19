import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateStaffInfo,setActiveStaffId} from '../common/common_actions'
import {noDeskStaff} from '../selectors/staff_desks'
import R from 'ramda';
import { denormalize, schema } from 'normalizr';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {fetchStaffmemberSkills,fetchStaffmemberAllocations} from './staff_actions'
import {fetchStaffInfo} from '../common/common_actions'
import {updateTempAllocation} from '../projects/projects_actions'
import moment from 'moment'

class StaffTable extends Component {
  componentWillMount(){
    console.log(this.props.userToken)
    this.props.fetchStaffInfo(this.props.userToken)
  }
  
  dataObj = {}


  // the above is equivalent to Object.values(props.staffInfo)

  allocationStretcher = (allocation)=>{

    this.props.updateTempAllocation(this.props.activeStaffId,this.props.activeProjectInfo.id,this.dataObj)
    // console.log('ooooasdf')
    // console.log(this.props.tempAllocation)
  }
  
  onRowClick= (row)=>{
    // console.log('yah')
    this.props.setActiveStaffId(row.id)
    this.props.fetchStaffmemberAllocations(this.props.userToken,row.id)
    this.props.fetchStaffmemberSkills(this.props.userToken,row.id)
    if(!!this.props.activeProjectInfo.id){
      if(R.filter(R.propEq('staffmember',row.id),this.props.activeProjectAllocations).length>0){
        this.props.updateTempAllocation({
          staffmember:row.id,
          to_project:this.props.activeProjectInfo.id,
          allocation: R.filter(R.propEq('staffmember',row.id),this.props.activeProjectAllocations)[0].allocation
        })
      }else{
         this.props.updateTempAllocation({
          staffmember:row.id,
          to_project:this.props.activeProjectInfo.id,
          allocation: []
          })
      }
    }
  }


  options = {
    onRowClick: this.onRowClick
  };  

  // console.log(denormalizedData.users)
  render (){ 
    return(
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
            marginRight: -10,
            marginLeft: -10,
          } }

          data={Object.values(this.props.staffInfo)} 
          options = {this.options}
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
    )}    

}


// code more efficiently
// write down problems and comment them out - spend more time in sublime text
// learn how to write tests - write to test
// don't fiddle so much in the browser = more time in browser than in sublime


const mapStateToProps = ( {staffInfo, activeStaffId, activeProjectInfo,activeProjectAllocations, userToken} ) => {
  return {
    staffInfo,
    activeStaffId,
    activeProjectAllocations,
    activeProjectInfo,
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchStaffInfo,fetchStaffmemberSkills,fetchStaffmemberAllocations,setActiveStaffId,updateTempAllocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffTable);