import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import "../styles/MatchProfile.css";

function MatchProfile() {
  return (
    <div>
      <div className="py-5 h-100">
        <div className="justify-content-center align-items-center h-100 row">
          <div className="col" lg="9" xl="7">
            <Card variant="outlined">
              <CardContent>
                <div className="row mb-3">
                  <div className="col" style={{ textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      image="/person.svg"
                      alt="Person"
                      style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        margin: "auto",
                        marginBottom: "10px",
                      }}
                    />
                    Name
                  </div>
                </div>
                <div className="row mb-3">
                  <h3>About</h3>
                  <p>
                    Location
                    <br />
                    Age
                    <br />
                    Hobbies
                  </p>
                </div>
                <div className="row">
                  <div className="matchDiv col mb-3">
                    <Card id="matchProfileImageDiv">
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
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="matchDiv col mb-3">
                    <Card id="matchProfileImageDiv">
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
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchProfile;
