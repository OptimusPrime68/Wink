import React from "react";
import BottomDrawer from "./BottomDrawer";
import Header from "./Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";

function Like() {
  return (
    <div>
      <Header />
      <div>
        <Tabs
          defaultActiveKey="Likes"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
          variant="pills"
        >
          <Tab eventKey="Likes" title="Likes">
            <div className="matchDiv col mb-3">
              <Card style={{ width: "200px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  image="/person.svg"
                  alt="Profile Image"
                  className="profileDivImage"
                  style={{
                    height: "200px",
                    width: "200px",
                    margin: "auto",
                  }}
                />
                <p>Name</p>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="SuperLike" title="Super Like">
            <div className="matchDiv col mb-3">
              <Card style={{ width: "200px", textAlign: "center" }}>
                <CardMedia
                  component="img"
                  image="/person.svg"
                  alt="Profile Image"
                  className="profileDivImage"
                  style={{
                    height: "200px",
                    width: "200px",
                    margin: "auto",
                  }}
                />
                <p>Name</p>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
      <BottomDrawer />
    </div>
  );
}

export default Like;
