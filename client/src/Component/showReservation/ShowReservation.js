import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getExperiences, getProfile} from '../../JS/actions/index';
import Loader from '../layout/Loader';
import {Container} from 'reactstrap';
import SideBarTemplate from '../layout/SideBarTemplate';
import AuthNavbarExperience from '../layout/AuthNavbarExperience';
import ReservationTemplate from './ReservationTemplate';
const ShowReservation = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(state => state.experiencesReducers.experiences);
  const user = useSelector(state => state.userReducer.user);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const error = useSelector(state => state.experiences);
  const loading = useSelector(state => state.userReducer.loading);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(getExperiences());
    dispatch(getProfile());
  }, [dispatch, error]);

  return isLoading && loading ? (
    <>
      <AuthNavbarExperience />
      <SideBarTemplate />
      <Loader />
    </>
  ) : user ? (
    <>
      <AuthNavbarExperience />
      <SideBarTemplate />
      <div className="main-content mt-4">
        <Container fluid>
          <h1>Vos réservations</h1>
          <div className="header-body border p-3 m-1">
            <div style={{backgroundColor: '#f8f9fe'}}>
              {experiences &&
                experiences.map(experience =>
                  experience.sessions.map(session =>
                    session.reservationDemand.map(reservation =>
                      reservation.userId === user._id ? (
                        <ReservationTemplate
                          key={experience._id}
                          experience={experience}
                          session={session}
                          reservation={reservation}
                        />
                      ) : (
                        <></>
                      )
                    )
                  )
                )}
            </div>
          </div>
        </Container>
      </div>
    </>
  ) : (
    <p></p>
  );
};

export default ShowReservation;
