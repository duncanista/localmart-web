import React, { FunctionComponent, useEffect, useState } from 'react'
import { Router } from '@reach/router';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Login: FunctionComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      
    </div>
  );
}

export default Login;
