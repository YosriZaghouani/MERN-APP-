import React, {useEffect} from 'react';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';
import {getProfile} from '../../JS/actions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../layout/Loader';

const ShowSessionsCreator = ({experience}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
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
                    <p>
                      <span className="text-info" style={{fontWeight: 'bold'}}>
                        Session {index + 1}
                      </span>
                      {el.isLaunched ? (
                        <span className="float-right"> Lancée</span>
                      ) : (
                        <span className="float-right"> Pas encore lancée</span>
                      )}
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

export default ShowSessionsCreator;
