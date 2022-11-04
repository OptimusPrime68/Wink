import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import "../styles/MatchProfile.css";
import axios from "axios";
import {useState} from 'react'

function MatchProfile({id}) {


  console.log(id);

  const [data,setData] = useState();

  useEffect(()=>{

    axios
    .post("http://localhost:4000/api/get-user-profile", {
      email:id,
    }).then((response)=>{
      console.log(response);
      setData(response.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])


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
                    {data ? data.name:""}
                  </div>
                </div>
                <div className="row mb-3">
                  <h3>About</h3>
                  <p>
                    {data ? data.address:""}
                    <br />
                    {data ? data.age:""}
                    <br />
                    {data ? data.hobbies:""}
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
