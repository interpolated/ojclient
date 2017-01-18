import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateStaffInfo,setActiveStaffId,toggleStaffUp} from '../actions/actions'
import {desks} from '../assets/seats';
import {deskCentroids} from '../assets/desk_centroids'
import {noDeskStaff} from '../selectors/staff_desks'
import R from 'ramda';
import { denormalize, schema } from 'normalizr';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row,Col,ButtonGroup, Button,Container} from 'reactstrap'



const UnallocatedTable = (props) => {
  const user = new schema.Entity('users');
  const mySchema = { users: [ user ] }
  let entities = { users: props.staffInfo };
  let denormalizedData = denormalize({ users: Object.keys(props.staffInfo) }, mySchema, entities);
  console.log(denormalizedData)
  
  const onRowClick= (row)=>{
    if(!props.staffUp){
        props.setActiveStaffId(row.id)
        props.toggleStaffUp()
      }
  }

  const unAllocate = (e)=>{
    console.log('woooo')
    console.log(props.activeStaffId)
    console.log(props.staffUp)
    if(props.staffUp){
      props.updateStaffInfo({deskId:e.target.id},props.activeStaffId)
      props.toggleStaffUp()
    }
  }

  const staffDown = ()=>{
    if(props.staffUp){
      props.toggleStaffUp()
    }
  }

  const options = {
    onRowClick: onRowClick
  };  

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
              <TableHeaderColumn dataField='name'   >Name</TableHeaderColumn>
              <TableHeaderColumn dataField='deskId'   >Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Row>
          <Container>
            <Container>
              <br/>
              <Button onClick={unAllocate} color="secondary" size="md" block id=''>unallocate</Button>  
              <Button onClick={unAllocate} color="secondary" size="md" block id='metro'>metro</Button>  
              <Button onClick={unAllocate} color="secondary" size="md" block id='left'>left</Button>  
            </Container>
          </Container>
        </Row>
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