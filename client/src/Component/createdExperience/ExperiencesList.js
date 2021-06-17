import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExperiences, getProfile} from '../../JS/actions/index';
import Loader from '../layout/Loader';
import ExperienceModel from './ExperienceModel';
import {Container, Col, Row} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import SideBarTemplate from '../layout/SideBarTemplate';
import AuthNavbarExperience from '../layout/AuthNavbarExperience';
const ExperiencesList = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(state => state.experiencesReducers.experiences);
  const user = useSelector(state => state.userReducer.user);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const error = useSelector(state => state.experiences);
  const loading = useSelector(state => state.userReducer.loading);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(getExperiences());
    dispatch(getProfile());
  }, [dispatch, error]);

  return localStorage.getItem('token') ? (
    isLoading && loading ? (
      <>
        <AuthNavbarExperience />
        <SideBarTemplate />
        <Loader />
      </>
    ) : user && experiences ? (
      <>
        <AuthNavbarExperience />
        <SideBarTemplate />
        <div className="main-content mt-4">
          <Container fluid>
            <Col lg="12" md="10">
              <Row>
                <Col>
                  <h1 style={{color: '#32325d'}}>Vos expériences</h1>
                </Col>
                <Col>
                  <Link className="btn btn-info" to={`/create`} style={{float: 'right'}}>
                    Créer une expérience
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col lg="5" md="10">
              <Row className="icon-examples">
                <Col>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="created"
                      type="checkbox"
                      name="créées"
                    />
                    <label className="custom-control-label" htmlFor="created">
                      <small>créées</small>{' '}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="BeingValidated"
                      type="checkbox"
                      name="en cours"
                    />
                    <label className="custom-control-label" htmlFor="BeingValidated">
                      <small>en cours</small>{' '}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="accepted"
                      type="checkbox"
                      name="acceptée"
                    />
                    <label className="custom-control-label" htmlFor="accepted">
                      <small>acceptée</small>{' '}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="refused"
                      type="checkbox"
                      name="refusée"
                    />
                    <label className="custom-control-label" htmlFor="refused">
                      <small>refusée</small>{' '}
                    </label>
                  </div>
                </Col>
              </Row>
            </Col>
            <div className="header-body border" style={{padding: '2%', margin: '1%'}}>
              <div style={{backgroundColor: '#f8f9fe'}}>
                {experiences &&
                  experiences.map(experience =>
                    experience.userID === user._id ? (
                      <ExperienceModel key={experience._id} experience={experience} />
                    ) : (
                      <p></p>
                    )
                  )}
              </div>
            </div>
          </Container>
        </div>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default ExperiencesList;
