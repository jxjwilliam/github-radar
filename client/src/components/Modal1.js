import React from 'react'
import {Modal, Button} from "react-bootstrap";
import ReduxForm from './ReduxForm2'

const ModalForm = ({show, close, onUpdate, user}) => {
  return (
    <Modal
      show={show}
      className={show ? "show" : ''}
      onHide={close}
    >
      <Modal.Header closeButton>
        <Modal.Title>{user.email ? user.email : 'Add User'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReduxForm onSubmit={onUpdate} user={user}/>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm