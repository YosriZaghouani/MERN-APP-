import React from 'react';

import {Card, CardHeader, CardBody, Col, Media, Row} from 'reactstrap';

const Details = ({experience}) => {
  return (
    <>
      <Card className="bg-white shadow border">
        <CardHeader className="bg-white">
          <div className="text-muted mt-2 mb-4">
            <small>
              {experience.type.title === 'en ligne' ? (
                <i className="ni ni-laptop" />
              ) : (
                <i className="fas fa-users" />
              )}{' '}
              Expérience {experience.type.title}
            </small>
            <h1 style={{margin: '0%'}}>{experience.title}</h1>
            <small>{experience.city}, Tunisie</small>
            <Row>
              <Col lg="10" md="8">
                <h3 style={{paddingTop: '2%'}}>
                  Expérience {experience.type.title} organisée par {experience.user.name}
                </h3>
              </Col>
              <Col>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="..." src={experience.user.photo} />
                  </span>
                </Media>
              </Col>
            </Row>
            <div style={{padding: '2%'}}>
              <Row>
                <img
                  alt=""
                  className="border rounded p-0"
                  src={experience.photo}
                  style={{height: '300px', width: '300px'}}
                />
                <img
                  alt=""
                  className="border rounded p-0"
                  src={experience.photo2}
                  style={{height: '300px', width: '300px'}}
                />
                <img
                  alt=""
                  className="border rounded p-0"
                  src={experience.photo3}
                  style={{height: '300px', width: '300px'}}
                />
              </Row>
            </div>
          </div>
          <Card className="bg-white border-1">
            <CardHeader className="bg-white">
              <Row className="icon-examples">
                <Col lg="6" md="6">
                  <p>
                    <i className="far fa-clock" style={{paddingRight: '3%'}} />
                    {experience.startHour} - {experience.endHour}
                  </p>
                </Col>
                <Col lg="6" md="6">
                  <p>
                    <i className="fas fa-users" style={{paddingRight: '3%'}} /> Jusqu'à{' '}
                    {experience.limitParticipants} personnes
                  </p>
                </Col>
                <Col lg="6" md="6">
                  <p>
                    <i style={{paddingRight: '3%'}} className="far fa-comments" /> Proposé en{' '}
                    {experience.language}
                  </p>
                </Col>
                <Col lg="6" md="6">
                  <p>
                    <i style={{paddingRight: '3%'}} className="fas fa-wallet" /> {experience.price}{' '}
                    TND
                  </p>
                </Col>
                <Col lg="6" md="6">
                  <p>
                    <i className="fas fa-street-view" style={{paddingRight: '4%'}} />
                    {experience.target[0]}
                    {experience.target[1] ? <span> et {experience.target[1]}</span> : ''}
                  </p>
                </Col>
                <Col lg="6" md="6">
                  <p>
                    <i className="fas fa-bolt" style={{paddingRight: '3%'}} />
                    niveau {experience.difficulty}{' '}
                  </p>
                </Col>
                {experience.phobia.length !== 0 ? (
                  <Col lg="6" md="6">
                    <p>
                      <i className="fas fa-users-slash" style={{paddingRight: '3%'}} />
                      {experience.phobia}{' '}
                    </p>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>{' '}
            </CardHeader>
          </Card>
          <Card className="bg-white border-0">
            <CardBody style={{paddingBottom: '0%'}}>
              <h4 style={{marginBottom: '0%'}}>L'activité</h4>
              <small>
                {experience.themes.map(el => (
                  <span>{el} </span>
                ))}
              </small>{' '}
              <br />
              <p>{experience.activity}</p>
            </CardBody>
          </Card>
        </CardHeader>
        <CardBody className="col-xl-10 border rounded center mt-4">
          <h4>Au programme</h4>
          <small>{experience.program.generalDesc}</small>
        </CardBody>
        {experience.includedEq || experience.excludedEq ? (
          <CardBody className="px-lg-5">
            <Card className="bg-white border-1">
              <CardHeader className="bg-white">
                <Row className="icon-examples">
                  {experience.includedEq ? (
                    <Col lg="6" md="6">
                      <h4>Les équipements inclus</h4>
                      {experience.includedEq.drink ? (
                        <p>
                          <i className="fas fa-wine-bottle" /> {experience.includedEq.drink}
                        </p>
                      ) : (
                        <></>
                      )}
                      {experience.includedEq.food ? (
                        <p>
                          <i className="fas fa-utensils" /> {experience.includedEq.food}
                        </p>
                      ) : (
                        <></>
                      )}
                      {experience.includedEq.material ? (
                        <p>
                          <i className="fas fa-archive" />
                          {'   '}
                          {experience.includedEq.material}
                        </p>
                      ) : (
                        <></>
                      )}
                    </Col>
                  ) : (
                    <></>
                  )}

                  {experience.excludedEq ? (
                    <Col lg="6" md="6">
                      <h4>Les équipements exclus</h4>
                      {experience.excludedEq.drink ? (
                        <p>
                          {'   '} <i className="fas fa-wine-bottle" /> {experience.excludedEq.drink}
                        </p>
                      ) : (
                        <></>
                      )}
                      {experience.excludedEq.food ? (
                        <p>
                          {'   '} <i className="fas fa-utensils" /> {experience.excludedEq.food}
                        </p>
                      ) : (
                        <></>
                      )}
                      {experience.excludedEq.material ? (
                        <p>
                          <i className="fas fa-archive" />
                          {'   '}
                          {experience.excludedEq.material}
                        </p>
                      ) : (
                        <></>
                      )}
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </CardHeader>
            </Card>
          </CardBody>
        ) : (
          ''
        )}
      </Card>
    </>
  );
};
export default Details;
