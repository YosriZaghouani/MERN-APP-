import React from 'react';
import {Col, Row, Card, CardBody, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';

const CreatorHome = () => {
  return (
    <>
      <Col lg="5" md="8" className="center " style={{padding: '1%'}}>
        <h1 style={{fontSize: 'revert'}}>
          «Une <span style={{color: '#f5365c '}}>idée</span> ne peut devenir
          <span style={{color: '#11cdef  '}}> réalité</span> qu'une fois décomposée en éléments
          <span style={{color: '#ffd600'}}> organisés </span>
          et exploitables.»
        </h1>
        <small>
          {' '}
          <b>Scott Belsky</b>
        </small>
      </Col>{' '}
      <Col lg="12" md="10">
        <Row className="mt-4">
          <Col lg="6" xl="3" style={{marginBottom: '1%'}}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Col style={{textAlign: 'center'}}>
                  <h1 style={{fontSize: 'xxx-large'}}>
                    <i className="ni ni-collection" />
                  </h1>
                  Concrétisation de la passion afin de pouvoir la structurer sous forme d’une
                  expérience
                </Col>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" style={{marginBottom: '1%'}}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Col style={{textAlign: 'center'}}>
                  <h1 style={{fontSize: 'xxx-large'}}>
                    <i className="fas fa-clipboard-check" />
                  </h1>
                  Validation de l'identité du créateur et du contenu de l'expérience proposée par un
                  consultant
                </Col>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" style={{marginBottom: '1%'}}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Col style={{textAlign: 'center'}}>
                  <h1 style={{fontSize: 'xxx-large'}}>
                    <i className="ni ni-spaceship " />
                  </h1>
                  Fixation d'une stratégie de communication nécessaire à la résussite de
                  l'expérience
                </Col>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" style={{marginBottom: '1%'}}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Col style={{textAlign: 'center'}}>
                  <h1 style={{fontSize: 'xxx-large'}}>
                    <i className="fas fa-chart-line" />
                  </h1>
                  Mise à disposition des statistiques pour obtenir plus de visibilité sur le
                  rendement
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg="12" md="10">
        <Row>
          <Col lg="5">
            <Card className="card-stats mb-4 mb-xl-0 border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h1" className=" mb-0">
                      Prêt à faire de votre passion un revenu ?
                    </CardTitle>
                    {localStorage.getItem('token') ? (
                      <Link to="/experiences" className="btn btn-secondary">
                        {' '}
                        Oui allez-y
                      </Link>
                    ) : (
                      <Link to="/login" className="btn btn-secondary">
                        {' '}
                        Oui allez-y
                      </Link>
                    )}
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="7">
            <img
              alt="..."
              src={require('../Assets/img/brand/home.jpg').default}
              style={{width: '100%'}}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default CreatorHome;
