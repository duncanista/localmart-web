import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/admin.css';

import { Auth } from '../../fb_app';
import { Api, EntityApi } from '../../api';
import { LM } from '../../localmart_schema';


import { LoadingCube } from '../../components/loading_small';

import { Container, Button, Table } from 'reactstrap';

import { LMNavbar as Navbar, LMNavbar } from '../../components/navbar';

interface UserProps {
  user: LM.StoreUser;
}

export const Users: FunctionComponent<RouteComponentProps<UserProps>> = ({ navigate, user }) => {
  const [ready, setReady] = useState(false)
  const [entities, setEntities] = useState<(LM.StoreUser & LM.idd)[] | null>(null)
  useEffect(() => {
    const unsubAuth = Auth.onAuthStateChanged(
      async () => {
        const users = await Api.User.readAll()
        setEntities(await Api.User.readAll());
        setReady(true);
      }
    )
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  return !ready ? (
    <LoadingCube/>
    ) : (
    <>
      <Container fluid>
        <Navbar user={user} usersActive />
      </Container>

      <Container className="admin-controls">
        <Button onClick={ () => navigate!('new')}>
          Add
        </Button>
      </Container>

      <Container>
        <Table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>is ADMIN?</th>
            </tr>
          </thead>
          <tbody>
            { entities?.map((entity: LM.StoreUser & LM.idd, index) => (
              <tr
                key={entity.uid}
                onClick={() =>
                  navigate!(`/${Api.User!._collectionPath}/${entity.uid}`)
                }
              >
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


