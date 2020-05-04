import React, { FunctionComponent, useEffect, useState } from 'react'
import { Router } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Container } from 'reactstrap';
import { LMNavbar as Navbar} from './components/navbar';
import { Landing } from './screens/landing';


const App: FunctionComponent = (props) => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  return (
    <>
      <Landing/>
    </>
  );
}

export default App;
