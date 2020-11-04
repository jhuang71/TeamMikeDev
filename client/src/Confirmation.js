import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import hermann from './img/HH-1620X1080.jpg';

import './Main.css';

export default function Confirmation() {
    const id = useParams();
    const space_ID = id.spaceID;

    const getTimes = async () => {
        try {
            const response = await fetch("http://localhost:5000/reservation/:id")
            const data = await response.json()
            this.setTimes({ time: data.results[0] });
        } catch (err){
            console.error(err.message);
        }
    }

    return (
        <div>
            <div className="buildingHeader">
                <Image style={{ opacity: "0.9" }} src={hermann} width="1000" height="750" fluid />
                <h1 className="centered">Hermann</h1>
            </div>
            <h2 class="confirmation">Your Reservation from {this.time.res_start} to {this.time.res_end} has been Accepted</h2>
            <Button href="/" variant="primary" type="submit" class="confirmButton">Return to Home</Button>
        </div>
    );
}