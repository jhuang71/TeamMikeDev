import { Form, Modal, Col } from 'react-bootstrap';
import React, { useState } from "react";
import styled from 'styled-components'
import "./App.css";

export default function MyReservations(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reservation, setReservation] = useState("");
    const [validated, setValidated] = useState(false);
    const isAuthed = props.isAuthed;
    const userProfile = props.userProfile;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            try {
                const body = {
                    space_id: reservation,
                    student_id: userProfile.googleID
                };
                const response = await fetch("http://localhost:5000/endReservation", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
});
                console.log("Ending Reservation at:\n", response);
            } catch (error) {
                console.error(error.message);
            }
        }
        setValidated(true);
    };

    const Button = styled.button`
        background: transparent;
        border-radius: 3px;
        border: 2px solid red;
        color: red;
        float: left;
        text-align: center;
        `;

    return (
    <>
        <Button className="accountButton" variant="primary" onClick={handleShow}>My Reservations</Button>
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header>
                <h3 style={{ textAlign: 'center', margin: '15px' }}>Your Reservations</h3>    {/* Not centering? */}
            </Modal.Header>
            <Modal.Body>

            {/* Made a form in case we want to add more fields in the future */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="reservationNum">
                    <Form.Label>Select Reservation to End:</Form.Label>
                    <Form.Group value={reservation} onChange={(e) => setReservation(e.target.value)}>
                    <Form.Control required type="reservationNum" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid registration.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Group>
   
                <Button variant="primary" type="submit">End Reservation</Button>
            </Form>


            </Modal.Body>
            <Modal.Footer>
                <br></br>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}