import React, { useState }  from 'react';
import { useParams } from "react-router-dom";
import {Card, Button, ListGroup, ListGroupItem, Image} from 'react-bootstrap';
import space1 from './img/space1.jpg';
import hh from './img/HH-1620X1080.jpg';
import ReservePopUp from './ReservePopUp';

export default function Building() {
    // extract params from url
    const id = useParams();

    // list of study spaces
    const spaces = []

    const [modalShow, setModalShow] = React.useState(false);

    for (var i = 0; i < 8; i++) {
        spaces.push(
            <Card className ="spaceCSS"style={{ width: '18rem', marginLeft: '9.5rem', marginTop: '4rem', marginBottom: '2rem', float: 'left'}}>
                <Card.Img variant="top" src={space1} />
                <Card.Body>
                <Card.Title>Space {i+1}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Location: Somewhere in {id.building}</ListGroupItem>
                    <ListGroupItem>Seats: 5</ListGroupItem>
                    <ListGroupItem>Currently Available</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Reserve
                    </Button>

                    <ReservePopUp
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Card.Body>
             </Card>
        );
    }
    return (
        <div>
            <div className="buildingHeader">
                <Image style={{opacity:"0.9"}}src={hh} fluid />
                <h1 className="centered">{id.building.toUpperCase()}</h1>
            </div>
            {spaces}
        </div>
    )
}
