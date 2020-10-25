import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Form, Image, Button, Row, Col } from 'react-bootstrap';
import space1 from './img/space1.jpg';

export default function ReserveForm() {
    const id = useParams();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div>
            <Image style={{opacity:"0.9"}}src={space1} fluid />
            <h2 class="text-left">Reservation Form</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>Email address</Form.Label>
                    <Col sm={3}>
                        <Form.Control required type="email" placeholder="name@example.com" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Col>

                </Form.Group>
                <Form.Group as={Row} controlId="date">
                    <Form.Label column sm={2}>Date</Form.Label>
                    <Col sm={2}>
                        <Form.Control required type="date" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid date.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="timeFrom">
                    <Form.Label column sm={2}>Time from</Form.Label>
                    <Col sm={2}>
                        <Form.Control required type="time" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid time.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="timeTo">
                    <Form.Label column sm={2}>Time to</Form.Label>
                    <Col sm={2}>
                        <Form.Control required type="time" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="expectedNum">
                    <Form.Label column sm={2}>Expected number of people</Form.Label>
                    <Col sm={2}>
                        <Form.Control required type="number" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>For</Form.Label>
                    <Col sm={3}>
                        <Form.Control as="textarea" />
                    </Col>
                </Form.Group>
                <Col sm={5}>
                    <Button href="/Confirmation" variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Form>
        </div>

    );
}
