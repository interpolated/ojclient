
// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';
import {BarChart, ComposedChart,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// import actions
import {updateTempAllocation,setProjectAllocation,updateProjectAllocation}  from './projects_actions';
import {createOrUpdate}  from '../common/common_actions';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class SetAllocationGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawActive: false,
    };
  }  

  counts = [0, 0.25, 0.5, 0.75,  1]
 
  closest = (goal) => {
    return this.counts.reduce(function (prev, curr) {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    })
  };

  _onMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drawActive:true})
    }      
  

  _onMouseLeave = (e) => {
    this.setState({drawActive:false})
    this.props.updateProjectAllocation(this.props.activeStaffId,this.props.tempAllocation)

  }



  _onMouseMove = (e) => {
    // check if mousedown with drawActive, find the active day based on the 'activeLabel'
    if(this.state.drawActive==true&&R.contains(e.activeLabel,R.pluck('day', this.props.tempAllocation.allocation))){
      // find the index
      var changedIndex = R.findIndex(R.propEq('day', e.activeLabel))(this.props.tempAllocation.allocation)
      if(changedIndex>=0){
        var storeage=R.update(changedIndex,{projAllocation:1,day:e.activeLabel,allocation:this.closest((270-e.chartY)/270)},this.props.tempAllocation.allocation)
      }else{
      }
      // updateTempAllocation uses R.findIndex to update state
      this.props.updateTempAllocation({allocation:storeage},this.props.activeProjectInfo.startdate,this.props.activeProjectInfo.enddate)
    }
  this.forceUpdate()

  }

  _onMouseUp = (e) => {
    this.setState({drawActive:false})
    this.props.updateProjectAllocation(this.props.activeStaffId,this.props.tempAllocation)
    createOrUpdate('allocation',this.props.tempAllocation,this.props.userToken)
  }

  render (){

    // console.log(this.props.tempAllocation)  
    return(
      <Row>
      <Col md="8" onMouseDown={this._onMouseDown.bind(this)} onMouseUp={this._onMouseUp.bind(this)}>
        <div>
          <ComposedChart 
            onMouseMove={this._onMouseMove.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            width={800} 
            height={300} 
            data={this.props.tempAllocation.allocation}
            barGap={'1em'}
            barCategoryGap={'1%'}
            margin={{top: 6, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid
            strokeDasharray="1 5"
            stroke='#A59E9E'
            height={0.2}
            vertical={false}/>
          <XAxis dataKey="day" style={{ pointerEvents: 'none' }}/>
          <Area type='monotone' dataKey='projAllocation' fill='none' stroke='none'/>
          <Bar             
            isAnimationActive = {false}
            dataKey="allocation" 
            stackId='a' 
            fill="#C5C3F5" />
          </ComposedChart>
        </div>
      </Col>
      </Row>
    )
  }
}


  
const mapStateToProps = ( {userToken,staffInfo,projectAllocation,activeStaffId,tempAllocation,activeProjectInfo,activeProjectAllocations,activeStaffAllocations} ) => {
  return {
    staffInfo,
    userToken,
    activeStaffId,
    tempAllocation,
    activeProjectInfo,
    projectAllocation,
    activeStaffAllocations,
    activeProjectAllocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateTempAllocation, createOrUpdate, setProjectAllocation,updateProjectAllocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAllocationGraph);

