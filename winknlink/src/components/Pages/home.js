import React, { useState } from "react";
import { Container, Nav, Navbar, Modal } from "react-bootstrap";
import "../styles/landingPage.css";
import { AccountBox } from "../accountBox/accountBox";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <div className="fluid">
        <div id="home">
          <Navbar
            collapseOnSelect
            className="color-nav"
            expand="lg"
            id="sticky-nav"
            fluid
          >
            <Container fluid>
              <Navbar.Brand href="#home">
                <img src="/logo.png" alt="logo" height={64} width={64} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto navbar">
                  <Nav.Link href="#home">
                    <span className="navLink">Home</span>
                  </Nav.Link>
                  <Nav.Link href="#about">
                    <span className="navLink">About</span>
                  </Nav.Link>
                  <Nav.Link href="#features">
                    <span className="navLink">Features</span>
                  </Nav.Link>
                  <Nav.Link href="#contact">
                    <span className="navLink">Contact</span>
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#" className="LogCen">
                    <button
                      className="LoginBut"
                      onClick={() => handleShow("sm-down")}
                    >
                      <b>Login</b>
                    </button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="textHome">
            <h1>Go on your first date.</h1>
            <p>Connect with people you haven't met yet.</p>
          </div>
        </div>
        <div id="about">About</div>
        <div id="features">Features</div>
        <div id="contact">Contact</div>
      </div>
      <Modal
        className="LoginModal"
        show={show}
        onHide={handleClose}
        centered
        fullscreen={fullscreen}
      >
        <AppContainer>
          <AccountBox />
        </AppContainer>
      </Modal>
    </>
  );
}
