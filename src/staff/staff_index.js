// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import components
import StaffTable  from './staff_staff_table';
import StaffDetail  from './staff_card';

// import actions
import {fetchStaffInfo} from '../common/common_actions'

// import selectors


class Staff extends Component {
  
  componentWillMount(){
    console.log(this.props.userToken)
    this.props.fetchStaffInfo(this.props.userToken)
  }


  render() {
    return (
      <div className="container-fluid">      
        <Col md="4">
          <StaffTable/ >
        </Col>
        <Col md="8">
          <StaffDetail/>

        </Col>
      </div>
    );
  }
}



const mapStateToProps = ( {userToken} ) => {
  return {
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchStaffInfo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
