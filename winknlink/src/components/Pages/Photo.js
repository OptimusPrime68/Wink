import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/landingPage.css";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import { Button } from "react-bootstrap";
import BottomDrawer from "./BottomDrawer";
import { useSelector } from "react-redux";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
];

const Photo = () => {


  const {user} = useSelector((state) => ({ ...state }))
  var email = user.email;


  useEffect(()=>{

    axios.post("http://localhost:4000/api/get-date",{email}).then((r)=>{

    setAllEvents(r.data.m);

    }).catch((c)=>{

    });


  },[])
 

  
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" ,from:email,to:""});
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = async (e) => {
   
    console.log(newEvent);
    setAllEvents([...allEvents, newEvent]);
    axios.post("http://localhost:4000/api/make-date",{newEvent});
  };


  const handleDeleteEvent = async (e)=>{

    console.log(e);


    axios.post("http://localhost:4000/api/remove-date",{e});
    

    setAllEvents(
      allEvents.filter(a => a !== e)
    );

  }




  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Header />
        <h1>Dates</h1>
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h6>Add New Event</h6>
          <div className="row" style={{ padding: "5px" }}>
            <div className="col mb-3">
              <Form.Control
                type="text"
                placeholder="Add Title"
                style={{ margin: "auto" }}
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div
              className="col mb-3"
              style={{
                alignContent: "center",
              }}
            >
              <DatePicker
                placeholderText="Start Date"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
             
              <input />
            </div>
            <div
              className="col mb-3"
              style={{
                alignContent: "center",
              }}
            >
              <DatePicker
                placeholderText="End Date"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
            </div>

            <Button
              variant="outline-success"
              stlye={{ marginTop: "10px" }}
              onClick={handleAddEvent}
            >
              Add Event
            </Button>
          </div>
        </div>
      
<input type="text" onChange={(e)=>setNewEvent({...newEvent,to:e.target.value})} />
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          onSelectEvent={handleDeleteEvent}
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
        <BottomDrawer />
      </div>
    </>
  );
};

export default Photo;
