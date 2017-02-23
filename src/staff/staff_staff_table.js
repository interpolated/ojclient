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
import {transformBadAllocation} from '../common/common_utils'
import {updateTempAllocation} from '../projects/projects_actions'
import moment from 'moment'

class StaffTable extends Component {
  componentWillMount(){
    console.log(this.props.userToken)
    this.props.fetchStaffInfo(this.props.userToken)
  }
  
  dataObj = {}


  // the above is equivalent to Object.values(props.staffInfo)


  
  onRowClick= (row)=>{
    // console.log('yah')
    this.props.setActiveStaffId(row.id)
    this.props.fetchStaffmemberAllocations(this.props.userToken,row.id)
    this.props.fetchStaffmemberSkills(this.props.userToken,row.id)
    // this.props.updateTempAllocation(payload,this.props.activeProjectInfo.startdate,this.props.activeProjectInfo.enddate)

    if( !!this.props.activeProjectInfo.id&&
        !!this.props.activeProjectAllocations
      ){
      if(R.filter(R.propEq('staffmember_id',row.id),this.props.activeProjectAllocations).length>0){
        // console.log('temp allocation is happening')
        this.props.updateTempAllocation(
          transformBadAllocation(R.filter(R.propEq('staffmember_id',row.id),this.props.activeProjectAllocations)[0],
          this.props.activeProjectInfo.startdate,
          this.props.activeProjectInfo.enddate)
        )
      }else{
        // console.log('temp allocation is not happening')
         this.props.updateTempAllocation(
          transformBadAllocation({
            staffmember_id:row.id,
            to_project:this.props.activeProjectInfo.id,
            allocation: []
         },
          this.props.activeProjectInfo.startdate,
          this.props.activeProjectInfo.enddate
      )
    )
  }
}}


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