import React, {useEffect, useState} from 'react';

import {getProfile, seePreferences, updateProfile} from '../../JS/actions';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// reactstrap components
import {Container, Row, Button} from 'reactstrap';
import Loader from '../layout/Loader';
import AuthNavbar from '../layout/AuthNavbar';
import Themes from './Themes';
import Difficulty from './Difficulty';
import Phobies from './Phobies';

const Preferences = () => {
  const dispatch = useDispatch();
  const [tselected, setTselected] = useState([]);
  const [dselected, setDselected] = useState([]);
  const [pselected, setPselected] = useState([]);

  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);
  const preferences = useSelector(state => state.userReducer.preferences);

  const [localPref, setlocalPref] = useState([]);

  var arr = [];
  useEffect(() => {
    dispatch(getProfile());
    dispatch(seePreferences());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setlocalPref(preferences);
      arr = user.myPreferences;
      arr.map(el => {
        if (el.themes) {
          setTselected([...el.themes]);
        }
        if (el.difficulty) {
          setDselected([...el.difficulty]);
        }
        if (el.phobies) {
          setPselected([...el.phobies]);
        }
      });
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : !localStorage.getItem('token') ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <AuthNavbar />
      <Container className="mt-2 col-xl-7" fluid>
        {/* Table */}
        <h1 className="mb-3 text-info">
          Optimisez vos recherches et dites nous ce que vous préférez
        </h1>
        <b>
          Appuez sur les caractéristiques d'expériences que vous voulez voir plus que les autres
        </b>
        <hr />
        <Row>
          <div className="col">
            <Themes
              user={user}
              preferences={preferences}
              tselected={tselected}
              setTselected={setTselected}
            />
            <Difficulty
              preferences={preferences}
              dselected={dselected}
              setDselected={setDselected}
            />
            <Phobies preferences={preferences} pselected={pselected} setPselected={setPselected} />
            <Button
              className="float-right mt-2 btn-info"
              onClick={() => {
                user.myPreferences = [
                  {difficulty: [...dselected]},
                  {themes: [...tselected]},
                  {phobies: [...pselected]},
                ];
                dispatch(updateProfile(user._id, {...user}));
              }}
            >
              Ajouter mes préferences
            </Button>
          </div>
        </Row>
      </Container>
      )
    </div>
  );
};

export default Preferences;
