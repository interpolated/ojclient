// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select';
import chroma from 'chroma-js'

// import 3rd party react components
import {Panel,Row,Col,ButtonGroup, Button,Container,FormGroup,FormControl,Dropdown,MenuItem} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ResponsiveContainer,BarChart, ComposedChart,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {updateActiveProjectInfo, fetchActiveProjectAllocations,updateTempAllocation}  from './projects_actions';
import {transformBadAllocation} from '../common/common_utils'
import {setActiveStaffId,setActiveStaffIdAppRender} from '../common/common_actions'

// import components
import {StaffSymbol} from '../staff/staff_symbol'

class SummaryGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }  


  _onSVGClick=(e)=>{
    e.stopPropagation()
    setActiveStaffIdAppRender(parseInt(e.target.id))
  }


  Barcharter=(id)=>{
    var color = ''
    if(id!== 'allocation_'+this.props.activeStaffId){
      console.log(id)
      var splitId=id.split('_')[1]
      color = this.props.staffColors[splitId]
    }else{
      color='#E40000'
    }
    if(!(id=='day'||id=='unit'))
    {return(
          <Area             
          isAnimationActive = {false}
          dataKey={`${id}`} 
          stackId='a' 
          stroke={'none'}
          fill={color} />)}
  } 

  svgStyle={position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 200}

  AllocatedStaff =(allocationObj,index)=>{
      var staffObj=this.props.staffInfo[allocationObj.staffmember_id]

      staffObj.y=30
      staffObj.x=(index*15+30)
      staffObj.color = this.props.staffColors[staffObj.id]
      return StaffSymbol(staffObj)

    }
 


  render (){
    return(
      <Row >
      <div>
        <svg 
          style={this.svgStyle}
          version="1.1" 
          xmlns="http://www.w3.org/2000/vsg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 300 100"
          onClick={this._onSVGClick.bind(this)}
          >
          {this.props.activeProjectAllocations.map(this.AllocatedStaff)}
         </svg>
      </div>
         <ResponsiveContainer height={280}>
            <ComposedChart 
             data={this.props.stackedAllocations}
             barGap={'1em'}
             barCategoryGap={'1%'}
             margin={{top: 6, right: 30, left: 20, bottom: 5}}>
             <YAxis   tickLine={false}  axisLine={false} allowDecimals={false} width={10} />
            {Object.keys(this.props.stackedAllocations[0]).map(this.Barcharter)}
           </ComposedChart>
         </ResponsiveContainer>
      </Row>
    )
  }
}

const staffColorMaker=(x)=>{
    var ids=R.pluck('staffmember_id', x).sort()
    // ids=ids.map(e=>{return('allocation_'+e)})
    var colors = chroma.scale('YlGnBu').padding(0.15).colors(ids.length)
    return R.zipObj(ids, colors)
    
  }



const  allocationNamer=(x)=>{
  // returns arrays not objects
    // console.log(x)
    if(!(typeof x.allocation=='undefined')){
        return x.allocation.map(e=>{
          return {['allocation_'+x.staffmember_id]:e.allocation,day:e.day,unit:1}
        })
    }  
  }

const  listMerger=(x)=>{
    if(!(typeof x[0]=='undefined')){
        return x[0].map(function(outerItem,outerIndex,arr){
          // console.log('Getting this index')
          // console.log(outerIndex)
          // console.log(outerItem['day'])
          var merged= (R.mergeAll(x.map(function(item){
            return item[String(outerIndex)]
          })))
          // console.log('Merging these items:')
          // console.log(merged)
          return (merged)  
        })}else{
          return ([{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0},{'allocation4':0,'allocation2':0,'allocation3':0}])
        }
    } 


 



const  Updater = (x,y)=>{
    // console.log('RAW DATA')
    // console.log(x)
    // console.log(y)

    var cleanAllocations=x.map((e)=>transformBadAllocation(e,y.startdate,y.enddate))
    var namedAllocations = cleanAllocations.map(allocationNamer)
    namedAllocations.sort(function(a,b){return b.length-a.length})
    var stacked = (listMerger(namedAllocations))

    return stacked||[]

    
}


const mapStateToProps = ( {activeProjectAllocations,staffInfo,activeStaffId,activeProjectInfo} ) => {
  return {
    activeProjectInfo,
    staffInfo,
    activeProjectAllocations,
    activeStaffId,
    stackedAllocations:Updater(activeProjectAllocations,activeProjectInfo),
    staffColors: staffColorMaker(activeProjectAllocations)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryGraph);