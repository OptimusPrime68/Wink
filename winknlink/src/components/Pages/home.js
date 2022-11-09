import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Modal } from "react-bootstrap";
import "../styles/landingPage.css";
import { AccountBox } from "../accountBox/accountBox";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["home"]);

  const handleClose = () => setShow(false);

  let { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  if (user) {
    console.log("HOME", user);
    navigate("/wink");
  }

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
              <Nav>
                {!user && (
                  <Nav.Link href="#" className="LogCen">
                    <button
                      className="LoginBut"
                      onClick={() => handleShow("sm-down")}
                    >
                      <b>{t("Login")}</b>
                    </button>
                  </Nav.Link>
                )}
              </Nav>
            </Container>
          </Navbar>
          <div className="textHome">
            <h1>{t("Go on your first date")}</h1>
            <p>{t("Connect with people you haven't met yet")}</p>
          </div>
        </div>
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
