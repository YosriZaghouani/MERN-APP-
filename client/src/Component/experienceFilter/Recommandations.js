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
const Recommandations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExperiences());
    dispatch(getProfile());
  }, [dispatch]);

  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experiences = useSelector(state => state.experiencesReducers.experiences);

  const loading = useSelector(state => state.userReducer.loading);
  const user = useSelector(state => state.userReducer.user);
  const [userThemes, setUserThemes] = useState([]);
  const [userDifficulties, setUserDifficulties] = useState([]);
  const [userPhobies, setUserPhobies] = useState([]);
  const [themesArr, setThemesArr] = useState([]);
  var arr = [];
  useEffect(() => {
    if (user) {
      arr = user.myPreferences;
      arr.map(preference => {
        if (preference.themes) {
          setUserThemes([...preference.themes]);
        }
        if (preference.difficulty) {
          setUserDifficulties([...preference.difficulty]);
        }
        if (preference.phobies) {
          setUserPhobies([...preference.phobies]);
        }
      });
    }
  }, [user]);

  return isLoading && loading ? (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Loader />
    </>
  ) : user ? (
    <>
      <AuthNavbar />
      <Header />
      <Search />
      <PublicationBar />
      <Row className="col-xl-12 justify-content-center m-0 p-0 mb-5">
        {experiences &&
          experiences.map(
            experience =>
              experience.status === 'published' &&
              (userDifficulties.filter(el => el === experience.difficulty).length > 0 &&
              userThemes.some(val => experience.themes.indexOf(val) !== -1) &&
              userPhobies.some(val => experience.phobia.indexOf(val) !== -1) ? (
                <Publication experience={experience} key={experience._id} />
              ) : (
                ''
              ))
          )}
      </Row>
    </>
  ) : (
    ''
  );
};

export default Recommandations;
