import { Modal, Button } from 'react-bootstrap';
import React from 'react'

export default function ReservePopUp(props) {
  const path = props.building.concat("/" + props.studySpaceID).concat("/ReserveForm")
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 style={{ textAlign: 'center', margin: '1em' }}>Would you like to reserve this space?</h4>
        <p style={{ marginLeft: '1em', marginRight: '1em', textAlign: 'center' }}>
          By reserving this space, you're agree to use this space respectively and peacefully.<br></br> You are allowed to use this space for a maximum of two hours. After two hours,
          you will be automatically check out.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button href={path} style={{ marginRight: '5em' }} >Yes, I would like to reserve the space</Button>
        <Button style={{ marginRight: '13em' }} variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  );
}