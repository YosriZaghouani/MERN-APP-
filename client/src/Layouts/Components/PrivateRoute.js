import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Loader from '../../Component/layout/Loader';

const PrivateRoute = ({component: Component}, ...rest) => {
  const isAuthorized = useSelector(state => state.userReducer.isAuth);
  const isLoading = useSelector(state => state.userReducer.loading);
  return (
    <Route
      {...rest}
      render={props =>
        isLoading ? <Loader /> : isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
