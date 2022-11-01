import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Modal } from "react-bootstrap";
import "../styles/landingPage.css";
import { AccountBox } from "../accountBox/accountBox";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next";
import Language from "../Language";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const {t} = useTranslation(["home"]);


  const handleClose = () => setShow(false);
  
  let {user} = useSelector((state)=>({...state}));
  const navigate = useNavigate();

  if(user) navigate("/wink");

  let dispatch = useDispatch();



  console.log(user);
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
                    <span className="navLink">{t("Home")}</span>
                  </Nav.Link>
                  <Nav.Link href="#about">
                    <span className="navLink">{t("About")}</span>
                  </Nav.Link>
                  <Nav.Link href="#features">
                    <span className="navLink">{t("Features")}</span>
                  </Nav.Link>
                  <Nav.Link href="#contact">
                    <span className="navLink">{t("Contact")}</span>
                  </Nav.Link>
                  <Nav.Link href="#">
                    <span className="navLink">
                      <Language />
                    </span>
                  </Nav.Link>
                </Nav>
                <Nav>
              { !user  &&  <Nav.Link href="#" className="LogCen">
                    <button
                      className="LoginBut"
                      onClick={() => handleShow("sm-down")}
                    >
                      <b>{t("Login")}</b>
                    </button>
                  </Nav.Link>
                  }


                
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="textHome">
            <h1>{t("Go on your first date")}</h1>
            <p>{t("Connect with people you haven't met yet")}</p>
          </div>
        </div>
        <div id="about">{t("About")}</div>
        <div id="features">{t("Features")}</div>
        <div id="contact">{t("Contact")}</div>
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
