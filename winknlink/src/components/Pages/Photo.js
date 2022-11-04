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
  {
    title: "Big Meeting",
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

const Photo = () => {

 

  
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = (e) => {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      console.log(d1 + d2 + d3 + d4);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        console.log("Clash");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  };


  const handleEvent = (e)=>{

    console.log(e);

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
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          onSelectEvent={handleEvent}
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
        <BottomDrawer />
      </div>
    </>
  );
};

export default Photo;
