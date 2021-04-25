import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import AuthNavbar from '../Component/layout/AuthNavbar';
import Footer from '../Component/layout/Footer';

const WithLayout = ({children}) => {
  const isAuth = useSelector(state => state.userReducer.isAuth);
  return (
    <div className="main-content">
      <div className="header bg-white py-7 py-lg-6">
        <AuthNavbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

WithLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithLayout;
