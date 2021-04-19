import React, {useEffect, useState} from 'react';
// react component that copies the given text inside your clipboard
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {getProfile, seePreferences, addPreferences, updateProfile} from '../JS/actions';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// reactstrap components
import {Card, CardHeader, CardBody, Container, Row, Col} from 'reactstrap';
import Loader from './layout/Loader';
import AuthNavbar from './layout/AuthNavbar';


const Preferences = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);
  const themes = useSelector(state => state.userReducer.themes);
  const difficulties = useSelector(state => state.userReducer.difficulties);
  const phobies = useSelector(state => state.userReducer.phobies);
  const preferences = useSelector(state => state.userReducer.preferences);
  const [localPref, setlocalPref] = useState([]);
  // let arr = [];
  useEffect(() => {
    dispatch(getProfile());
    dispatch(seePreferences());
  }, [dispatch]);

  useEffect(() => {
    if (user) setlocalPref(preferences);
  }, [user]);

  return loading ? (
<Loader/>  ) : !localStorage.getItem('token') ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <AuthNavbar/>
      <Container className="mt-2 col-xl-7" fluid>
        {/* Table */}
        <h1 className="mb-3 text-info">Optimisez vos recherches et dites nous ce que vous préférez</h1>
        <b>
          Appuez sur les caractéristiques d'expériences que vous voulez voir plus que les autres
        </b>
        <hr />
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Les thémes</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map(el =>
                    el.themes.map(theme => {
                      return (
                        <Col lg="3" md="6">
                          {console.log(localPref)}
                            <button
                              className={`${
                                localPref.includes(theme._id) ? 'text-danger' : 'notClicked'
                              } btn-icon-clipboard `}
                              onClick={() =>
                                `${
                                  localPref.includes(theme._id)
                                    ? dispatch(
                                        updateProfile(user._id, {
                                          ...user,
                                          myPreferences: [...new Set(localPref)],
                                        })
                                      )
                                    : dispatch(addPreferences(user._id, theme._id))
                                }`
                              }
                              type="button"
                            >
                              <div>
                                <i className={theme.icon} />
                                <span>{theme.name}</span>
                              </div>
                            </button>
                        </Col>
                      );
                    })
                  )}
                </Row>
              </CardBody>
            </Card>
            <Card className="shadow mt-1">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">les niveaux de difficultés</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map(el =>
                    el.difficulties.map(difficulties => (
                      <Col lg="3" md="6">
                        <CopyToClipboard
                          text={'ni ni-active-40'}
                          // onCopy={() => setCopiedText("ni ni-active-40")}
                        >
                          <button className="btn-icon-clipboard" id="Sport" type="button">
                            <div>
                              <i className={difficulties.icon}/>
                              <span>{difficulties.name}</span>
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    ))
                  )}
                </Row>
              </CardBody>
            </Card>
            <Card className="shadow mt-1">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Si vous présentez des phobies, précisez les ici.</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {preferences.map(el =>
                    el.phobies.map(phobies => (
                      <Col lg="3" md="6">
                        <CopyToClipboard
                          text={'ni ni-active-40'}
                          // onCopy={() => setCopiedText("ni ni-active-40")}
                        >
                          <button className="btn-icon-clipboard" type="button">
                            <div>
                              <span>{phobies.name}</span>
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    ))
                  )}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      )
    </div>
  );
};

export default Preferences;
