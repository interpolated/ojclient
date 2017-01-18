import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateStaffInfo,setActiveStaffId,toggleStaffUp} from '../actions/actions'
import {desks} from '../assets/seats';
import {deskCentroids} from '../assets/desk_centroids'
import {deskMap} from '../selectors/staff_desks'
import R from 'ramda';

const SeatMap = (props) => {
  
  const opacityChanger = ()=>{
    if(props.staffUp){
      return {
        opacity:0.3,
        pointerEvents:'none'
        }
    }
  }

  const firstClick=(e)=>{
      e.stopPropagation();
      let tempStaffUp = props.staffUp
      if(!tempStaffUp){
            props.setActiveStaffId(e.target.id);
          }
      props.toggleStaffUp();
    }
  const secondClick=(e)=>{
        let tempStaffUp = props.staffUp
        if(tempStaffUp&&(e.target.id!=='overlay')){
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

  const StaffRenderer = (val,key)=>{
            console.log(val)
            if (!!val&&val.includes('desk')){
              return(
                <Staffsymbol  
                  x={deskCentroids[val][0]}
                  y={deskCentroids[val][1]}
                  name={props.staffInfo[key].name}
                  id={key}>
                </Staffsymbol>
              )
            }else{
              return 
            }   
          }
  
  return(
      <div >
        <svg id="overlay"  
          version="1.1" 
          xmlns="http://www.w3.org/2000/vsg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 420.0 297.0"
          onClick={secondClick}
          >
        {desks}
        {Object.values(R.mapObjIndexed(StaffRenderer, deskMap(props.staffInfo)))}
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