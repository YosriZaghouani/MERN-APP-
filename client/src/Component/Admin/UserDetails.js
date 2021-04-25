import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, getExperiences} from '../../JS/actions/index';
import {Card, CardBody, Row, CardTitle, Col, Button} from 'reactstrap';
import Loader from '../layout/Loader';
import AuthNavbar from '../layout/AuthNavbar';

import {Link} from 'react-router-dom';
import UserExperienceModel from './UserExperienceModel';

const UserDetails = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getExperiences());
  }, [dispatch, id]);
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);
  const experiences = useSelector(state => state.experiencesReducers.experiences);
  const profile = [
    {label: 'Nom et prénom', value: user.name},
    {
      label: 'Date de naissance',
      value: user.birthday ? user.birthday.substr(0, 10) : <small>-</small>,
    },
    {label: 'Téléphone', value: user.phoneNumber},
    {label: 'addresse email', value: user.email},
    {
      label: 'addresse postale',
      value: user.city && user.address ? user.city + ', ' + user.address : <small>-</small>,
    },
    {
      label: 'Description',
      value: user.aboutMe ? user.aboutMe : <small>-</small>,
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthNavbar />
      <Col lg="7" md="8" className="center mt-2">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody className="mb-0">
            <Row>
              <div className="col">
                <Button size="sm" className="btn-info" tag={Link} to="/admin">
                  Retourner
                </Button>
              </div>
              <div className="col">
                <Button size="sm" className="btn-info">
                  Contacter l'utilisateur{' '}
                </Button>
              </div>
              <div className="col">
                <Button size="sm" className="btn-info">
                  Signaler l'utilisateur
                </Button>
              </div>
            </Row>
          </CardBody>
          <hr className="m-0" />
          <CardBody>
            <h4>Les informations personnelles</h4>
            <Row>
              <div>
                <Row>
                  {profile.map(el => (
                    <>
                      <Col xl="4">
                        <small style={{color: '#32325d'}}>
                          <b>{el.label}</b>
                        </small>
                      </Col>
                      <Col xl="8">
                        <small>{el.value}</small>
                      </Col>
                    </>
                  ))}
                </Row>
              </div>
            </Row>
          </CardBody>
          <hr className="m-0" />
          <CardBody>
            <h4>L'activité de l'utilisateur</h4>

            {experiences &&
              experiences.map(experience =>
                experience.userID === id ? (
                  <UserExperienceModel key={experience._id} experience={experience} />
                ) : (
                  <p></p>
                )
              )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default UserDetails;
