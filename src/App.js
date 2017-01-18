import React, { Component } from 'react';
import logo from './logo.svg';
import {Container,Col,Row} from 'reactstrap';
import SeatMap  from './components/seat_map';
import UnallocatedTable  from './components/unallocated_table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Row>
            <Col md="8">
              <SeatMap/>
            </Col>
            <Col md="4">
              <UnallocatedTable/ >
            </Col>
          </Row>
          </Row>
      </div>
    );
  }
}

export default App;
