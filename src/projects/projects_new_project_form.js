import { bindActionCreators } from 'redux';
import React from 'react'
import { connect } from 'react-redux'
import {updateProject} from '../actions/actions'
import { getTypes } from '../selectors/selectors'
import {Input,Label,InputGroup,InputGroupAddon } from 'reactstrap'

const ArrayForm = (props) => {
  if(props.types!==undefined){
  console.log(props.types)
  const ids = Object.keys(props.types)
// props.updateProject('types',e.target.property,e.target.storeid,e.target.value)

  return(
      <div onChange={(e)=>{console.log(e.target)}}>
        <br/>
        {ids.map((id,index) => {return ObjectForm(id,props.types[id],props)})}
      </div>
    )
  }
  return(<div>nothing</div>)
}

const ObjectForm = (id,object,props) => {
  const properties = Object.keys(object);
  console.log(id)
  console.log(properties)
  return (  
    <div onChange={(e)=> {props.updateProject('types',id,e.target.name,e.target.value)}}>
      <Label>{id}</Label>
      {properties.map((property,index)=>{return KeyValForm(id,property,object[property],index)})}
      <br/>
    </div>
    )  
}



// 
const KeyValForm = (id,property, value, index) =>{
  return (
    <div>
      <InputGroup>
        <InputGroupAddon>{property}</InputGroupAddon>
        <Input name={property} data-storeid={id} defaultValue={value} type="text"/>  
      </InputGroup>
    </div>
  )
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({ updateProject }, dispatch);

}

// CONTAINER
export default connect(
    (state) => ({types: getTypes(state)}),
    mapDispatchToProps
)(ArrayForm) 