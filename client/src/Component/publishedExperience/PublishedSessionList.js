import React, {useEffect} from 'react';
import {Card, CardBody, Row} from 'reactstrap';
import {getExperienceDetails} from '../../JS/actions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../layout/Loader';
import PublishedSession from './PublishedSession';
import AuthNavbar from '../layout/AuthNavbar';

const PublishedSessionList = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const experience = useSelector(state => state.experiencesReducers.experience);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);

  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    experience &&
      experience.sessions.map((el, index) => {
        if (new Date(el.sessionDate) <= new Date()) console.log(el.sessionDate);
      });
  }, [experience]);

  return isLoading ? (
    <Loader />
  ) : experience ? (
    <>
      <AuthNavbar />
      <Card className="bg-transparent border-0 mt-4">
        <CardBody>
          <h1 className="text-center">Les sessions de "{experience.title}"</h1>
          <Row className="col-xl-12 justify-content-center">
            {experience.sessions.map((el, index) => (
              <PublishedSession experience={experience} el={el} index={index} />
            ))}
          </Row>
        </CardBody>
      </Card>
    </>
  ) : (
    <></>
  );
};

export default PublishedSessionList;
