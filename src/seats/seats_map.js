import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleStaffUp} from './seats_actions'
import {updateStaffInfo,setActiveStaffId} from '../common/common_actions'
import {desks} from './seats_svg';
import {deskCentroids} from './seats_desk_centroids'
import {deskMap} from '../selectors/staff_desks'
import R from 'ramda';

const SeatMap = (props) => {

// selector to give staff - desk mapping

  
  const opacityChanger = ( ) => 
  { 
    if(props.staffUp) {
      return {
        opacity:0.3,
        pointerEvents:'none'
        }
    }
  }

// logic to pick up staff and change id

// on first click set staffUp to true and set activeStaffId
  const firstClick=(e)=>{
    e.stopPropagation();
    let tempStaffUp = props.staffUp
    if(!tempStaffUp){
          props.setActiveStaffId(e.target.id);
        }
    props.toggleStaffUp();
  }


// on second click check if someone in target seat -> if yes unallocate them
// then change active staff and 
  const secondClick=(e)=>{

    const currentSitter = R.filter(R.propEq('deskId',e.target.id), props.staffInfo)
    if (!R.isEmpty(currentSitter)){
      props.updateStaffInfo({deskId:''},Object.keys(currentSitter)[0])
    }
    let tempStaffUp = props.staffUp
    if(tempStaffUp&&(e.target.id!=='overlay')){
          // R.filter()
          // props.updateStaffInfo({deskId:e.target.id},e.target.id)
          props.updateStaffInfo({deskId:e.target.id},props.activeStaffId);
          props.toggleStaffUp();
        }
  }


  function Staffsymbol(props) {
    return (
        <g>
          <circle 
            onClick ={firstClick} 
            cx={props.x} 
            cy={props.y} 
            className='staffsymbol' 
            id={props.id} 
            style={opacityChanger(props.staffUp)}
            r='5'></circle>
          <text 
            className='initials' 
            fontSize='6' 
            x={props.x} y={props.y} 
            dy="0.4em" 
            textAnchor="middle">{props.name.split(' ').map(e=>(e[0])).join('')}</text> 
        </g>
      )
  }

  const StaffRenderer = (staffObj)=>{
    console.log(staffObj)
            if (!R.isEmpty(staffObj)&&staffObj.deskId.includes('desk')){
              return(
                <Staffsymbol  
                  x={deskCentroids[staffObj.deskId][0]}
                  y={deskCentroids[staffObj.deskId][1]}
                  name={staffObj.name}
                  id={staffObj.id}>
                </Staffsymbol>
              )
            }else{
              return null
            }   
          }
  
  return(
      <div id="svgcontainer">
        <svg id="overlay"
          version="1.1" 
          xmlns="http://www.w3.org/2000/vsg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="10 10 420 297"
          onClick={secondClick}
          >
        {desks}
        {Object.values(R.map(StaffRenderer, props.staffInfo))}
        </svg>
      </div>
    )
}

const mapStateToProps = ( {staffInfo, activeStaffId, staffUp} ) => {
  return {
    staffInfo,
    staffUp,
    activeStaffId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateStaffInfo, toggleStaffUp, setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatMap);