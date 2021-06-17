import React, {useEffect, useState} from 'react';
import Loader from '../layout/Loader';

import {useDispatch, useSelector} from 'react-redux';
import {getExperienceDetails, updateExperience, getExperiences} from '../../JS/actions/index';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const AskForReservation = ({experience, el, user}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Demander une réservation ?</ModalHeader>
        <ModalBody>
          Nous enverrons votre demande de réservation au créateur, elle est en attente jusqu'à ce
          qu'il accepte ou refuse votre demande. Dans les deux cas, nous vous enverrons un email
          pour vous informer.
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-success"
            onClick={() => {
              toggle();
              el.reservationDemand.push({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                userNumber: user.number,
              });
              dispatch(updateExperience(experience._id, {...experience}));
            }}
          >
            Envoyer la demande
          </Button>
        </ModalFooter>
      </Modal>
      {el.reservationDemand.filter(e => e.userId === user._id).length > 0 ? (
        <p className="text-yellow">Demande de réservation envoyée</p>
      ) : (
        <Button className="text-danger" size="sm" onClick={toggle}>
          Réserver
        </Button>
      )}
    </>
  );
};

export default AskForReservation;
