import React, { useState } from 'react';
import { Form, Image, Button, Row, Col } from 'react-bootstrap';
import space1 from './img/space1.jpg';

export default function ReserveForm() {
    //validity var that checks if input is valid
    const [validated, setValidated] = useState(false);

    //these are place holders - need to pass these vars into here
    const email = "example@email.com";
    const student_ID = 1;
    const space_ID = 1;

    //vars that will be extracted from the form
    const [date, setDate] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");

    //handling submit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        //validity forces user to enter proper input
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
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
                    res_end: end
                };

                //sending body to index.js
                const response = await fetch("http://localhost:5000/reservation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("Reservation input:\n", response);
            } catch (err) {
                console.log(err);
            }
        }
        setValidated(true);
    };

    return (
        <div >
            <Image style={{ textAlign: 'center', opacity: '0.9' }} src={space1} fluid />
            <h2 style={{ textAlign: 'center' }}>Reservation Form</h2>
            <Form
                style={{ marginLeft: '25rem', marginRight: '25rem', marginBottom: '2rem', textAlign: 'left' }}
                noValidate validated={validated}
                onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control readOnly placeholder={email} />
                    <Form.Control.Feedback type="invalid">
                        Not a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Row controlId="IDs">
                    <Form.Group as={Col} controlId="studentID">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control readOnly placeholder={student_ID} />
                        <Form.Control.Feedback type="invalid">
                            Not a valid student ID.
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
                            onChange={e => setDate(e.target.value)}>
                            <Form.Control required type="date" />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} controlId="timeFrom">
                        <Form.Label>Time from</Form.Label>
                        <Form.Group
                            value={timeFrom}
                            onChange={e => setTimeFrom(e.target.value)}>
                            <Form.Control required type="time" />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} controlId="timeTo">
                        <Form.Label>Time to</Form.Label>
                        <Form.Group
                            value={timeTo}
                            onChange={e => setTimeTo(e.target.value)}>
                            <Form.Control required type="time" />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Group>
                </Form.Row>
                <Button href = "/Confirmation" variant="primary" type="submit">
                    Submit
                    </Button>
            </Form>
        </div>
    );
}
