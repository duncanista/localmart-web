import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import {
  Container,
  Row,
  Col,
  Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
  Form, FormGroup, FormText, Label, Input, InputGroup
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/landing.css';
import HumanT from '../assets/humans/humaaan-4.svg';
import HumanM1 from '../assets/humans/humaaan-3.svg';
import HumanM2 from '../assets/humans/humaaan-2.svg';
import HumanC1 from '../assets/humans/humaaan-card-1.svg';
import HumanC2 from '../assets/humans/humaaan-card-2.svg';
import HumanC3 from '../assets/humans/humaaan-card-3.svg';
import HumanC4 from '../assets/humans/humaaan-card-4.svg';
import HumanC5 from '../assets/humans/humaaan-card-5.svg';
import Jordan from '../assets/humans/humaaan-jordan.svg';


import { LNavbar } from '../components/navbar_landing';

export const Landing: FunctionComponent<RouteComponentProps> = (props) => {
  return (
    <>
      <Container fluid>
          <LNavbar />

        <div className="landing-container">
          <Row className="landing-start">
            <Col md={{ size: 7, offset: 1 }} className="landing-info">
              <h1 className="landing-h1">
                Buy and sell <br />
              within your community
            </h1>
              <h6>
                LocalMart aims for those who want to sell quick and easy within their surroundings.
            </h6>
              <Button className="landing-button">Join now</Button>
            </Col>

            <Col md={4} className="landing-human">
              <img src={HumanT} alt="Human" />
            </Col>
          </Row>
        </div>

        <Row className="landing-communities-info" name="communities">
          {/*}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="landing-communities-svg">
            <path fill="#C1DEE2" fill-opacity="0.5" d="M0,192L1440,32L1440,320L0,320Z"></path>
          </svg>
          {*/}

          <Col md={4}>
            <Row>
              <Col md={6} >
                <img src={HumanM2} alt="HumanM1" />
              </Col>
              <Col md={6} className="landing-communities-info-item">
                <h2>18</h2>
                <h5>Communities</h5>
                <p>Fast growing groups of people appear everyday.</p>
              </Col>
            </Row>
          </Col>

          <Col md={1} />

          <Col md={4}>
            <Row>
              <Col md={6}>
                <img src={HumanM1} alt="HumanM1" />
              </Col>
              <Col md={6} className="landing-communities-info-item">
                <h2>2,495</h2>
                <h5>Users</h5>
                <p>LocalMart is being used all around the world.</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="landing-communities">
          <Col className="landing-communities-join">
            <h1>Take part with your community <br /> on LocalMart</h1>
            <Button className="landing-button">Contact Us</Button>
          </Col>
        </Row>

        <div className="landing-container">
          <Row name="about">
            <Col md={{ size: 10, offset: 1 }}>
              <Row>
                { /* Left */}
                <Col md={4}>
                  <Card className="landing-card">
                    <CardImg top width="100%" src={HumanC1} alt="Card image cap" className="landing-card-img" style={{ backgroundColor: 'rgb(97, 183, 240)' }} />
                    <CardBody className="landing-card-body">
                      <CardTitle className="landing-card-title">Together we can achieve more</CardTitle>
                      <CardText>Being part of a community lets you find whatever you need within a small range.</CardText>
                    </CardBody>
                  </Card>

                  <Card className="landing-card">
                    <CardImg top width="100%" src={HumanC4} alt="Card image cap" className="landing-card-img" style={{ backgroundColor: '#FF9B21' }} />
                    <CardBody className="landing-card-body">
                      <CardTitle className="landing-card-title">More personal transactions</CardTitle>
                      <CardText>We guarantee every purchase will be different.</CardText>
                    </CardBody>
                  </Card>
                </Col>



                { /* Mid */}
                <Col md={4}>
                  <Card className="landing-card">
                    <CardImg top width="100%" src={HumanC2} alt="Card image cap" className="landing-card-img" style={{ backgroundColor: '#FF4133' }} />
                    <CardBody className="landing-card-body">
                      <CardTitle className="landing-card-title">Find anything you need</CardTitle>
                      <CardText>If someone is selling it, you sure will find it.</CardText>
                    </CardBody>
                  </Card>

                  <Card className="landing-card">
                    <CardImg top width="100%" src={HumanC5} alt="Card image cap" className="landing-card-img" style={{ backgroundColor: '#8991DC' }} />
                    <CardBody className="landing-card-body">
                      <CardTitle className="landing-card-title">Always ready</CardTitle>
                      <CardText>Our team is continously innovatnig for you and your community.</CardText>
                    </CardBody>
                  </Card>
                </Col>

                { /* Right */}
                <Col md={4}>
                  <Card className="landing-card">
                    <CardImg top width="100%" src={HumanC3} alt="Card image cap" className="landing-card-img" style={{ backgroundColor: '#2F3676' }} />
                    <CardBody className="landing-card-body">
                      <CardTitle className="landing-card-title">Anywhere, anytime</CardTitle>

                      <CardText>No matter the platform, we will be there, you call it.</CardText>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <Row >
          <div className="landing-container" >
            <Col md={{ size: 10, offset: 1 }} className="landing-contact" name="contact">
              <h1>Get in touch</h1>
              <div className="landing-form">
                <Row>
                  <Col md={5}>
                    <Form>
                      <FormGroup>
                        <Col className="landing-form-input">
                          <Label for="exampleEmail">Here goes your name</Label>
                          <InputGroup size="lg">
                            <Input type="email" name="email" id="email" placeholder="John Doe" />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup>
                        <Col className="landing-form-input">
                          <Label for="exampleEmail">What's your community called?</Label>
                          <InputGroup size="lg">
                            <Input type="text" name="community" id="community" placeholder="Tec de Monterrey" />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup>
                        <Col className="landing-form-input">
                          <Label for="exampleEmail">Tell me more about your community</Label>
                          <InputGroup size="lg">
                            <Input type="textarea" name="communityInfo" id="communityInfo" placeholder="Welp, tbh..." />
                          </InputGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" />{' '}
                    I agree the terms and conditions, do I?
                  </Label>
                      </FormGroup>
                      <Button className="landing-button">Submit</Button>
                    </Form>

                  </Col>

                  <Col md={{ size: 6, offset: 1 }}>
                    <img src={Jordan} alt="Dev" />
                  </Col>
                </Row>
              </div>
            </Col>
          </div>
        </Row>

        <Row>
          <div className="landing-container">
            <Row className="landing-footer">
              <Col md={8}>
                nocorp™ 2020
            </Col>

            <Col md={4} className="landing-footer-right">
                Terms & Conditions
            </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

