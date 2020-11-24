import { Form, Modal, Col, Tabs, Tab } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import "./App.css";

export default function MyReservations(props) {
    var today = new Date();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reservations, setReservations] = useState([]);
    const userProfile = props.userProfile;

    const getReservations = async studentId => {
        try {
            const response = await fetch(`http://localhost:5000/reservations/${studentId}`)
            const jsonData = await response.json();

            setReservations(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getReservations(userProfile.googleID);
    }, []);

    //This gets all reservations - leaving it here in case needed for the future
    // const getReservations = async() => {
    //     try {
    //         const response = await fetch("http://localhost:5000/reservations/")
    //         const jsonData = await response.json()

    //         setReservations(jsonData);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }
    // useEffect(() => {
    //     getReservations();
    // }, []);

    console.log(reservations);

    const handleEnd = async id => {
        try {
            const body = {
                res_id: id,
                student_id: userProfile.googleID
            };
            const response = await fetch("http://localhost:5000/endReservation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log("Ending Reservation at:\n", response);

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    const handleCancel = async id => {
        try {
            const deleteRes = await fetch(`http://localhost:5000/reservation/${id}`, {
                method: "DELETE"
            });

            setReservations(reservations.filter(reservations => reservations.res_id !== id));
        } catch (err) {
            console.error(err.message);  
        }
    }

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
                <Modal.Title style={{ textAlign: 'center', paddingTop: '16px' }}>My Reservations</Modal.Title>
                <Modal.Body style={{ textAlign: 'center', margin: '0', paddingBottom: '0' }}>
                    <Tabs defaultActiveKey="upcoming" id="resTabs">
                        <Tab eventKey="upcoming" title="Upcoming/Current Reservations">
                            <table className="table text=center mb-0">
                                <thead>
                                    <tr>
                                        <th>Reservation ID</th>
                                        <th>Time From</th>
                                        <th>Time To</th>
                                        <th>Check Out</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(res => (
                                        today <= new Date(res.res_end) ?
                                            <tr key={res.res_id}>
                                                <td>{res.res_id}</td>
                                                <td>{res.res_start}</td>
                                                <td>{res.res_end}</td>
                                                <td>
                                                    {(today >= new Date(res.res_start) && (today <= new Date(res.res_end))) ? <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleEnd(res.res_id)}>
                                                        End
                                                </button> : <></>}
                                                </td>
                                                <td>
                                                    {today <= new Date(res.res_start) ? <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleCancel(res.res_id)}>
                                                        Cancel
                                                </button> : <></>}
                                                </td>
                                            </tr> : <></>
                                    ))}
                                </tbody>
                            </table>
                        </Tab>
                        <Tab eventKey="past" title="Past Reservations">
                            <table className="table text=center mb-0">
                                <thead>
                                    <tr>
                                        <th>Reservation ID</th>
                                        <th>Time From</th>
                                        <th>Time To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(res => (
                                        today > new Date(res.res_end) ?
                                            <tr key={res.res_id}>
                                                <td>{res.res_id}</td>
                                                <td>{res.res_start}</td>
                                                <td>{res.res_end}</td>
                                            </tr> : <></>
                                    ))}
                                </tbody>
                            </table>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                {/* Made a form in case we want to add more fields in the future */}
                {/* <Modal.Body>
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
                </Modal.Body> */}
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