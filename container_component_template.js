import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Container,Col,Row} from 'react-bootstrap';
import SeatMap  from './seats_map';
import UnallocatedTable  from './seats_unallocated_table';
import {fetchStaffInfo} from '../common/common_actions'

class Seats extends Component {
  
  componentWillMount(){
  }

  render() {
    return (
    <div>
     yah
    </div>
    );
  }
}


const mapStateToProps = ( {BITSOFSTATE} ) => {
  return {
    BITSOFSTATE
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ACTIONCREATOR}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
