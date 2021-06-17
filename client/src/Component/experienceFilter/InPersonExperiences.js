import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExperiences, getProfile} from '../../JS/actions/index';
import Loader from '../layout/Loader';
import AuthNavbar from '../layout/AuthNavbar';
import Search from '../publishedExperience/Search';
import Header from '../publishedExperience/Header';
import PublicationBar from '../layout/PublicationBar';
import Publication from '../publishedExperience/Publication';
import {Row} from 'reactstrap';
const InPersonExperiences = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExperiences());
    dispatch(getProfile());
  }, [dispatch]);

  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experiences = useSelector(state => state.experiencesReducers.experiences);

  const loading = useSelector(state => state.userReducer.loading);
  const user = useSelector(state => state.userReducer.user);

  return isLoading && loading ? (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Loader />
    </>
  ) : user && experiences ? (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Row className="col-xl-12 justify-content-center m-0 p-0 mb-5">
        {experiences &&
          experiences.map(experience =>
            experience.status === 'published' && experience.type.title === 'en personne' ? (
              <Publication experience={experience} key={experience._id} />
            ) : (
              ''
            )
          )}
      </Row>
    </>
  ) : (
    ''
  );
};

export default InPersonExperiences;
