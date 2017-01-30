import React, { Component } from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import SeatMap  from './seats_map';
import UnallocatedTable  from './seats_unallocated_table';

class Seats extends Component {
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

export default Seats;


