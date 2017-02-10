// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions
// import selectors
// import components
import AllocationGraph  from './projects_allocation_graph';


export default class Projects extends Component {
  
  componentWillMount(){

  }

// Projectsdf
//   - contains milestones strung together - end date of previous becomes date of 
//   - draw to add allocation
//   - 



  render() {
    return (
      <div className="container-fluid">
        <AllocationGraph/>
      </div>
    );
  }
}


// const mapStateToProps = ( {BITSOFSTATE} ) => {
//   return {
//     BITSOFSTATE
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ACTIONCREATORS}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(COMPONENTNAME);
