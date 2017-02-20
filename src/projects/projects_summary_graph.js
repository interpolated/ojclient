// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container,FormGroup,FormControl,Dropdown,MenuItem} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  import {BarChart, ComposedChart,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// import 3rd party libraries
import R from 'ramda';

// import actions
import {updateActiveProjectInfo, fetchActiveProjectAllocations,updateTempAllocation}  from './projects_actions';

class SummaryGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }  

// function maps over allocation object and creates stacked chart - need to move to selectors
  allocationNamer=(x)=>{
    console.log(x)
    if(!(typeof x.allocation=='undefined')){
        return x.allocation.map(e=>{
          console.log(e)
          return {['allocation'+x.staffmember_id]:e.allocation,day:e.day}
        })
    }  
  }

  listMerger=(x)=>{
    if(!(typeof x[0]=='undefined')){
        return x[0].map(function(outerItem,outerIndex,arr){
          return (R.mergeAll(x.map(function(item){
            return item[outerIndex]
          })))  
        })}else{
          return ([{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0}])
        }
    } 

 
  Barcharter=(id)=>{
    if(!(id=='day'))
    {return(
          <Area             
          isAnimationActive = {false}
          dataKey={`${id}`} 
          stackId='a' 
          stroke={'none'}
          fill={'#'+((1<<24)*Math.random()|0).toString(16)} />)}
  }         


  render (){
    var stacker = this.props.activeProjectAllocations.map(this.allocationNamer)
    // console.log(this.stacker(this.props.activeProjectAllocations))
    var stacked = (this.listMerger(stacker))
    return(
      <Row >
        <div>
          <ComposedChart 
            width={800} 
            height={300} 
            data={stacked}
            barGap={'1em'}
            barCategoryGap={'1%'}
            margin={{top: 6, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid
            strokeDasharray='1 5'
            stroke='#A59E9E'
            height={1}
            vertical={false}/>
          <XAxis dataKey='day' style={{ pointerEvents: 'none' }}/>
           {Object.keys(stacked[0]).map(this.Barcharter)}
          </ComposedChart>
        </div>
      </Row>
    )
  }
}

const mapStateToProps = ( {activeProjectAllocations} ) => {
  return {
    activeProjectAllocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryGraph);

