import React, {useEffect, useState} from 'react';
import emailjs from 'emailjs-com';

import '../../App.css';
import Loader from '../layout/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  getExperienceDetails,
  updateExperience,
  getExperiences,
  updateProfile,
} from '../../JS/actions/index';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Media,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import AuthNavbar from '../layout/AuthNavbar';

const ExperienceDetailsAd = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalRefuse, setModalRefuse] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleRefuse = () => setModalRefuse(!modalRefuse);

  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);
  const loading = useSelector(state => state.userReducer.loading);

  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);

  return localStorage.getItem('token') ? (
    isLoading && loading ? (
      <Loader />
    ) : experience ? (
      <>
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody toggle={toggle}>Etes vous sûr d'accepter le contenu ?</ModalBody>
          <ModalFooter>
            <Link
              className="btn btn-success"
              to={`/admin`}
              onClick={e => {
                toggle();
                emailjs
                  .send(
                    'service_0ec1exm',
                    'template_qj3xs22',
                    {
                      to_name: experience.user.name,
                      experience_title: experience.title,
                      user_email: experience.user.email,
                    },
                    'user_6Wz2MmUhVdIRToUwyPWvZ'
                  )
                  .then(
                    result => {
                      console.log(result.text);
                    },
                    error => {
                      console.log(error.text);
                    }
                  );
                experience.user.verif
                  ? dispatch(
                      updateExperience(experience._id, {
                        ...experience,
                        status: 'accepted',
                      })
                    )
                  : dispatch(
                      updateExperience(experience._id, {
                        ...experience,
                        status: 'contentValidated',
                      })
                    );
              }}
            >
              Oui
            </Link>

            <Button color="secondary" onClick={toggle}>
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
        {/* endModal */}
        {/* Modal */}
        <Modal isOpen={modalRefuse} toggleRefuse={toggleRefuse}>
          <ModalBody toggleRefuse={toggleRefuse}>Etes vous sûr de refuser le contenu ?</ModalBody>
          <ModalFooter>
            <Link
              className="btn btn-success"
              to={`/admin`}
              onClick={e => {
                toggleRefuse();
                emailjs
                  .send(
                    'service_0ec1exm',
                    'template_gtm0fyd',
                    {
                      to_name: experience.user.name,
                      experience_title: experience.title,
                      user_email: experience.user.email,
                    },
                    'user_6Wz2MmUhVdIRToUwyPWvZ'
                  )
                  .then(
                    result => {
                      console.log(result.text);
                    },
                    error => {
                      console.log(error.text);
                    }
                  );

                dispatch(
                  updateExperience(experience._id, {
                    ...experience,
                    status: 'refused',
                  })
                );
                dispatch(getExperiences());
              }}
            >
              Oui
            </Link>

            <Button color="secondary" onClick={toggleRefuse}>
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
        {/* endModal */}
        <div>
          <AuthNavbar />
          <Col lg="7" md="8" className="center mt-2">
            <Card className="bg-white shadow border-">
              <CardHeader className="bg-white">
                {experience.status === 'beingValidated' ? (
                  <>
                    <h2>La première étape de validation</h2>

                    <Link style={{float: 'left'}} className="btn btn-sm btn-info" to={`/admin`}>
                      Retour
                    </Link>
                    <Row className="col-xl-5 float-right">
                      <Col>
                        <Button className="btn btn-sm btn-success" onClick={toggle}>
                          Accepter le contenu
                        </Button>
                      </Col>
                      <Col>
                        <Button className="btn btn-sm btn-danger" onClick={toggleRefuse}>
                          Refuser le contenu
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : experience.status === 'contentValidated' ? (
                  <>
                    <Row style={{float: 'right'}}>
                      <Col>
                        <Link
                          to={`/admin`}
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            dispatch(
                              updateExperience(experience._id, {
                                ...experience,
                                status: 'accepted',
                                user: {...experience.user, verif: true, falseIdentity: false},
                              })
                            );
                            dispatch(
                              updateProfile(experience.user._id, {
                                ...experience.user,
                                verif: true,
                                falseIdentity: false,
                              })
                            );
                            dispatch(getExperiences());
                            emailjs
                              .send(
                                'service_bsjla9l',
                                'template_zto2j4k',
                                {
                                  to_name: experience.user.name,
                                  experience_title: experience.title,
                                  user_email: experience.user.email,
                                },
                                'user_IDL4u3gVEUJR2PbmpPSjH'
                              )
                              .then(
                                result => {
                                  console.log(result.text);
                                },
                                error => {
                                  console.log(error.text);
                                }
                              );
                          }}
                        >
                          Confirmer l'identité de l'utilisateur
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          to={`/admin`}
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            dispatch(
                              updateExperience(experience._id, {
                                ...experience,
                                status: 'refused',
                                user: {...experience.user, falseIdentity: true, verif: false},
                              })
                            );
                            dispatch(
                              updateProfile(experience.user._id, {
                                ...experience.user,
                                verif: false,
                                falseIdentity: true,
                              })
                            );

                            dispatch(getExperiences());
                            emailjs
                              .send(
                                'service_bsjla9l',
                                'template_l8uxip3',
                                {
                                  to_name: experience.user.name,
                                  experience_title: experience.title,
                                  user_email: experience.user.email,
                                },
                                'user_IDL4u3gVEUJR2PbmpPSjH'
                              )
                              .then(
                                result => {
                                  console.log(result.text);
                                },
                                error => {
                                  console.log(error.text);
                                }
                              );
                          }}
                        >
                          Identité erronée
                        </Link>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <br />
                <div className="text-muted mt-2 mb-4">
                  <small>
                    {experience.type.title === 'en ligne' ? (
                      <i className="ni ni-laptop" />
                    ) : (
                      <i className="fas fa-users" />
                    )}
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
                </div>
                <Card className="bg-white border-1">
                  <CardHeader className="bg-white">
                    <Row className="icon-examples">
                      <Col lg="6" md="6">
                        <p>
                          {' '}
                          <i className="far fa-clock" style={{paddingRight: '3%'}} />
                          {experience.startHour} - {experience.endHour}
                        </p>
                      </Col>
                      <Col lg="6" md="6">
                        <p>
                          {' '}
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
                          <i style={{paddingRight: '3%'}} className="fas fa-wallet" />{' '}
                          {experience.price}TND
                        </p>
                      </Col>
                      <Col lg="6" md="6">
                        <p>
                          {' '}
                          <i className="fas fa-street-view" style={{paddingRight: '4%'}} />
                          {experience.target[0]} {'  '}
                          {experience.target[1] ? <span> et {experience.target[1]}</span> : ''}
                        </p>
                      </Col>
                      <Col lg="6" md="6">
                        <p>
                          {' '}
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
                    <small>{experience.themes}</small> <br />
                    <small>{experience.activity}</small>
                  </CardBody>
                </Card>
              </CardHeader>
              <CardBody className="px-lg-5">
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
                                {'   '} <i className="fas fa-wine-bottle" />{' '}
                                {experience.includedEq.drink}
                              </p>
                            ) : (
                              <></>
                            )}
                            {experience.includedEq.food ? (
                              <p>
                                {'   '} <i className="fas fa-utensils" />{' '}
                                {experience.includedEq.food}
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
                                {'   '} <i className="fas fa-wine-bottle" />{' '}
                                {experience.excludedEq.drink}
                              </p>
                            ) : (
                              <></>
                            )}
                            {experience.excludedEq.food ? (
                              <p>
                                {'   '} <i className="fas fa-utensils" />{' '}
                                {experience.excludedEq.food}
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
              <div class="px-lg-5" style={{padding: '2%'}}>
                <h4>Les photos</h4>

                <img
                  alt=""
                  className="border rounded"
                  src={experience.photo}
                  style={{height: '300px', width: '300px'}}
                />
                <img
                  alt=""
                  className="border rounded"
                  src={experience.photo2}
                  style={{height: '300px', width: '300px'}}
                />
                <img
                  alt=""
                  className="border rounded"
                  src={experience.photo3}
                  style={{height: '300px', width: '300px'}}
                />
              </div>
              <div></div>
            </Card>
          </Col>
        </div>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};
export default ExperienceDetailsAd;
