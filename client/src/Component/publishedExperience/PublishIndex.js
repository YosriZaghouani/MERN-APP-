import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import AuthNavbar from '../layout/AuthNavbar';
import {Link} from 'react-router-dom';
const PublishIndex = ({
  match: {
    params: {id},
  },
}) => {
  return (
    <>
      <AuthNavbar />
      <Col xl="6" className="center mt-1">
        <Col style={{textAlign: 'center'}} className="center">
          <h1 style={{fontSize: '47px'}}>
            Plus que quelques étapes pour accueillir des participants
          </h1>
        </Col>
        <Col xl="8" className=" text-center center">
          <p>
            Ci-dessous un résumé pour vous aider à avoir une vision complète sur le processus de
            publication
          </p>
        </Col>
      </Col>
      <Row className="col-xl-12 text-center center">
        <Col xl="4">
          <img
            style={{width: '52%'}}
            alt="..."
            src={require('../../Assets/img/brand/step1.png').default}
          />
          <p>
            1. Prenez votre temps à vérifier les détails de votre expérience. Il faut que vous soyez
            satisfait du résultat final.
          </p>
          <Button size="sm">Consulter</Button>
        </Col>
        <Col xl="4">
          <img
            style={{width: '80%'}}
            alt="..."
            src={require('../../Assets/img/brand/step2.png').default}
          />
          <p>2. Sélectionner les sessions de votre expérience sur le calendrier des sessions.</p>
        </Col>
        <Col xl="4">
          <img
            style={{width: '61%'}}
            alt="..."
            src={require('../../Assets/img/brand/step3.png').default}
          />
          <p>3. Publier l'expérience et accueillir vos premiers participants.</p>
        </Col>
      </Row>
      <Link to={`/intro/${id}`} className="btn btn-success center">
        Commencer le processus
      </Link>
    </>
  );
};

export default PublishIndex;
