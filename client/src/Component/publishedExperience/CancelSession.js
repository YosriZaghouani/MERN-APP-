import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Input} from 'reactstrap';
import ModalBase from '../layout/ModalBase';
import emailjs from 'emailjs-com';
import {updateExperience} from '../../JS/actions';

const CancelSession = ({experience, el, options}) => {
  const dispatch = useDispatch();
  const [justification, setJustification] = useState('');
  const cancelSession = () => {
    el = {
      ...el,
      isLaunched: false,
      isCanceled: true,
      justification: justification,
      cancelDate: new Date(),
    };
    const arr = experience.sessions.filter(s => s._id !== el._id);
    experience.sessions = arr;
    experience.sessions.push(el);
  };
  const updateSession = () => {
    dispatch(updateExperience(experience._id, {...experience}));
  };
  const sendRefundParticipant = reservation => {
    emailjs
      .send(
        'service_les06b3',
        'template_awg6d6f',
        {
          experience_title: experience.title,
          user_name: reservation.user_name,
          session_date: new Date(el.sessionDate).toLocaleDateString('fr-EG', options),
          user_email: reservation.userEmail,
        },
        'user_nYiJPRbm3NMCkD5wfXLZf'
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
  };
  const sendRefundCreator = () => {
    emailjs
      .send(
        'service_les06b3',
        'template_do0r5qq',
        {
          experience_title: experience.title,
          user_name: experience.user.name,
          session_date: new Date(el.sessionDate).toLocaleDateString('fr-EG', options),
          user_email: experience.user.email,
        },
        'user_nYiJPRbm3NMCkD5wfXLZf'
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <ModalBase
        buttonLabel={<i className="fas fa-times text-danger" />}
        modalTitle={
          <h1 className="text-yellow">
            <i className="fas fa-exclamation-triangle" />
          </h1>
        }
        modalBody={
          <>
            <p className="text-center">
              Vous êtes sûr de vouloir annuler votre session ? Si oui précisez la cause ici.
            </p>
            <Input type="textarea" required onChange={e => setJustification(e.target.value)} />
            <small style={{fontSize: 'x-small'}}>
              Suite à l'annulation les personnes qui ont payées recevront un mail. Nous traiterons
              votre annulation dans les brefs délais. Dès que le remboursement sera possible, les
              personnes qui ont payées recevront un mail et un remboursement complet.
              <br />
              <b>
                Les annulations fréquentes peuvent conduire à la suppression de l'expérience de la
                plate-forme Xperience.
              </b>
            </small>
          </>
        }
        firstButton="Oui"
        secondButton="Non"
        style={{boxShadow: 'none', fontSize: 'medium'}}
        className="btn  bg-transparent border-0"
        click={() => {
          cancelSession();
          updateSession();
          el.reservationDemand.map(reservation => {
            if (reservation.status !== 'canceledByParticipant') {
              sendRefundParticipant(reservation);
            }
          });
          sendRefundCreator();
        }}
      />
    </>
  );
};

export default CancelSession;
