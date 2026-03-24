import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Link } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import './MyNavbar.css';

function MyNavbar({ theme, toggleTheme }) {
  return (
    <Navbar bg={theme} data-bs-theme={theme} expand="lg" className="custom-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <i className="bi bi-flower1 me-2"></i>
          Orchid Paradise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              <i className="bi bi-house-door me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/#collection" className="nav-link-custom">
              <i className="bi bi-grid me-1"></i> Collection
            </Nav.Link>
            <NavDropdown title={<span><i className="bi bi-tags me-1"></i> Categories</span>} id="basic-nav-dropdown" className="nav-link-custom">
              <NavDropdown.Item as={Link} to="/specials">
                <i className="bi bi-star-fill me-2"></i> Special Edition
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/naturals">
                <i className="bi bi-leaf me-2"></i> Natural Orchids
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={HashLink} smooth to="/#collection">
                <i className="bi bi-collection me-2"></i> All Orchids
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              <i className="bi bi-info-circle me-1"></i> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              <i className="bi bi-envelope me-1"></i> Contact
            </Nav.Link>
            <Button 
              onClick={toggleTheme}
              variant="outline-light"
              className="theme-toggle ms-3"
              size="sm"
            >
              <i className={theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill'}></i>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;