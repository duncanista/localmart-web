import React, { FunctionComponent, useEffect, useState } from 'react'
import { Router } from '@reach/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import { Api } from '../api';
import { LM } from '../localmart_schema';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';

interface NavbarProps {
  user?: LM.StoreUser;
  userActive?: boolean;
}

export const LMNavbar: FunctionComponent<NavbarProps> = ({ user, userActive = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="faded" light expand="md" className="navbar">
        <NavbarBrand href="/">LocalMart</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { user?.admin && (
               <NavItem>
               <NavLink href="users" active={userActive} >Users</NavLink>
             </NavItem>
              )
            }
           

            <NavItem>
              <NavLink href="products">Products</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="products">Companies</NavLink>
            </NavItem>

          </Nav>

          <Nav>
            <NavbarText>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user?.name + " " + user?.lastname}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <DropdownItem>
                  Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => Api.Auth.signOut()}>
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

