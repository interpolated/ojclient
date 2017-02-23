


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
import moment from 'moment'
// import actions
import {
  updateProjectMilestone,
} from './projects_actions'


// import selectors


// add milestone

// update milestone

// delete milestone

// each function is a function of the milestone object array


const ProjectTimeline = (props) => {

  const start = moment(props.activeProjectInfo.startdate).format('YYYYMMDD')
  const end = moment(props.activeProjectInfo.enddate).format('YYYYMMDD')
  const milestoneArray = props.activeProjectMilestones

  const milestoneDateCleaner = (x)=>{
    x.duedate= parseInt(moment(x.duedate).format('YYYYMMDD'))
    return x
  }

  const cleanMilestoneArray=milestoneArray.map(milestoneDateCleaner)

  console.log(cleanMilestoneArray)
  console.log(start)
  console.log(end)
  console.log(R.pluck('duedate',cleanMilestoneArray))

  const _onAfterChange = (e)=>{
    console.log(e)
  }

  return (
      <Row>
        <Range 
        min={start}
        max={end}
        value={R.pluck('duedate',cleanMilestoneArray)} />
      </Row>
    )
}


const mapStateToProps = ( {activeStaffId,activeProjectInfo,userToken,activeProjectMilestones} ) => {
  return {
    activeStaffId,
    activeProjectInfo,
    activeProjectMilestones,
    userToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateProjectMilestone}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimeline);