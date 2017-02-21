


// import react and redux
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

// import 3rd party libraries
import R from 'ramda';

// import actions

// import selectors



const ProjectTimeline = (props) => {



  return (
      <div>
        <Slider />
        <Range />
      </div>
    )


}


const mapStateToProps = ( {activeStaffId,activeProjectInfo,userToken,activeProjectMilestones} ) => {
  return {
    activeStaffId,
    activeProjectInfo,
    activeProjectMilestones,
    userToken
  }w
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ACTIONCREATORS}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimeline);