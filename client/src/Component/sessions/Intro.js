import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import AuthNavbar from '../layout/AuthNavbar';
import {Link} from 'react-router-dom';
const Intro = ({
  match: {
    params: {id},
  },
}) => {
  return (
    <>
      <AuthNavbar />
      <Col xl="6" className="center mt-1">
        <Col className="center text-center">
          <p style={{fontWeight: 'bold'}}>
            Vous ne savez pas quelle(s) date(s) choisir pour votre expérience ?
          </p>

          <img
            style={{width: '20%'}}
            alt="..."
            src={require('../../Assets/img/brand/question.png').default}
          />
          <h1 style={{fontSize: 'xxx-large'}}>L'équipe a tout prévu </h1>
          <h2>Nous sommes là pour vous aider à réussir votre expérience</h2>
          <div>
            <h2>Découvrir notre modèle de sessions</h2>
            <i className="fas fa-arrow-down" />
          </div>
          <div>
            <p>
              <span className="text-danger x-large"> Une session </span>
              est une période pendant laquelle vous êtes disponible pour lancer le programme de
              l’expérience. Avant de publier l’expérience, vous devez sélectionner au moins une
              session disponible.
              <br /> Une expérience se caractérise par une ou plusieurs sessions.
              <br />
              <b>Pourquoi ?</b>
              <br /> Pour que vous puissiez répéter votre expérience plusieurs fois.
            </p>
            <h1>Les caractéristiques d'une session</h1>
          </div>
        </Col>
        <Col>
          <img
            style={{width: '100%'}}
            alt="..."
            src={require('../../Assets/img/brand/session2.png').default}
          />{' '}
        </Col>
      </Col>
      <div className="col-xl-9 center text-center">
        <h1>Exemple d'un calendrier de sessions</h1>
        <img
          className="border rounded"
          style={{width: '80%'}}
          alt="..."
          src={require('../../Assets/img/brand/session.png').default}
        />
      </div>
      <div className="d-flex justify-content-center">
        <Link to={`/session/${id}`} className="btn btn-success float-right mt-3 mb-5">
          J'ai compris, je veux commencer
        </Link>
      </div>
    </>
  );
};

export default Intro;
