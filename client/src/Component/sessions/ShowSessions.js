import React, {useEffect, useState} from 'react';
import {Button, Card, CardHeader, CardBody, Row, Col} from 'reactstrap';
import {getProfile, updateExperience} from '../../JS/actions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../layout/Loader';
import AskForReservation from '../Reservation/AskForReservation';

const ShowSessions = ({experience}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const loading = useSelector(state => state.userReducer.loading);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : user ? (
    <>
      <Card className="bg-white shadow border mt-6">
        <CardHeader className="bg-white text-center">
          <b>Les sessions disponibles</b>
        </CardHeader>
        <span className="mt-2 text-center" style={{fontWeight: 'bold'}}>
          {experience.price} TND <small>Par personne</small>
        </span>
        <CardBody>
          <Card className="bg-white border-0 rounded overflow-auto">
            {experience.sessions.map((el, index) => (
              <CardBody className="bg-white border rounded mb-1">
                <Row>
                  <Col>
                    <p className="text-info" style={{fontWeight: 'bold'}}>
                      Session {index + 1}
                    </p>
                  </Col>
                </Row>
                <p>
                  <span style={{fontWeight: 'bold'}}> La date limite de paiement</span>
                  <br />
                  {new Date(el.paymentLimit).toLocaleDateString('fr-EG', options)}
                </p>
                <p>
                  <span style={{fontWeight: 'bold'}}> La date de déroulement </span>
                  <br />
                  {new Date(el.sessionDate).toLocaleDateString('fr-EG', options)}
                </p>
                {el.isLaunched ? (
                  <AskForReservation experience={experience} el={el} user={user} />
                ) : el.peopleInterrested.filter(e => e.userId === user._id).length > 0 ? (
                  <Button
                    className="text-info"
                    size="sm"
                    onClick={() => {
                      const arr = el.peopleInterrested.filter(e => e.userId !== user._id);
                      el.peopleInterrested = arr;
                      dispatch(updateExperience(experience._id, {...experience}));
                    }}
                  >
                    Ne plus s'intéresser
                  </Button>
                ) : (
                  <Button
                    className="btn-info"
                    size="sm"
                    onClick={() => {
                      el.peopleInterrested.push({
                        userId: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userNumber: user.tel,
                      });
                      dispatch(updateExperience(experience._id, {...experience}));
                    }}
                  >
                    S'intéresser
                  </Button>
                )}
              </CardBody>
            ))}
          </Card>
        </CardBody>
      </Card>
    </>
  ) : (
    <></>
  );
};

export default ShowSessions;
