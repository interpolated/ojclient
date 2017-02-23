import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

export const StaffSymbol=(props)=>{

    const style={
        fill:props.color,
        fillOpacity:0.5
    }
    console.log('MAKING SVG CIRCLE')
    console.log(style)
    return (
        <g>
          <circle 
            cx={props.x} 
            cy={props.y} 
            className='staffsymbol' 
            id={props.id} 
            style={style}
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