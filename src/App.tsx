import React, { FunctionComponent, useEffect, useState } from 'react'
import { Router, Redirect } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Auth } from './fb_app';
import { Api } from './api';
import { LM } from './localmart_schema';

import { LoadingCube } from './components/loading';
import { Landing } from './screens/landing';
import { Login } from './screens/login';
import { Home as PeasantHome } from './screens/peasant/home';
import { Home as AdminHome } from './screens/admin/home';
import { Products as AdminProducts } from './screens/admin/products';
import { Users } from './screens/admin/users';

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
              <AdminHome path="/" user={user} />
              <AdminProducts path="/products" user={user} />
              <Users path="users" user={user}/>
              <Redirect from="login" to="/"/>
              
            </>
          ) : (
            <>
              <PeasantHome path="/" user={user} />
              <Redirect from="login" to="/" />
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
