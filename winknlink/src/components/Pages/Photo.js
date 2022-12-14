import React, { useEffect, useState ,useRef,useCallback} from "react";
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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




const Photo = () => {
  const { user } = useSelector((state) => ({ ...state }));
  var email = user.email;

  const [person, setPerson] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/get-date", { email})
      .then((r) => {
        console.log(r.data);
        setAllEvents(r.data.m);
      })
      .catch((c) => {});

    axios
      .post("http://localhost:4000/api/all-match-details", { email,token:user.token })
      .then(function (response) {
        console.log(response.data);
        setPerson(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    from: email,
    to: "",
  });
  

  const handleAddEvent = async (e) => {

    if(newEvent.title == '')
    {
      toast.warn("Insert Title");
      return;
    }
    if(newEvent.to == '')
    {
      toast.warn("Select User");
      return;
    }
    
    if(newEvent.start == '')
    {
      toast.warn("Select Start Date");
      return;
    }
    
    if(newEvent.end == '')
    {
      toast.warn("Select End Date");
      return;
    }
    
    console.log(newEvent);
    setAllEvents([...allEvents, newEvent]);
    axios.post("http://localhost:4000/api/make-date", { newEvent,token:user.token });


  };

  

  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
   
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(calEvent.title + " at " + new Date(calEvent.start).getDate()  + "/"+ (Number(new Date(calEvent.start).getMonth())+Number(1)) +"/"+ new Date(calEvent.start).getFullYear())
    }, 250)
  }, [])

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
     
    }, 250)

    axios.post("http://localhost:4000/api/remove-date", { calEvent,token:user.token });
    setAllEvents(allEvents.filter((a) => a !== calEvent));


  }, [])



  console.log(person);
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
            <div
              className="col mb-3"
              style={{
                alignContent: "center",
              }}
            >
              <Form.Select
                aria-label="Default select example"
                onChange={(to) =>
                  setNewEvent({ ...newEvent, to: to.target.value })
                }
              >
                <option>Select Person</option>
                {person &&
                  person.map((a) => {
                    return <option value={a.email}>{a.name}</option>;
                  })}
              </Form.Select>
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

        <input
          type="text"
          onChange={(e) => setNewEvent({ ...newEvent, to: e.target.value })}
        />
        <Calendar
          localizer={localizer}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "#fbab7e",
                color: 'white',
                borderRadius: "2px",
                border: "none"
              };
        
              if (event.isMine){
                newStyle.backgroundColor = "lightgreen"
              }
        
              return {
                className: "",
                style: newStyle
              };
            }
          }
          events={allEvents}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClickEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </>
  );
};

export default Photo;
