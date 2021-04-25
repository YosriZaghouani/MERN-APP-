import React, {useEffect, useState} from 'react';
import AuthNavbar from '../layout/AuthNavbar';
import Session from './Session';
import {Row, Col, Button} from 'reactstrap';

const ExperienceSession = () => {
  return (
    <>
      <AuthNavbar />
      <div className="col-xl-5 center text-center">
        <h1 style={{fontSize: 'xx-large'}}>
          Tout est prêt, il suffit de sélectionner une ou plusieurs sessions
        </h1>
        <p>Vous pouvez toujours revenir et ajouter d'autres sessions</p>
      </div>
      <Col xl="6" className="center m-2 mb-5">
        <Session />
      </Col>
    </>
  );
};
export default ExperienceSession;
