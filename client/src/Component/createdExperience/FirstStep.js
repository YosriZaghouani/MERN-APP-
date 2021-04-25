import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Advice from '../layout/Advice';

import {useDispatch, useSelector} from 'react-redux';
import {
  addExperience,
  deleteExperience,
  getExperienceDetails,
  getExperiences,
  getProfile,
  updateExperience,
} from '../../JS/actions/index';
import {Link} from 'react-router-dom';
import Loader from '../layout/Loader';
import {createNewExperience} from '../../JS/actions';
import CardBase from '../SharedComponent/CardBase/CardBase';
import ModalBase from '../SharedComponent/ModalBase/ModalBase';

const FirstStep = () => {
  const [type, setType] = useState('en ligne');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const experience = useSelector(state => state.experiencesReducers.experience);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);

  console.log(experience);
  useEffect(() => {
    dispatch(getProfile());
    if (user) dispatch(addExperience({type: {title: type}, userID: user._id}));
  }, [dispatch]);

  return localStorage.getItem('token') && isLoading ? (
    <Loader />
  ) : experience ? (
    <>
      <div style={{backgroundColor: '#f8f9fe'}}>
        <Advice />

        <div className="main-content">
          <Container fluid>
            <div>
              <div className="text-center">1 de 6</div>
              <Progress style={{height: '21px'}} value="15">
                20%
              </Progress>
            </div>
            <div className="header-body border-0" style={{padding: '2%', margin: '1%'}}>
              <Button
                onClick={toggle}
                style={{
                  padding: '0.5% 0.5% 0%',
                  float: 'right',
                }}
              >
                <i className="ni ni-fat-remove" />
              </Button>
              <ModalBase
                isOpen={modal}
                toggle={toggle}
                title="Abandonner la création ?"
                linkedAddress="/experience"
              >
                Si vous abandonner la création, vous perderz toutes les informations saisies.
              </ModalBase>
              <Col lg="5" md="10">
                <h2 style={{color: '#32325d'}}>
                  <i className="fas fa-users-cog" style={{padding: '2%'}} />
                  Le type de l'expérience
                </h2>
              </Col>

              <Row>
                {/* first card online experience */}
                <Col lg="6" xl="5">
                  <CardBase
                    title="Les personnes participent en ligne à travers Zoom"
                    cardIcon="ni ni-laptop"
                  >
                    <Row>
                      <button
                        className="btn-icon-clipboard"
                        style={
                          type === 'en ligne'
                            ? {
                                backgroundColor: 'white',
                                boxShadow:
                                  'rgb(0 0 0 / 10%) 0px 0px 0px 1px, rgb(0 0 0 / 10%) 0px 4px 16px',
                              }
                            : {}
                        }
                        id="tooltip982655500"
                        type="button"
                        onClick={() => setType('en ligne')}
                      >
                        <div>
                          <i className="ni ni-active-40" />
                          <span className="font-weight-bold" style={{color: '#32325d'}}>
                            En ligne
                          </span>
                        </div>
                      </button>
                    </Row>
                    <Row>
                      <CardBase title="De quoi as-tu besoin ?">
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Un bon éclairage
                        </span>
                        <br />
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Une connexion internet
                        </span>
                        <br />
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Un son clair
                        </span>
                      </CardBase>
                    </Row>
                  </CardBase>
                </Col>
                {/* second onsite experience */}
                <Col lg="6" xl="5">
                  <CardBase title="Les personnes participent en présentiel" cardIcon="fas fa-users">
                    <Row>
                      <button
                        className="btn-icon-clipboard"
                        style={
                          type === 'en personne'
                            ? {
                                backgroundColor: 'white',
                                boxShadow:
                                  'rgb(0 0 0 / 10%) 0px 0px 0px 1px, rgb(0 0 0 / 10%) 0px 4px 16px',
                              }
                            : {}
                        }
                        id="tooltip982655500"
                        type="button"
                        onClick={() => setType('en personne')}
                      >
                        <div>
                          <i className="ni ni-active-40" />
                          <span className="font-weight-bold" style={{color: '#32325d'}}>
                            En personne
                          </span>
                        </div>
                      </button>
                    </Row>
                    <Row>
                      <CardBase title="De quoi as-tu besoin ?">
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Savoir établir des liens
                        </span>
                        <br />
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Un accueil de qualité
                        </span>
                        <br />
                        <span className="text-nowrap">
                          <i className="ni ni-bold-right" />
                          Un sens d'organisation
                        </span>
                      </CardBase>
                    </Row>
                  </CardBase>
                </Col>
              </Row>
              <div>
                {experience ? (
                  <Link
                    to={`/second/${experience.experience._id}`}
                    className="btn btn-primary mt-4"
                    onClick={() => {
                      dispatch(createNewExperience({type}));
                      console.log(experience);
                      if (loading === false && user) {
                        dispatch(getExperienceDetails(experience.experience._id));
                        dispatch(
                          updateExperience(experience.experience._id, {
                            ...experience,
                            type: {title: type},
                          })
                        );
                      }

                      console.log(experience);
                    }}
                  >
                    Suivant
                  </Link>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  ) : (
    <p></p>
  );
};

export default FirstStep;
