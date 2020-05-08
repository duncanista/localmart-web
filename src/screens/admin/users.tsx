import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Auth } from '../../fb_app';
import { Api } from '../../api';
import { LM } from '../../localmart_schema';


import { Container, Button, Table } from 'reactstrap';

import { LMNavbar as Navbar, LMNavbar } from '../../components/navbar';

interface UserProps {
  user: LM.StoreUser;
}

export const Users: FunctionComponent<RouteComponentProps<UserProps>> = ({ navigate, user }) => {
  const [entities, setEntities] = useState<LM.StoreUser[] | null>(null)
  
  useEffect(() => {
    const unsubAuth = Auth.onAuthStateChanged(
      async () => {
        setEntities(await Api.User.readAll());
      }
    )
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  return (
    <>
      <Container fluid>
        <Navbar user={user} userActive />
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>is ADMIN?</th>
            </tr>
          </thead>
          <tbody>
            { entities?.map((entity: LM.StoreUser, index) => (
              <tr>
              <th scope="row">{index+1}</th>
              <td>{`${entity.name} ${entity.lastname}`}</td>
              <td>{entity.email}</td>
              <td>{entity.admin ? (`Yes`) : `No`}</td>
            </tr>
            ))
            }
          </tbody>
        </Table>
      </Container>
    </>
  );
}


