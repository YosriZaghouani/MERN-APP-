import React, {useEffect, useState} from 'react';
import {enGB} from 'date-fns/locale';
import {Calendar} from 'react-nice-dates';
import {isSameDay} from 'date-fns';
import 'react-nice-dates/build/style.css';
import '../../session.css';
import {Col} from 'reactstrap';
import AuthNavbar from '../../../layout/AuthNavbar';
import {useDispatch, useSelector} from 'react-redux';
import {getExperienceDetails, addSession} from '../../../../JS/actions/index';
import {Link} from 'react-router-dom';
import Loader from '../../../layout/Loader';
import SessionHeader from './SessionHeader';

const Session = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const experience = useSelector(state => state.experiencesReducers.experience);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);

  //to stock the experience's sessions that alreday exists ( the object )
  const [experienceSessions, setExperienceSessions] = useState([]);
  // to stock sessions's start date (déroulement) only (sessions that already exists in the experience)
  const [experienceSessionsDate, setExperienceSessionsDate] = useState([]);

  //selectedSessions to push the new selected sessions on it
  const [selectedSessions, setSelectedSessions] = useState([]);

  const today = new Date();
  const todayCopy = new Date();
  const todayCopy1 = new Date();
  const todayCopy2 = new Date();

  var arr = [];
  var newSessions = [];

  // sevenDays is created to be mapped in modifiers object
  const [sevenDays, setSevenDays] = useState([]);
  // two days is created to be mapped in modfiers object
  const [twoDays, setTwoDays] = useState([]);
  // two days is created to be mapped in modfiers object
  const [twoDays2, setTwoDays2] = useState([]);
  // two days is created to be mapped in modfiers object
  const [twoDays3, setTwoDays3] = useState([]);

  //dateAfter7Days is created to disable the 7 days of promotion
  const dateAfter7Days = new Date();
  new Date(dateAfter7Days.setDate(dateAfter7Days.getDate() + 7));

  //********session 1 */
  // start day of session one ( today +11)
  const sessionOneDay = new Date();
  new Date(sessionOneDay.setDate(todayCopy.getDate() + 10));

  //******session 2 */
  //start day of session two
  const sessionTwoDay = new Date();
  new Date(sessionTwoDay.setDate(todayCopy1.getDate() + 16));

  //******session 3 */
  //start day of session three
  const sessionThreeDay = new Date();
  new Date(sessionThreeDay.setDate(todayCopy1.getDate() + 22));

  //initialize an empty array to push on it the days between
  const dateArray = [];
  //initialize an empty array to push on it the 2 days between 2 sessions (first and second session)
  const daysBetween = [];
  //initialize an empty array to push on it the 2 days between 2 sessions(second and third session)
  const daysBetween2 = [];

  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (experience) {
      setExperienceSessions([...experience.sessions]);
    }
  }, [experience]);

  useEffect(() => {
    if (experience) {
      experienceSessions.map(session => {
        arr.push(session.sessionDate);
        setExperienceSessionsDate(arr);
      });
    }
  }, [experienceSessions]);

  //create the 7 days of promotion
  useEffect(() => {
    while (today < dateAfter7Days) {
      dateArray.push(new Date(today));
      new Date(today.setDate(today.getDate() + 1));
    }
    setSevenDays([...dateArray]);
  }, []);

  //create the two days between the first and the second session
  useEffect(() => {
    new Date(sessionOneDay.setDate(sessionOneDay.getDate() + 1));
    for (var i = 0; i < 2; i++) {
      daysBetween.push(new Date(sessionOneDay));
      new Date(sessionOneDay.setDate(sessionOneDay.getDate() + 1));
    }
    setTwoDays([...daysBetween]);
  }, []);

  //create the two days between the second and the third session
  useEffect(() => {
    new Date(sessionTwoDay.setDate(sessionTwoDay.getDate() + 1));
    for (var i = 0; i < 2; i++) {
      daysBetween2.push(new Date(sessionTwoDay));
      new Date(sessionTwoDay.setDate(sessionTwoDay.getDate() + 1));
    }
    setTwoDays2([...daysBetween2]);
  }, []);

  //create the two days between the third and the fourth session
  useEffect(() => {
    new Date(sessionThreeDay.setDate(sessionThreeDay.getDate() + 1));
    for (var i = 0; i < 2; i++) {
      daysBetween2.push(new Date(sessionThreeDay));
      new Date(sessionThreeDay.setDate(sessionThreeDay.getDate() + 1));
    }
    setTwoDays3([...daysBetween2]);
  }, []);

  const modifiers = {
    disabled: date =>
      sevenDays.some(sevenDays => isSameDay(sevenDays, date)) ||
      twoDays.some(twoDays => isSameDay(twoDays, date)) ||
      twoDays2.some(twoDays2 => isSameDay(twoDays2, date)) ||
      twoDays3.some(twoDays3 => isSameDay(twoDays3, date)) ||
      experienceSessionsDate.includes(date.toDateString()) ||
      date < todayCopy2,
    selected: date =>
      isSameDay(sessionOneDay, date) ||
      isSameDay(sessionTwoDay, date) ||
      isSameDay(sessionThreeDay, date),
  };
  const modifiersClassNames = {
    selected: '-selected',
  };

  const handleDayClick = date => {
    const paymentLimit = new Date(date);
    const lunchLimit = new Date(date);
    const restDay = new Date(date);

    selectedSessions.push({
      sessionDate: date.toDateString(),
      launchLimit: new Date(lunchLimit.setDate(lunchLimit.getDate() - 3)).toDateString(),
      paymentLimit: new Date(paymentLimit.setDate(paymentLimit.getDate() - 2)).toDateString(),
      restDate: new Date(restDay.setDate(restDay.getDate() - 1)).toDateString(),
      experienceId: id,
      isLaunched: false,
      reservationDemand: [],
    });
    setSelectedSessions(selectedSessions);
    newSessions = [...new Set([...selectedSessions])];
    console.log([...newSessions]);
  };

  return isLoading ? (
    <>
      <AuthNavbar />
      <SessionHeader />
      <Loader />
    </>
  ) : (
    <>
      <AuthNavbar />
      <SessionHeader />
      <Col xl="6" className="center m-2 mb-5">
        <Calendar
          onDayClick={handleDayClick}
          locale={enGB}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
        <Link
          to={experienceSessions.length === 0 ? `/handle/${id}` : `/people/${id}`}
          className="btn btn-success m-2"
          onClick={() => {
            newSessions.map(el => {
              dispatch(addSession(el));
            });
          }}
        >
          {experienceSessions.length === 0 ? 'Continuer' : 'Ajouter la session'}
        </Link>
      </Col>
    </>
  );
};
export default Session;