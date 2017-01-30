import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Seats from './seats/seats_index';
import LoginForm from './authentication/login_component';
import LoginRequiredContainer from './authentication/login_required_container';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers_index';
import thunk from 'redux-thunk'
import {  Router, Route, IndexRoute, Link, browserHistory  } from 'react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

window.store =  store

// console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='login' component={LoginForm}/>
      
        <Route component={LoginRequiredContainer}>
          <Route path='seats' component={Seats}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')  
)
    // <Route path='staff' component={Staff}/>
    // <Route path='projects' component={Projects}/>
    // <Route path='skills' component={Skills}/>
    // first component will be container, nested routes will be nested like comonents


