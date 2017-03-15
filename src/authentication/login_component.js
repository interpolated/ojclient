import React from 'react';
import { Panel,Col, Button, Form, FormGroup, ControlLabel, FormControl, FieldGroup,Label, Input, FormText } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {setRedirectUrl,toggleLoggedIn,setUserToken,logIn}  from './authentication_actions';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    let target = event.target;
    let name = target.id;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e)=>{
    console.log('logging in........')
    this.props.logIn(this.state.username,this.state.password)
    hashHistory.replace('/seats')
    e.preventDefault();
  }


  render(){
    return (
      <div>
        <Col md={4} mdOffset={4}>
          <form>
            <FormGroup controlId="username">
              <ControlLabel>User Name</ControlLabel>
              <FormControl 
                onChange = {this.handleChange}
                id="username"
                type="Text"
                label="Text"
              />
            </FormGroup>
            <FormGroup controlId="password">
              <ControlLabel>Password</ControlLabel>
              <FormControl  
                onChange = {this.handleChange}
                id="password"
                type="Text"
                label="Text"
              />
            </FormGroup>
            <Button type="submit" onClick={this.handleSubmit}>
              Login
            </Button>
          </form>
        </Col>
      </div>
    )
    
  }
}

// rendered if not logged in by LoginRequiredContainer
function mapStateToProps({isLoggedIn}, ownProps) {
  return {
    isLoggedIn,
    currentURL: ownProps.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setRedirectUrl, toggleLoggedIn, setUserToken, logIn}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)

//name
//password

// validation

// submit action

// store token in state action