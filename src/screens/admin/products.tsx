import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/admin.css';

import { Auth } from '../../fb_app';
import { Api } from '../../api';
import { LM } from '../../localmart_schema';


import { Container, Button, Table } from 'reactstrap';

import { LMNavbar as Navbar } from '../../components/navbar';

interface UserProps {
  user: LM.StoreUser;
}

export const Products: FunctionComponent<RouteComponentProps<UserProps>> = ({ navigate, user }) => {
  const [entities, setEntities] = useState<LM.Product[] | null>(null)
  
  useEffect(() => {
    const unsubAuth = Auth.onAuthStateChanged(
      async () => {
        setEntities(await Api.Product.readAll());
      }
    )
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  return (
    <>
      <Container fluid>
        <Navbar user={user} productsActive />
      </Container>

      <Container className="admin-controls">
        <Button>Add</Button>
      </Container>

      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>COMPANY</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            { entities?.map((entity: LM.Product, index) => (
              <tr>
              <th scope="row">{index+1}</th>
              <td>{entity.name}</td>
              <td>{entity.company}</td>
              <td>{entity.description}</td>
            </tr>
            ))
            }
          </tbody>
        </Table>
      </Container>
    </>
  );
}


