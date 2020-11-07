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
    //const [todos, setTodos] = useState([]);

    // const response = await fetch("http://localhost:5000/reservation/:id", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(body),
    //     });
    //     const jsonData = await response.json()

    // const getTodos = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/todos")
    //         const jsonData = await response.json()

    //         setTodos(jsonData);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    const getTimes = async id => {
        try {
            const response = await fetch(`http://localhost:5000/reservation/${id}`)
            const data = await response.json()
            setTimes(data);
            //times = data;
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

    return (
        <div>
            <div className="buildingHeader">
                <Image style={{ opacity: "0.9" }} src={hermann} width="1000" height="750" fluid />
                <h1 className="centered">Hermann</h1>
            </div>
            <h2 class="confirmation">Your Reservation from {times.res_start} to {times.res_end} has been Accepted</h2>
            <Button href="/" variant="primary" type="submit" class="confirmButton">Return to Home</Button>
        </div>
    );
}