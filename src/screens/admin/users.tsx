import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/admin.css';

import { Auth } from '../../fb_app';
import { Api, EntityApi } from '../../api';
import { LM } from '../../localmart_schema';


import { LoadingCube } from '../../components/loading_small';

import { Container, Row, Col, Button, Table, Input } from 'reactstrap';

import { LMNavbar as Navbar} from '../../components/navbar';

interface UserProps {
  user: LM.StoreUser;
}

export const Users: FunctionComponent<RouteComponentProps<UserProps>> = ({ navigate, user }) => {
  const [ready, setReady] = useState(false)
  const [entities, setEntities] = useState<(LM.StoreUser & LM.idd)[] | null>(null)
  const [search, setSearch] = useState("")
  useEffect(() => {
    const unsubAuth = Auth.onAuthStateChanged(
      async () => {
        setEntities(await Api.User.readAll());
        setReady(true);
      }
    )
    return function cleanup() {
      unsubAuth()
    }
  }, [])

  const onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearch(newValue);
  }
  const entitiesFiltered = entities?.filter(
    ({name, lastname, email}) => {
      return name?.toLowerCase().indexOf(search.toLowerCase()) !== -1 || 
      lastname?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      email?.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }
  );

  return !ready ? (
    <LoadingCube />
  ) : (
      <>
        <Container fluid>
          <Navbar user={user} usersActive />
        </Container>

        <Container className="admin-controls">
          <Row>
            <Col md={2}>
              <Button onClick={() => navigate!('./new')}>
                Add
              </Button>
            </Col>

            <Col md={10}>
              <Input type="text" name="search" placeholder="search something" onChange={onChangeSearch}/>
            </Col>
          </Row>
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
              {entitiesFiltered?.map((entity: LM.StoreUser & LM.idd, index) => (
                <tr
                  key={entity.uid}
                  onClick={() =>
                    navigate!(`/${Api.User!._collectionPath}/${entity.uid}`)
                  }
                >
                  <th scope="row">{index + 1}</th>
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


