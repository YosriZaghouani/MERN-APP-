import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExperiences} from '../../JS/actions/index';
import {Row} from 'reactstrap';
import Loader from '../layout/Loader';
import AuthNavbar from '../layout/AuthNavbar';
import Publication from './Publication';
import Search from './Search';
import Header from './Header';
import PublicationBar from '../layout/PublicationBar';

const Publications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExperiences());
  }, [dispatch]);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experiences = useSelector(state => state.experiencesReducers.experiences);

  return isLoading ? (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Loader />
    </>
  ) : (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Row className="col-xl-12 justify-content-center m-0 p-0 mb-5">
        {experiences &&
          experiences.map(experience =>
            experience.status === 'published' ? (
              <Publication experience={experience} key={experience._id} />
            ) : (
              ''
            )
          )}
      </Row>
    </>
  );
};

export default Publications;
