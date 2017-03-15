import React from 'react';
import {hashHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setRedirectUrl} from './authentication_actions';

class LoginRequiredContainer extends React.Component {
    constructor(props) {
    super(props);
  }


  componentDidMount() {
    console.log(this.props)
    if (!this.props.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.setRedirectUrl(this.props.currentURL) // dispatch currentURL to store so login can push you there
      hashHistory.replace('/login') // user hashHistory from react-router to send you back to login
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps({isLoggedIn}, ownProps) {
  return {
    isLoggedIn,
    currentURL: ownProps.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setRedirectUrl}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginRequiredContainer)