// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container,FormGroup,FormControl,Dropdown,MenuItem} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  import {BarChart, ComposedChart,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Line} from 'recharts';


// import 3rd party libraries
import R from 'ramda';

// import actions
import {updateActiveProjectInfo, fetchactiveStaffAllocations,updateTempAllocation}  from './projects_actions';
import {transformBadAllocation} from '../common/common_utils'

class ExistingAllocationGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }  

// function maps over allocation object and creates stacked chart - need to move to selectors
  
  OtherBarCharter=(id)=>{
    if(id.split('_')[1]==this.props.activeProjectInfo.id){
        console.log('its the sames')
        return
      }else{
      if(!(id=='day')&&!(id=='unit')){
        return(
            <Area             
            dataKey={`${id}`} 
            stackId='a' 
            stroke={'none'}
            isAnimationActive = {false}
            fill={'#DADADA'} />
        )
      }
    }
  }       

  CurrentBarCharter=(id)=>{
    if(id.split('_')[1]==this.props.activeProjectInfo.id){
      console.log('THIS')
      if(!(id=='day')&&!(id=='unit')){
        return(
            <Area             
          dataKey={`${id}`} 
          stackId='a' 
          stroke={'none'}
          isAnimationActive = {false}
          fill={'#DC0000'} />
        )
      }
    }else{
      console.log(id)
    }
  }
         

    // this.forceUpdate()

  render (){
    // console.log(this.stacker(this.props.activeStaffAllocations))
    // console.log(this.props.stackedAllocations)
    return(
      <Row >
        <div>
          <ComposedChart 
            width={800} 
            height={300} 
            data={this.props.stackedAllocations}
            barGap={'1em'}
            barCategoryGap={'1%'}
            margin={{top: 6, right: 30, left: 20, bottom: 5}}>
          CartesianGrid
           {Object.keys(this.props.stackedAllocations[0]).map(this.CurrentBarCharter)}
           {Object.keys(this.props.stackedAllocations[0]).map(this.OtherBarCharter)}
           <Area isAnimationActive={false} type="monotone" dataKey="unit" fill={"none"} stroke="#000000" strokeDasharray="5 5"/>
          </ComposedChart>
        </div>
      </Row>
    )
  }
}


const  allocationNamer=(x)=>{
    if(!(typeof x.allocation=='undefined')){
        return x.allocation.map(e=>{
          return {['allocation_'+x.to_project]:e.allocation,day:e.day,unit:1}
        })
    }  
  }

const  listMerger=(x)=>{
    if(!(typeof x[0]=='undefined')){
        return x[0].map(function(outerItem,outerIndex,arr){
          return (R.mergeAll(x.map(function(item){
            return item[outerIndex]
          })))  
        })}else{
          return ([{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0}])
        }
    } 


 



const  Updater = (x,y)=>{
    console.log('raw data')
    // console.log(x)
    // console.log(y)

    var stacker = x.map(allocationNamer)
    stacker.sort(function(a,b){return b.length-a.length})
    var stacked = (listMerger(stacker))
    var shortStacked = transformBadAllocation(stacked, y.startdate,y.enddate)
    // console.log('output for stacking')    
    // console.log(shortStacked)
    return shortStacked||[]

    
  }

const mapStateToProps = ( {activeStaffAllocations,activeProjectInfo} ) => {
  return {
    activeStaffAllocations,
    activeProjectInfo,
    stackedAllocations:Updater(activeStaffAllocations,activeProjectInfo)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExistingAllocationGraph);

