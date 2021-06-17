import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../JS/actions/index';
import Loader from '../layout/Loader';

const Payment = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : user ? (
    <>
      <h1>Payment component</h1>
      <h>{user.name}</h>
    </>
  ) : (
    <p></p>
  );
};

export default Payment;
