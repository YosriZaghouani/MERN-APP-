import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExperiences, getProfile, getUsers} from '../../JS/actions/index';
import CreatedExperienceAd from './CreatedExperienceAd';
import Loader from '../layout/Loader';
import {Redirect} from 'react-router';

import {Button, Card, CardHeader, Table, Row, Col} from 'reactstrap';

// core components

const CreatedExperienceListAd = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(state => state.experiencesReducers.experiences);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);

  useEffect(() => {
    dispatch(getExperiences());
    dispatch(getUsers());
    dispatch(getProfile());
  }, [dispatch]);

  return localStorage.getItem('token') ? (
    isLoading && loading ? (
      <Loader />
    ) : user && user.role === 'admin' ? (
      <>
        {/* Page content */}
        <Row>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Les expériences créées</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>

                    <th scope="col">Titre</th>
                    <th scope="col">Type</th>
                    <th scope="col">Activité</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {experiences &&
                    experiences.map(experience => (
                      <CreatedExperienceAd key={experience._id} experience={experience} />
                    ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default CreatedExperienceListAd;
