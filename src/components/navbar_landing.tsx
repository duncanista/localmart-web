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
import { Link, animateScroll as Scroll } from 'react-scroll';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/navbar.css';

export const LNavbar: FunctionComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="faded" light expand="md" className="navbar" fixed="top">
        <NavbarBrand href="/" >

          LocalMart
          
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar />

          <Nav className="justify-content-end" navbar>
          <NavbarText>
            <NavLink href="#communities" className="navbar-text">
              <Link 
                to="communities" 
                smooth={true}
                offset={-100}>
                Communities
              </Link>
            </NavLink>
          </NavbarText>

          <NavbarText>
            <NavLink href="#about" className="navbar-text">
              <Link 
                to="about" 
                smooth={true}
                offset={-100}>
                About
              </Link>
            </NavLink>
          </NavbarText>

          <NavbarText>
            <NavLink href="#contact" className="navbar-text">
              <Link 
                to="contact" 
                smooth={true}
                offset={-100}>
                Contact
              </Link>
            </NavLink>
          </NavbarText>

          <NavbarText>
            <NavLink href="/login" className="navbar-text" active>
                Log in
            </NavLink>
          </NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
  );
}

