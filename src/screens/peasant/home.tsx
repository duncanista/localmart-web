import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Auth } from '../../fb_app';
import { Api } from '../../api';
import { LM } from '../../localmart_schema';


import { Container, Button } from 'reactstrap';

import { LMNavbar as Navbar} from '../../components/navbar';

interface HomeProps {
  user: LM.StoreUser;
}

export const Home: FunctionComponent<RouteComponentProps<HomeProps>> = ({ navigate, user}) => {
  console.log(user);
  return (
    <>
      <Container fluid>
        <Navbar user={user}/>
      </Container>
    </>
  );
}


