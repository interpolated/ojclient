


// import react and redux
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {cloneDeep,findKey,curry} from 'lodash'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Slider, { Range } from 'rc-slider';
import ReactSlider from 'react-slider';
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


  const sliderRange = (activeProjectInfo,activeProjectMilestones)=>{
    // returns slider.marks - map between slider marks and dates (then filter milestones to update)
    // slider


    var slider={}
    if(!R.isEmpty(activeProjectInfo)){
      const range = moment.range(activeProjectInfo.startdate, activeProjectInfo.enddate);
      slider.start = parseInt(moment(activeProjectInfo.startdate).format('YYYYMMDD'))
      slider.end = parseInt(moment(activeProjectInfo.enddate).format('YYYYMMDD'))
     
      const milestoneArray = cloneDeep(activeProjectMilestones)
      const cleanMilestoneArray=milestoneArray.map(milestoneDateCleaner)
      var days = Array.from(range.by('week'));
      days =days.map(m=>(parseInt(m.format('YYYYMMDD'))))
      var marks = {}
      marks= days.map((e,i)=>{
        return {[2*i+1]:e}
      })
      slider.marks=R.mergeAll(marks)

      slider.milestones =   R.pipe(
        R.pluck('duedate'),
        R.map(cDateToSliderIndex(slider.marks))
      )(cleanMilestoneArray)
      return slider
    }    
  }

const dateToSliderIndex = (sliderMarks,date)=>{
  return parseInt(findKey(sliderMarks,(x)=>{return (x==date)}))
}

const cDateToSliderIndex = curry(dateToSliderIndex)


  const milestoneDateCleaner = (x)=>{
    x.duedate= parseInt(moment(x.duedate).format('YYYYMMDD'))
    return x
  }

  const _onAfterChange = (e)=>{
    console.log(e)
  }

  const slider = sliderRange(props.activeProjectInfo,props.activeProjectMilestones)

  





  const sliderStyle={
        paddingLeft: 35,
        paddingRight:35
    } 

  return (
      <div>
      {props.activeProjectInfo.startdate&&props.activeProjectInfo.enddate&&props.activeProjectMilestones.length&&
       <Row>
        <Col md="12" style={sliderStyle} >
            <Range 
            min={0}
            max={2*Object.keys(slider.marks).length}
            pushable={1}
            defaultValue={slider.milestones.sort()}
            marks={slider.marks}/>
       </Col>
      </Row>
    }
    </div>
)
}

          // max={days.length}
          // marks={marks}
          // dots={true}
          // step={1}

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