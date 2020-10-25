import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Image } from 'react-bootstrap';
import hermann from './img/HH-1620X1080.jpg';

import './Main.css';

export default function ReserveForm() {
    //const id = useParams();


    return (
        <div>
            <div className="buildingHeader">
                <Image style={{ opacity: "0.9" }} src={hermann} width="1000" height="750" fluid />
                <h1 className="centered">Hermann</h1>
            </div>
            <h2 class="confirmation">Your Reservation has been Accepted</h2>
            <Button href="/" variant="primary" type="submit" class="confirmButton">Return to Home</Button>
        </div>
    );
}