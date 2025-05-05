// NavbarComponent.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavbarComponent = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>Todo App</Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavbarComponent;
