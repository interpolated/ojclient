import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Container,Col,Row} from 'react-bootstrap';
import SeatMap  from './seats_map';
import UnallocatedTable  from './seats_unallocated_table';
import {fetchStaffInfo} from '../common/common_actions'

class Seats extends Component {
  
  componentWillMount(){
    console.log(this.props.userToken)
    this.props.fetchStaffInfo(this.props.userToken)
  }

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Row>
            <Col md="8">
              <SeatMap/>
            </Col>
            <Col md="4">
              <UnallocatedTable/ >
            </Col>
          </Row>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
