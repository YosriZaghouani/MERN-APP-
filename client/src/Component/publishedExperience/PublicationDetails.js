import React, {useEffect} from 'react';
import {getExperienceDetails} from '../../JS/actions';
import {Button, Col, Row} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import Details from '../sessions/Details';
import Loader from '../layout/Loader';
import AuthNavbar from '../layout/AuthNavbar';

import ShowSessions from '../sessions/ShowSessions';
import {Link} from 'react-router-dom';
const PublicationDetails = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);

  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : experience ? (
    <>
      <AuthNavbar />

      <Row className="col-xl-12" style={{justifyContent: 'center'}}>
        <Col xl="8" className="m-2">
          <Link className="btn btn-secondary m-2" to="/explore">
            <i className="fas fa-arrow-left" /> plus d'expériences
          </Link>

          <Details experience={experience} />
        </Col>
        <Col xl="3">
          <ShowSessions experience={experience} />
        </Col>
      </Row>
    </>
  ) : (
    <p></p>
  );
};

export default PublicationDetails;
