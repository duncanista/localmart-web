import React, { FunctionComponent, useEffect, useState } from 'react'
import { Router } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Auth } from './fb_app';
import { Api } from './api';
import { LM } from './localmart_schema';


import { Container, Button } from 'reactstrap';



import { LMNavbar as Navbar } from './components/navbar';
import { LoadingCube } from './components/loading';
import { Landing } from './screens/landing';
import { Login } from './screens/login';
import { Home } from './screens/peasant/home';

const App: FunctionComponent = (props) => {
  const [user, setUser] = useState<LM.StoreUser | null>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const unsubAuth = Auth.onAuthStateChanged(
      async (authUser: firebase.User | null, error?: firebase.auth.Error) => {
        let storeUser: LM.StoreUser | null = null

        if (authUser) {
          const { uid } = authUser
          storeUser = { uid, ...(await Api.User.read(uid)) }
        }

        setUser(storeUser)
        setReady(true)
      }
    )
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  return !ready ? (
    <LoadingCube/>
  ) :  (
    <>
      <Router>
        { user ? (
          user.admin ? (
            <>
              <Home path="/" />
            </>
          ) : (
            <>
              <Home path="/" />
            </>
          )
        ) : (
          <>
          <Landing path="/" />
          <Login path='login' />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
