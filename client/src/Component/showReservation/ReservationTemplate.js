import React from 'react';
import {Card, CardBody, Row, Col} from 'reactstrap';
import HandleReservation from './HandleReservation';
import ReservationStatus from './ReservationStatus';

const ReservationTemplate = ({experience, session, reservation}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  return (
    <>
      <Card className="card-stats mb-4 mb-xl-0 col-xl-7">
        <CardBody>
          <Row>
            <Col xl="8" className="font-weight-bold">
              {experience.title}
            </Col>
            <Col xl="4">
              <ReservationStatus reservation={reservation} session={session} />
            </Col>
          </Row>
          <br />
          <small>
            La session : {new Date(session.sessionDate).toLocaleDateString('fr-EG', options)}{' '}
          </small>

          <br />
          {reservation.status === 'paid' ? (
            <small>
              <span className="text-danger font-weight-bold">Limite d'annulation : </span>
              {new Date(session.paymentLimit).toLocaleDateString('fr-EG', options)}
            </small>
          ) : reservation.status && reservation.status === 'canceledByParticipant' ? (
            <small>
              Vous avez annuler votre réservation. Nous sommes en cours de traitement du
              remboursement. <br />
              <br />
            </small>
          ) : session.isCanceled ? (
            <small>
              <span>Cette expérience a été annulé par son créateur le </span>
              {new Date(session.cancelDate).toLocaleDateString('fr-EG', options)}
            </small>
          ) : (
            <small>
              <span>Limite de paiement : </span>
              {new Date(session.paymentLimit).toLocaleDateString('fr-EG', options)}
            </small>
          )}
          <br />
          <HandleReservation reservation={reservation} experience={experience} session={session} />
        </CardBody>
      </Card>
    </>
  );
};

export default ReservationTemplate;
