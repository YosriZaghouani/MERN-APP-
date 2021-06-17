import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ModalReservation = props => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        onClick={toggle}
        style={{boxShadow: 'none'}}
        className="btn mt-4 btn-secondary"
        size="sm"
      >
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
        <ModalBody>{props.modalBody}</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              props.click();
            }}
          >
            {props.firstButton}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalReservation;
