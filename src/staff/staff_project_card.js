
// import react and redux
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions

// import selectors



const COMPONENTNAME = (props) => {

  return (
      <div>


      </div>
    )


}


const mapStateToProps = ( {BITSOFSTATE} ) => {
  return {
    staffInfo,
    activeStaffId,
    staffUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ACTIONCREATORS}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(COMPONENTNAME);