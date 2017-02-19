
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
import {updateTempAllocation,setProjectAllocation}  from './projects_actions';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class SetAllocationGraph extends Component {
  
  // Takes data with keys date and allocation percentage


  // create data object from activeProject startdate and enddate

  // intersecting allocation for values

  constructor(props) {
    super(props);
    this.state = {
      drawActive: false,
    };
  }  

 dataObj = {}

 componentWillReceiveProps(nextProps){
    // console.log(this.props.tempAllocation)

  }
 




// if smallest date = smallest date
// and enddate=enddate
// then skip
// otherwise transform
// otherwise


  counts = [0, 0.25, 0.5, 0.75,  1]
 

  closest = (goal) => {
    return this.counts.reduce(function (prev, curr) {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    })
  };

  _onMouseDown = (e) => {
    console.log('Mouse down!')
    e.preventDefault()
    e.stopPropagation()
    this.setState({drawActive:true})
    }      
  

  _onMouseLeave = (e) => {
    console.log('mmopouse out!')
    this.setState({drawActive:false})
  }



  _onMouseMove = (e) => {
    console.log(this.state.drawActive) 
    console.log(e.activeLabel)
    this.data = (this.transform(this.props.tempAllocation))
    if(this.state.drawActive==true&&R.contains(e.activeLabel,R.pluck('day', this.data))){
      var changedIndex = R.findIndex(R.propEq('day', e.activeLabel))(this.data)
      // take 30 off chart height to allow for X axis.... #todo add height as prop
      var changedObj = R.merge(this.data[changedIndex], {allocation:this.closest((270-e.chartY)/270)})
      this.data=R.update(changedIndex,changedObj,this.data)
      // var storeage={[changedObj.day]:changedObj.allocation}
      // this.props.updateTempAllocation({allocation:storeage})
    }      
  }
  _onMouseUp = (e) => {
    this.setState({drawActive:false})
  }

  render (){
    return(
      <Col md="8" onMouseDown={this._onMouseDown.bind(this)} onMouseUp={this._onMouseUp.bind(this)}>
        {JSON.stringify(this.props.tempAllocation)}
        <div>
          <ComposedChart 
            onMouseMove={this._onMouseMove.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            width={800} 
            height={300} 
            data={this.data}
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
    )
  }


}


const mapStateToProps = ( {staffInfo,projectAllocation,activeStaffId,tempAllocation,activeProjectInfo,activeProjectAllocations,activeStaffAllocations} ) => {
  return {
    staffInfo,
    activeStaffId,
    tempAllocation,
    activeProjectInfo,
    projectAllocation,
    activeStaffAllocations,
    activeProjectAllocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateTempAllocation, setProjectAllocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAllocationGraph);

