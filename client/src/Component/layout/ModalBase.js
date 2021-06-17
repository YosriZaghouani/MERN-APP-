import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ModalBase = props => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle} style={props.style} className={props.className} size="sm">
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
        <ModalBody>{props.modalBody}</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.click();
              toggle();
            }}
          >
            {props.firstButton}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              props.clickDanger();
              toggle();
            }}
          >
            {props.secondButton}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalBase;
