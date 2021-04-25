import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './layout/Loader';
import {Col, Row, CardTitle} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {getProfile} from '../JS/actions';
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : user && user.role === 'admin' ? (
    <Redirect to="/admin" />
  ) : (
    <>
      {' '}
      <Col lg="12" md="10">
        <Row>
          <Col lg="5">
            <img
              alt="..."
              src={require('../Assets/img/brand/creator4.png').default}
              style={{width: '80%'}}
            />
          </Col>
          <Col lg="7">
            <Link>
              <CardTitle tag="h1" className=" mb-0 mt-9">
                Vivre des expériences créées par <br /> des tunisiens passionnées ?
              </CardTitle>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col lg="12" md="10">
        <Row>
          <Col lg="7">
            <Link to="/creator">
              <CardTitle tag="h1" className=" mb-0 mt-8 ml-7">
                Proposer une initiation, un cours,
                <br /> un atelier, un workshop ?
              </CardTitle>
            </Link>
          </Col>

          <Col lg="5">
            <img
              alt="..."
              src={require('../Assets/img/brand/creator3.png').default}
              style={{width: '80%'}}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Home;
