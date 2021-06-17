import React, {useEffect, useState} from 'react';
import Loader from '../layout/Loader';

import {useDispatch, useSelector} from 'react-redux';
import {getExperienceDetails, updateExperience, getExperiences} from '../../JS/actions/index';
import {Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import AuthNavbar from '../layout/AuthNavbar';
import {Link, Redirect} from 'react-router-dom';
import Details from './Details';
import ShowSessions from './ShowSessions';
import ShowSessionsCreator from './ShowSessionsCreator';
const Publish = ({
  match: {
    params: {id},
  },
}) => {
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  return localStorage.getItem('token') ? (
    isLoading ? (
      <Loader />
    ) : experience ? (
      <>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Abandonner la publication ?</ModalHeader>
          <ModalBody>
            Si vous abandonner la publication, toutes les sessions choisies seront supprimées.
            Cependant, vous pouvez toujours publier votre expérience ultérierement.
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-success"
              onClick={e => {
                toggle();
              }}
            >
              Continuer
            </Button>

            <Link
              to="/experiences"
              className="btn btn-danger"
              color="secondary"
              onClick={() => {
                toggle();
                dispatch(
                  updateExperience(id, {
                    ...experience,
                    sessions: [],
                  })
                );
              }}
            >
              Abandonner la publication
            </Link>
          </ModalFooter>
        </Modal>
        <div>
          <AuthNavbar />
          <Row className="col-xl-12" style={{justifyContent: 'center'}}>
            <Col xl="8">
              <Details experience={experience} />
            </Col>
            <Col xl="3">
              <ShowSessionsCreator experience={experience} />
              <Row className="col-xl-12 m-0 justify-content-center">
                <Link
                  to="/experiences"
                  className="mt-2 col-xl-5 btn btn-success"
                  onClick={() => {
                    dispatch(
                      updateExperience(id, {
                        ...experience,
                        status: 'published',
                      })
                    );
                  }}
                >
                  Publier
                </Link>
                <Button
                  className="btn mt-2 btn-danger col-xl-5"
                  onClick={() => {
                    toggle();
                  }}
                >
                  Abandonner
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
