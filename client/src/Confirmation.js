import React, {useState, useEffect} from 'react';
import { Button, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import hh from "./img/HH-1620X1080.jpg";
import mtcc from "./img/mtcc-1607 x 725.jpg";
import crown from "./img/crown.jpg";
import galvin from "./img/galvin.jpg";
import kaplan from "./img/kaplan.jpg";
import perlstein from "./img/perlstein.jpg";
import pritzker from "./img/pritzker.jpg";
import stuart from "./img/stuart.jpg";
import tower from "./img/tower.jpg";
import extra from "./img/extra.jpg";
import './Main.css';

export default function Confirmation() {
    const id = useParams();
    const space_ID = id.spaceID;
    function buildingSelect() {
        if(id.building === "hermann") {
            return hh;
        } else if (id.building === "mtcc") {
            return mtcc;
        } else if (id.building === "iit_tower") {
            return tower;
        } else if (id.building === "pritzker") {
            return pritzker;
        } else if (id.building === "galvin") {
            return galvin;
        } else if (id.building === "stuart") {
            return stuart;
        } else if (id.building === "kaplan") {
            return kaplan;
        } else if (id.building === "perlstein") {
            return perlstein;
        } else if (id.building === "crown") {
            return crown;
        } else {
            return extra;
        }
      };
    
    function buildingName() {
        if(id.building === "Eng") {
            return "ENGINEERING CENTER";
        } else if(id.building === "iit_tower") {
            return "IIT TOWER";
        } else {
            return id.building.toUpperCase();
        }
    };
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
                <Image style={{ opacity: "0.9" }} src={buildingSelect()} width="1000" height="750" fluid />
                <h1 className="centered">{buildingName()}</h1>
            </div>
            <h2 class="confirmation">Your Reservation on {month + 1}/{date}/{year} from {startHour}:{startMin} to {endHour}:{endMin} has been Accepted</h2>
            <Button href="/" variant="primary" type="submit" class="confirmButton">Return to Home</Button>
        </div>
    );
}