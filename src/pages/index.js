import React from 'react';
import { Row, Col } from 'reactstrap';

const Home = () => {
  return (
    <div
      style={{
        paddingTop: '200px',
        color: 'white',
        background: '#252525',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        textAlign: 'center',
      }}
    >
    <Row>
      <Col xs="12">
        <h1>Welcome to Blaze's Application</h1>
      </Col>
    </Row>
    <Row>
      <Col xs="12">
      <h4>Candidate : Mauricio Antonio Angulo Martinez</h4>
      </Col>
    </Row>
    <Row>
      <Col xs="12">
      <h6>Phone: (051) 935105408<br/>eMail: mauricioangulo4@gmail.com</h6>
      </Col>
    </Row>
    </div>
  );
};

export default Home;
