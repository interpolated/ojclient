
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
import setStaffAllocation  from "./projects_actions";

class AllocationGraph extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      drawActive: false,
      data: [
        {name: 'Page A', uv: 0.25, total:1},
        {name: 'Page B', uv: 0.25, total:0},
        {name: 'Page C', uv: 0.5, total:1},
        {name: 'Page D', uv: 0.5, total:1},
        {name: 'Page E', uv: 0.5, total:1},
        {name: 'Page F', uv: 0.5, total:1}
      ]
    };
  }  

  _onMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drawActive:true})
  }

  _onMouseLeave = (e) => {
    this.setState({drawActive:false})
  }

  counts = [0, 0.25, 0.5, 0.75,  1]
  

  closest = (goal) => {
    return this.counts.reduce(function (prev, curr) {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    })
  };

  _onMouseMove = (e) => {

    if(this.state.drawActive==true&&R.contains(e.activeLabel,R.pluck('name', this.state.data))){
      var changedIndex = R.findIndex(R.propEq('name', e.activeLabel))(this.state.data)
      var changedObj = R.merge(this.state.data[changedIndex], {uv:this.closest((300-e.chartY)/300)})
      this.setState({data:R.update(changedIndex,changedObj,this.state.data)})
    }      
  }

  _onMouseUp = (e) => {

    this.setState({drawActive:false})
  }

  render (){
    return(
      <Col md="8" onMouseDown={this._onMouseDown.bind(this)} onMouseUp={this._onMouseUp.bind(this)}>
        <div>
          <ComposedChart 
            onMouseMove={this._onMouseMove.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            width={600} 
            height={300} 
            data={this.state.data}
            barGap={'1em'}
            barCategoryGap={'1%'}
            margin={{top: 6, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid
            strokeDasharray="1 5"
            stroke='#A59E9E'
            height={0.2}
            vertical={false}/>
          <XAxis dataKey="name" style={{ pointerEvents: 'none' }}/>
          <Area type='monotone' dataKey='total' fill='none' stroke='none'/>
          <Bar             
              isAnimationActive = {false}
              dataKey="uv" 
              fill="#C5C3F5" />
          </ComposedChart>
        </div>
      </Col>
    )
  }


}


const mapStateToProps = ( {staffInfo,activeStaffId,staffAllocations} ) => {
  return {
    staffInfo,
    activeStaffId,
    staffAllocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setStaffAllocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllocationGraph);

