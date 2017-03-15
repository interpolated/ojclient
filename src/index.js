import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Seats from './seats/seats_index';
import Staff from './staff/staff_index';
import Projects from './projects/projects_index';
import LoginForm from './authentication/login_component';
import LoginRequiredContainer from './authentication/login_required_container';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers_index';
import thunk from 'redux-thunk'
import {  Router, Route, IndexRoute, Link, hashHistory  } from 'react-router';
import { enableBatching} from 'redux-batched-actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

window.store =  store

// console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='login' component={LoginForm}/>
      
        <Route component={LoginRequiredContainer}>
          <Route path='seats' component={Seats}/>
          <Route path='staff' component={Staff}/>
          <Route path='projects' component={Projects}/>
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


