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
  const tempSpace = [1, 2, 3, 4, 5, 6, 7, 8]; //Availability code assumes that these will become space_ids that correspond with the database
  const [modalShow, setModalShow] = useState(false);

  // Get availability of spaces
  const [availability, setAvailability] = useState(Array(tempSpace.length).fill({text: ""}));

  const getAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5000/spaces/" + 1); //TODO change the '1' to dynamic building_id;

      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAvailability();
  }, []);

  const spaces = tempSpace.map((i, idx) => {
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
        key={i}
      >
        <Card.Img variant="top" src={space1} />
        <Card.Body>
          <Card.Title>Space {i}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Location: Somewhere in {id.building}</ListGroupItem>
          <ListGroupItem>Seats: 5</ListGroupItem>
          <ListGroupItem>
            {/* check database whether this is available */}
            <Badge variant={availability[idx].available ? "success" : "danger"}>{availability[idx].text}</Badge>{" "}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
            Reserve
          </Button> */}

          {/* <ReservePopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
            building={id.building}
            studySpaceID={i}
          /> */}
          <Button
            href={id.building + "/" + i + "/ReserveForm"}
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
