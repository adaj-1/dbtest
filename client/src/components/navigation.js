import * as React from 'react'

import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  const testUser = localStorage.getItem('User');
  const priv = localStorage.getItem('Priv');
  var admin = false;

  if (priv === 'admin') {
    admin = true;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/" className="pe-3"><b>The Bookish Calgarian</b></Navbar.Brand>
      <Nav className="justify-content-end">
        <Nav.Link href="/books">Search Books</Nav.Link>
        <Nav.Link href="/wishlist">My Wishlist</Nav.Link>
        <Nav.Link href="/profile">My Profile</Nav.Link>
        <Nav.Link href='/store'>My Store</Nav.Link>
        {admin && (
        <Nav.Link href="/customers">Search Customers </Nav.Link>
        )}
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation