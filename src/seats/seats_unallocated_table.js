import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleStaffUp} from './seats_actions'
import {updateStaffInfo,setActiveStaffId} from '../common/common_actions'
import {desks} from './seats_svg';
import {deskCentroids} from './seats_desk_centroids'
import {noDeskStaff} from '../selectors/staff_desks'
import R from 'ramda';
import { denormalize, schema } from 'normalizr';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'



const UnallocatedTable = (props) => {
  const user = new schema.Entity('users');
  const mySchema = { users: [ user ] }
  let entities = { users: props.staffInfo };
  let denormalizedData = denormalize({ users: Object.keys(props.staffInfo) }, mySchema, entities);

  // the above is equivalent to Object.values(props.staffInfo)
  
  const onRowClick= (row)=>{
    console.log(denormalizedData)
    if(!props.staffUp){
        props.setActiveStaffId(row.id)
        props.toggleStaffUp()
      }
  }

  const unAllocate = (e)=>{
    e.stopPropagation()
    if(props.staffUp){
      props.updateStaffInfo({deskId:e.target.id},props.activeStaffId)
      props.toggleStaffUp()
      console.log('down!')

    }
  }

  const  staffDown  = ()=>{
    if(props.staffUp){
      props.toggleStaffUp()
    }
  }

  const options = {
    onRowClick: onRowClick
  };  

  // console.log(denormalizedData.users)
  return (  
      <div>
        <div onClick={staffDown}>
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

          data={denormalizedData.users} 
          options = {options}
          hover
          striped
          search
          condensed>
              <TableHeaderColumn isKey dataField='id'>Staff ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name'    >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='deskId'  >Location</TableHeaderColumn>
              <TableHeaderColumn dataField='skills'  >Skills</TableHeaderColumn>
          </BootstrapTable>
        <div  className={"container-fluid"}>
        <br/>
          <Button onClick={unAllocate} color="secondary" size="md" block id=''>unallocate</Button>  
          <Button onClick={unAllocate} color="secondary" size="md" block id='left'>left</Button>  
          <Button onClick={unAllocate} color="secondary" size="md" block id='metro'>metro</Button>  
        </div>
        </div>

      </div>
    )    

}


// code more efficiently
// write down problems and comment them out - spend more time in sublime text
// learn how to write tests - write to test
// don't fiddle so much in the browser = more time in browser than in sublime


const mapStateToProps = ( {staffInfo, activeStaffId, staffUp} ) => {
  return {
    staffInfo,
    activeStaffId,
    staffUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateStaffInfo, toggleStaffUp, setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UnallocatedTable);