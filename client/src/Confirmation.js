import React, {useState, useEffect} from 'react';
import { Button, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import hermann from './img/HH-1620X1080.jpg';

import './Main.css';

export default function Confirmation() {
    const id = useParams();
    const space_ID = id.spaceID;
    //var times = "";
    const [times, setTimes] = useState([]);

    const getTimes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/reservation/${id.resID}`)
            const data = await response.json()
            setTimes(data);
            console.log("in getTimes");
            console.log(data);
        } catch (err){
            console.error(err.message);
            console.log("in getTimes catch");
        }
    }

    useEffect(() => {
        getTimes();
    }, []);

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

    var start = new Date(times.res_start);
    var end = new Date(times.res_end);
    var date = start.getUTCDate();
    var month = start.getUTCMonth();
    var year = start.getUTCFullYear();
    var startHour = addZero(start.getHours());
    var startMin = addZero(start.getMinutes());
    var endHour = addZero(end.getHours());
    var endMin = addZero(end.getMinutes());

    return (
        <div>
            <div className="buildingHeader">
                <Image style={{ opacity: "0.9" }} src={hermann} width="1000" height="750" fluid />
                <h1 className="centered">Hermann</h1>
            </div>
            <h2 class="confirmation">Your Reservation on {month}/{date}/{year} from {startHour}:{startMin} to {endHour}:{endMin} has been Accepted</h2>
            <Button href="/" variant="primary" type="submit" class="confirmButton">Return to Home</Button>
        </div>
    );
}