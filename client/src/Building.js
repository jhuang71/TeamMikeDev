import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Image,
  Badge,
  Modal
} from "react-bootstrap";
import space1 from "./img/space1.jpg";
import hh from "./img/HH-1620X1080.jpg";
import ReservePopUp from "./ReservePopUp";

export default function Building(props) {
  // extract params from url
  const id = useParams();

  // list of study spaces
  const [studySpace, setStudySpace] = useState([]);

  // Get availability of spaces
  const [availability, setAvailability] = useState(Array(1000).fill({text: ""}));

  const getAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5000/spaces/" + 1); //TODO change the '1' to dynamic building_id;

      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error(error.message);
    }
  };


  const getStudySpace = async () => {
    try {
      const res = await fetch("http://localhost:5000/get/study_spaces/" + 1); // TODO: dynamic building id
      const data = await res.json();
      setStudySpace(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getStudySpace();
    getAvailability();
  }, []);


  const spaces = studySpace.map((space, idx) => {
    return (
      <Card
        className="spaceCSS"
        style={{
          width: "18rem",
          marginLeft: "9.5rem",
          marginTop: "4rem",
          marginBottom: "2rem",
          float: "left",
        }}
        key={idx}
      >
        <Card.Img variant="top" src={space1} />
        <Card.Body>
          <Card.Title>Space {space.space_id}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Location: {space.space_loc}</ListGroupItem>
        <ListGroupItem>Seats: {space.num_chairs}</ListGroupItem>
          <ListGroupItem>
            {/* check database whether this is available */}
            <Badge variant={availability[idx].available ? "success" : "danger"}>{availability[idx].text}</Badge>{" "}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button
            href={id.building + "/" + space.space_id + "/ReserveForm"}
          >
            Reserve
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <div className="buildingHeader">
        <Image style={{ opacity: "0.9" }} src={hh} fluid />
        <h1 className="centered">{id.building.toUpperCase()}</h1>
      </div>
      {spaces}
    </div>
  );
}
