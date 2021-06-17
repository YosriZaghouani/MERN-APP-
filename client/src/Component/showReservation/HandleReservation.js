import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Col, Input, Row} from 'reactstrap';
import {updateExperience} from '../../JS/actions';
import ModalBase from '../layout/ModalBase';
import emailjs from 'emailjs-com';

const HandleReservation = ({experience, reservation, session}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const cancelReservation = () => {
    reservation = {...reservation, status: 'canceledByParticipant', reason: reason};
    const arr = session.reservationDemand.filter(r => r.userId !== reservation.userId);
    session.reservationDemand = arr;
    session.reservationDemand.push(reservation);
  };
  const updateReservation = () => {
    dispatch(updateExperience(experience._id, {...experience}));
  };
  const sendRefundParticipant = () => {
    emailjs
      .send(
        'service_84sbazd',
        'template_mi99ntw',
        {
          experience_title: experience.title,
          user_name: reservation.userName,
          session_date: new Date(session.sessionDate).toLocaleDateString('fr-EG', options),
          user_email: reservation.userEmail,
        },
        'user_dsDTlzDCe0SFlhs6QIFv2'
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
        'service_84sbazd',
        'template_kyjwdda',
        {
          experience_title: experience.title,
          user_name: experience.user.name,
          session_date: new Date(session.sessionDate).toLocaleDateString('fr-EG', options),
          participant_name: reservation.userName,
          participant_email: reservation.userEmail,
          user_email: experience.user.email,
        },
        'user_dsDTlzDCe0SFlhs6QIFv2'
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
      {reservation.status && reservation.status === 'accepted' ? (
        <>
          <Link
            to={`details/${experience._id}`}
            className="col-xl-3 mt-4 btn btn-secondary"
            style={{boxShadow: 'none', padding: '0.5%', fontSize: 'x-small'}}
          >
            consulter l'expérience
          </Link>
          <Link
            to={`payment/${experience._id}`}
            className="col-xl-2 mt-4 btn btn-success"
            style={{boxShadow: 'none', padding: '0.5%', fontSize: 'x-small'}}
          >
            Payer
          </Link>
        </>
      ) : reservation.status && reservation.status === 'paid' ? (
        <>
          <Row>
            <Link
              to={`details/${experience._id}`}
              className="col-xl-3 mt-4 btn btn-secondary"
              style={{boxShadow: 'none', padding: '0.5%', fontSize: 'x-small', marginLeft: '2%'}}
            >
              consulter l'expérience
            </Link>
            <Col xl="4">
              <ModalBase
                buttonLabel="Annuler ma réservation"
                modalTitle={
                  <h1 className="text-danger">
                    <i className="fas fa-heart-broken" />
                  </h1>
                }
                modalBody={
                  <>
                    <p className="text-center">
                      Vous êtes sûr de vouloir annuler votre réservation. Si oui précisez la cause
                      ici.
                    </p>
                    <Input type="textarea" required onChange={e => setReason(e.target.value)} />
                    <small style={{fontSize: 'x-small'}}>
                      Nous traiterons votre annulation de résrevation dans les brefs délais et nous
                      vous contacterons par mail dès que le remboursement sera possible.
                    </small>
                  </>
                }
                firstButton="Oui"
                secondButton="Non"
                style={{boxShadow: 'none', fontSize: 'x-small'}}
                className="mt-4 btn"
                click={() => {
                  cancelReservation();
                  updateReservation();
                  sendRefundCreator();
                  sendRefundParticipant();
                }}
              />
            </Col>
          </Row>
        </>
      ) : reservation.status && reservation.status === 'canceledByParticipant' ? (
        ''
      ) : (
        <Link
          to={`details/${experience._id}`}
          className="col-xl-3 mt-4 btn btn-secondary"
          style={{boxShadow: 'none', padding: '0.5%', fontSize: 'x-small'}}
        >
          consulter l'expérience
        </Link>
      )}
    </>
  );
};

export default HandleReservation;
