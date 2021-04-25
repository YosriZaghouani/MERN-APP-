import React, {useState} from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  CardText,
  CardLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteExperience, getExperiences, updateExperience} from '../../JS/actions/index';
const ExperienceModel = ({experience}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Row>
      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Supprimer l'expérience?</ModalHeader>
        <ModalBody>Etes vous sur de supprimer l'expérience?</ModalBody>
        <ModalFooter>
          <Link
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteExperience(experience._id));
              toggle();
              dispatch(getExperiences());
            }}
            to={`/experiences`}
          >
            Supprimer
          </Link>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      {/* endModal */}
      <Col lg="6" xl="6" style={{marginBottom: '1%'}}>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                {experience.status === 'created' ? (
                  <>
                    <small>
                      <i className="fas fa-circle" style={{paddingRight: '2%'}} />
                      Créée
                    </small>
                    ​<CardText>{experience.title}</CardText>
                    <Row>
                      <Col xl="2">
                        <Link
                          to={`/first/${experience._id}`}
                          className="btn btn-sm btn-outline-secondary"
                          style={{
                            color: '#525f7f',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                            border: '0px white',
                          }}
                        >
                          <small>Modifier</small>
                        </Link>
                      </Col>
                      <Col xl="4">
                        <Link
                          style={{
                            color: '#525f7f',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                            border: '0px white',
                          }}
                          to={`/experience/${experience._id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <small>Demander la validation</small>
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          onClick={() => {
                            toggle();
                          }}
                          to={`/experiences`}
                          className="btn btn-sm btn-outline-secondary"
                          style={{
                            color: '#525f7f',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                            border: '0px white',
                          }}
                        >
                          <small>Supprimer</small>
                        </Link>
                      </Col>
                    </Row>
                    <hr style={{margin: '1%'}} />
                    <Link
                      to={`/experiences`}
                      className="btn btn-sm btn-outline-secondary"
                      style={{
                        color: '#525f7f',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                        border: '0px white',
                      }}
                    >
                      <i className="fas fa-mouse-pointer" />
                      <small>
                        Consulter des outils pour vous aider à créer efficacement votre expérience
                      </small>
                    </Link>
                  </>
                ) : experience.status === 'beingValidated' ? (
                  <>
                    <small>
                      <i
                        className="fas fa-circle"
                        style={{paddingRight: '2%', color: '#ffd600 '}}
                      />
                      En cours de validation
                    </small>
                    <CardText>{experience.title}</CardText>
                    <hr style={{margin: '1%'}} />
                    <Row>
                      <Link
                        to={`/experience/${experience._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          color: '#525f7f',
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <i className="fas fa-mouse-pointer" />
                        <small>
                          L'expérience est en cours de validation, vous pouvez seulement la
                          consulter.
                        </small>
                      </Link>
                    </Row>
                  </>
                ) : experience.status === 'accepted' ? (
                  <>
                    <small>
                      {' '}
                      <i className="fas fa-circle" style={{paddingRight: '2%', color: '#2dce89'}} />
                      Acceptée
                    </small>
                    <CardText>{experience.title}</CardText>
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        to={`/publish/${experience._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <small>Publier</small>
                      </Link>
                    </CardLink>
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        onClick={() => {
                          toggle();
                        }}
                        to={`/experiences`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <small>Supprimer</small>
                      </Link>
                    </CardLink>
                    <hr style={{margin: '1%'}} />
                    <Link
                      to={`/experience/${experience._id}`}
                      className="btn btn-sm btn-outline-secondary"
                      style={{
                        color: '#525f7f',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                        border: '0px white',
                      }}
                    >
                      <i className="fas fa-mouse-pointer" />
                      <small>Demander une modification </small>
                    </Link>
                  </>
                ) : experience.status === 'contentValidated' ? (
                  <>
                    <small>
                      <i
                        className="fas fa-user-clock"
                        style={{paddingRight: '2%', color: '#ffd600'}}
                      />
                      En cours de vérification du profile
                    </small>
                    <CardText>{experience.title}</CardText>
                    <hr style={{margin: '1%'}} />
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        to={`/experience/${experience._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          color: '#525f7f',
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <i className="fas fa-mouse-pointer" />
                        <small>
                          L'expérience est en cours de validation, vous pouvez seulement la
                          consulter.
                        </small>
                      </Link>
                    </CardLink>
                  </>
                ) : (
                  <>
                    <small>
                      <i className="fas fa-circle" style={{paddingRight: '2%', color: '#f5365c'}} />
                      Refusée
                    </small>
                    ​<CardText>{experience.title}</CardText>
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        to={`/first/${experience._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <small>Modifier</small>
                      </Link>
                    </CardLink>
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        to={`/experience/${experience._id}`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <small>Redemander la validation</small>
                      </Link>
                    </CardLink>
                    <CardLink href="#" style={{color: '#f5365c '}}>
                      <Link
                        onClick={() => {
                          toggle();
                        }}
                        to={`/experiences`}
                        className="btn btn-sm btn-outline-secondary"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px white, 0 0px 0px rgb(0 0 0 / 0%)',
                          border: '0px white',
                        }}
                      >
                        <small>Supprimer</small>
                      </Link>
                    </CardLink>
                  </>
                )}
              </div>
              <Col className="col-auto">
                {experience.type.title === 'en ligne' ? (
                  <i className="ni ni-laptop" />
                ) : (
                  <i className="fas fa-users" />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default ExperienceModel;
