import React, { useState } from "react";
import { Form, Image, Button, Row, Col, Alert , DatePicker} from "react-bootstrap";
import space1 from "./img/space1.jpg";
import { useParams } from "react-router-dom";

export default function ReserveForm(props) {
  //alert var for invalid times
  const [showInvalid, setShowInvalid] = useState(false);
  const [showConflicting, setShowConflicting] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  // extract params from url
  const id = useParams();

  // boolean
  const isAuthed = props.isAuthed;

  // {name: String, email: String, image: String, id: String}
  const userProfile = props.userProfile;

  //validity var that checks if input is valid
  const [validated, setValidated] = useState(false);

  //res_id global variable to be passed to confirmation page
  var res_ID = "";

  //these are place holders - need to pass these vars into here
  const email = userProfile.email;
  const student_ID = userProfile.googleID;
  const space_ID = id.spaceID;

  //vars that will be extracted from the form
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  //reservation limits in minutes
  var minLimit = 15;
  var maxLimit = 120;

  var today = new Date();
  var todaysDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var currentTime = today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  function displayTime(date) {
    var hours = date.getHours();
    const minutes = date.getMinutes();
    const pm = hours > 11 ? true : false;

    if (hours > 12) {
        hours -= 12;
    }
    else if (hours === 0) {
        hours = 12;
    }
    
    return '' + hours + ':' + (minutes > 9 ? minutes : '0' + minutes) + ' ' + (pm ? 'PM' : 'AM');
  }

  //handling submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const getTime = time => new Date(2020, 12, 2, time.substring(0, 2), time.substring(3, 5), 0, 0);

    //validity forces user to enter proper input
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //doesn't allow reservation if time range longer than 2 hours or shorter than 15 mins
    else if (getTime(timeTo) - getTime(timeFrom) > 60000 * maxLimit || getTime(timeTo) - getTime(timeFrom) < 60000 * minLimit) {
      event.preventDefault();
      event.stopPropagation();
      setShowInvalid(true)
    }
    else {
      //this is what sends the vars from the form to index.js, which sends them to the db
      try {
        //creating timestamp
        const start = date + " " + timeFrom;
        const end = date + " " + timeTo;

        //combining vars to body
        const body = {
          student_id: student_ID,
          space_id: space_ID,
          res_start: start,
          res_end: end,
        };

        //sending body to index.js
        const response = await fetch("http://localhost:5000/reservation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        console.log(response.status);

        if (response.status === 201) {
          const jsonData = await response.json()
          console.log("Response from inputting:\n", jsonData);
          //console.log(jsonData);
          //console.log(jsonData.data.reservation.res_id);

          res_ID = jsonData.data.reservation.res_id;

          //redirect to confirmation page with res_ID
          const confURL = "/" + id.building + "/" + res_ID + "/Confirmation";
          window.location = confURL;
        }
        else if (response.status === 409) {
          const jsonData = await response.json();
          setConflicts(jsonData.conflicts);

          event.preventDefault();
          event.stopPropagation();
          setShowConflicting(true);
        }

      } catch (err) {
        console.log(err);
      }
    }
    setValidated(true);

    console.log("hey");
  };

  return (
    <div>
      {isAuthed ? (
        <div>
          {console.log(props.userProfile)}
          <Image
            style={{ textAlign: "center", opacity: "0.9" }}
            src={space1}
            fluid
          />
          <h2 style={{ textAlign: "center", marginTop: "1em" }}>
            Reservation Form
          </h2>
          <Form
            style={{
              marginLeft: "25rem",
              marginRight: "25rem",
              marginBottom: "2rem",
              textAlign: "left",
            }}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Row controlId="IDs">
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control readOnly placeholder={email} />
                <Form.Control.Feedback type="invalid">
                  Not a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="spaceID">
                <Form.Label>Space ID</Form.Label>
                <Form.Control readOnly placeholder={space_ID} />
                <Form.Control.Feedback type="invalid">
                  Not a valid space ID.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row controlId="timeStamp">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Group
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                >
                  <Form.Control required type="date" min={todaysDate}/>
                  <Form.Control.Feedback type="invalid">
                    Current date is the earliest date allowed.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group as={Col} controlId="timeFrom">
                <Form.Label>Time from</Form.Label>
                <Form.Group
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                >
                  <Form.Control required type="time" min={todaysDate==date ? currentTime : "00:00"}/>
                  <Form.Control.Feedback type="invalid">
                    Time must be after current time.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group as={Col} controlId="timeTo">
                <Form.Label>Time to</Form.Label>
                <Form.Group
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                >
                  <Form.Control required type="time" min={timeFrom}/>
                  <Form.Control.Feedback type="invalid">
                    Time must be after time from.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Form.Row>

            <Alert show={showInvalid} variant="danger" onClose={() => setShowInvalid(false)} dismissible>
              <Alert.Heading>Invalid Entry</Alert.Heading>
              <p>
                Please enter a valid time slot between 12:00AM and 11:59PM. Slot cannot be shorter than {minLimit} minutes or longer than {maxLimit} minutes.
              </p>
            </Alert>

            <Alert show={showConflicting} variant="danger" onClose={() => setShowConflicting(false)} dismissible>
              <Alert.Heading>Conflicting Reservation</Alert.Heading>
              <p>
                The time entered conflicts with the following existing reservations. Please enter a new reservation.
              </p>
              {conflicts.map((conflict) => <p>{displayTime(new Date(conflict.res_start))} - {displayTime(new Date(conflict.res_end))}</p>)}
            </Alert>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      ) : (
        <div>

          <Image
            style={{ textAlign: "center", opacity: "0.9" }}
            src={space1}
            fluid
          />
          <h2 style={{ textAlign: "center", marginTop: "1em" }}>
            Reservation Form
          </h2>

          <Alert style={{ marginTop: '2em' }} variant="warning">
            <Alert.Heading>
              You must log in first to reserve a study space
            </Alert.Heading>
            <p>To log in, please click "Sign in with Google" on the top</p>
          </Alert>
        </div>
      )}
    </div>
  );
}
