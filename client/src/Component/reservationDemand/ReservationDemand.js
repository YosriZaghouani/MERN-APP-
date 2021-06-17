import React, {useState} from 'react';
import ModalReservation from '../layout/ModalReservation';
import ReservationDemandTable from './ReservationDemandTable';
import {updateExperience} from '../../JS/actions';
import {useDispatch} from 'react-redux';
import emailjs from 'emailjs-com';

const ReservationDemand = ({el, index, experience, options}) => {
  const [demandAccepted, setDemandAccepted] = useState([]);
  const [demandRefused, setDemandRefused] = useState([]);

  const dispatch = useDispatch();
  const updateReservationDemand = () => {
    dispatch(updateExperience(experience._id, {...experience}));
  };
  const sendAcceptedDemand = () => {
    demandAccepted &&
      demandAccepted.map(demand =>
        emailjs
          .send(
            'service_xo5u91j',
            'template_lw7rdks',
            {
              sessionDate: new Date(el.sessionDate).toLocaleDateString('fr-EG', options),
              to_name: demand.userName,
              experience_title: experience.title,
              user_email: demand.userEmail,
              paymentLimit: new Date(el.paymentLimit).toLocaleDateString('fr-EG', options),
            },
            'user_xGQkz9ksng5jPVDX4ce75'
          )
          .then(
            result => {
              console.log(result.text);
            },
            error => {
              console.log(error.text);
            }
          )
      );
  };
  const sendRefusedDemand = () => {
    demandRefused &&
      demandRefused.map(demand =>
        emailjs
          .send(
            'service_xo5u91j',
            'template_uu3r7xs',
            {
              sessionDate: new Date(el.sessionDate).toLocaleDateString('fr-EG', options),
              to_name: demand.userName,
              experience_title: experience.title,
              user_email: demand.userEmail,
            },
            'user_xGQkz9ksng5jPVDX4ce75'
          )
          .then(
            result => {
              console.log(result.text);
            },
            error => {
              console.log(error.text);
            }
          )
      );
  };

  return (
    <>
      <ModalReservation
        buttonLabel="Traiter les demandes de réservation"
        modalTitle="Les demandes de résrevations"
        modalBody={
          <ReservationDemandTable
            el={el}
            index={index}
            experience={experience}
            demandAccepted={demandAccepted}
            setDemandAccepted={setDemandAccepted}
            demandRefused={demandRefused}
            setDemandRefused={setDemandRefused}
          />
        }
        firstButton="Envoyer"
        click={() => {
          updateReservationDemand();
          if (demandAccepted.length !== 0) {
            sendAcceptedDemand();
          }
          if (demandRefused.length !== 0) {
            sendRefusedDemand();
          }
        }}
      />
    </>
  );
};

export default ReservationDemand;
