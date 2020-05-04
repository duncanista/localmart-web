import React, { Component } from "react"
import { Container, Row, } from 'reactstrap'

import Lottie from 'react-lottie';
import * as animationData from '../assets/animations/cube.json'
const flexCenter = 'd-flex flex-fill align-items-center justify-content-center'
export class LoadingCube extends Component {
  render = () => (<Container fluid className={flexCenter}>
    <Row className={flexCenter} style={{ height: '100vh' }}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: (animationData as any).default
        }}
        height={300}
        width={300}
      />
    </Row>
  </Container>)
}