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

import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';

export const LMNavbar: FunctionComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="faded" light expand="md" className="navbar">
        <NavbarBrand href="/">Localmart</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink href="/components/">Products</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>

          <Nav>
            <NavbarText>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Name Lastname
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <DropdownItem>
                  Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
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

