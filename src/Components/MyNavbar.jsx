import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import './MyNavbar.css';

function MyNavbar({ theme, toggleTheme }) {
  return (
    <Navbar bg={theme} data-bs-theme={theme} expand="lg" className="custom-navbar" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="brand-text">
          <i className="bi bi-flower1 me-2"></i>
          Orchid Paradise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link-custom">
              <i className="bi bi-house-door me-1"></i> Home
            </Nav.Link>
            <Nav.Link href="#collection" className="nav-link-custom">
              <i className="bi bi-grid me-1"></i> Collection
            </Nav.Link>
            <NavDropdown title={<span><i className="bi bi-tags me-1"></i> Categories</span>} id="basic-nav-dropdown" className="nav-link-custom">
              <NavDropdown.Item href="#cattleya">Cattleya</NavDropdown.Item>
              <NavDropdown.Item href="#dendrobium">Dendrobium</NavDropdown.Item>
              <NavDropdown.Item href="#phalaenopsis">Phalaenopsis</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#all">All Orchids</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#about" className="nav-link-custom">
              <i className="bi bi-info-circle me-1"></i> About
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