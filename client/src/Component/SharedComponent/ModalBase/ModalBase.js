import React from 'react';
import PropTypes from 'prop-types';
import {ModalBody, ModalFooter, Button, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {Link} from 'react-router-dom';

const ModalBase = props => {
  const {modal, toggle, title, children, linkedAddress} = props;
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Continuer
        </Button>{' '}
        <Link
          className="btn"
          to={linkedAddress}
          color="secondary"
          onClick={() => {
            // dispatch(deleteExperience(experience._id));
            toggle();
            //   dispatch(getExperiences());
          }}
        >
          Abandonner
        </Link>
      </ModalFooter>
    </Modal>
  );
};

ModalBase.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  linkedAddress: PropTypes.string,
  children: PropTypes.node,
};

export default ModalBase;
