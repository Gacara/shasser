import React, { useState, FormData } from 'react';
import {
  Button, Nav, NavDropdown, Navbar, FormControl,
} from 'react-bootstrap';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Form from '../Form';

function Navigation() {
  const value = useState('');
  const handleSubmit = (ev) => {
    ev.preventDefault();
    value[0] = new FormData(ev.currentTarget).get('filter');
  };

  return (

    <div className="nav-margin-bottom">
      <AuthUserContext.Consumer>
        {(authUser) => (
          authUser ? <NavigationAuth handleSubmit={handleSubmit} />
            : <NavigationNonAuth handleSubmit={handleSubmit} />
        )}
      </AuthUserContext.Consumer>
    </div>
  );
}

const NavigationAuth = (props) => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href={ROUTES.LANDING}>Shasser.fr</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Mon compte" id="basic-nav-dropdown">
          <NavDropdown.Item href={ROUTES.ACCOUNT}>Profil</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ROUTES.LANDING}><SignOutButton /></NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href={ROUTES.HOME}>Tableau de chasse</Nav.Link>
      </Nav>
      <Form handleSubmit={props.handleSubmit} inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

const NavigationNonAuth = (props) => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href={ROUTES.LANDING}>Shasser.fr</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href={ROUTES.SIGN_IN}>Se connecter</Nav.Link>
      </Nav>
      <Form handleSubmit={props.handleSubmit} inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
