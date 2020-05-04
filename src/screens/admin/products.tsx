import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';

import { Auth } from '../../fb_app';
import { Api } from '../../api';
import { LM } from '../../localmart_schema';


import { Container, Button } from 'reactstrap';

import { LMNavbar as Navbar} from '../../components/navbar';
import { read } from 'fs';

interface ProductProps {
  user: LM.StoreUser;
}

interface ProductState{
  products: LM.Product[];
}

export const Products: FunctionComponent<RouteComponentProps<ProductProps>> = ({ navigate, user}) => {
  const [ready, setReady] = useState(false)
  const [products, setProducts] = useState<LM.Product[] | null>(null)
  useEffect( () => {
    
    setReady(true);
  }, [])
  console.log(products);
  return (
    <>
      <Container fluid>
        <Navbar user={user}/>
      <p>{products}</p>
      </Container>
    </>
  );
}


