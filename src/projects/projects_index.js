// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions

// import selectors

class COMPONENTNAME extends Component {
  
  componentWillMount(){

  }

Project
  - contains milestones strung together - end date of previous becomes date of next
  - draw to add allocation
  - 



  render() {
    return (
      <div className="container-fluid">

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
  return bindActionCreators({ACTIONCREATORS}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(COMPONENTNAME);
