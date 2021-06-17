import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Table,
  CustomInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import {getExperienceDetails, updateExperience} from '../../JS/actions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../layout/Loader';
import {Link} from 'react-router-dom';

const HandleSessions = ({
  match: {
    params: {id},
  },
}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const dispatch = useDispatch();
  const experience = useSelector(state => state.experiencesReducers.experience);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);

  return isLoading ? (
    <Loader />
  ) : experience ? (
    <>
      <Card className="bg-transparent border-0 mt-4">
        <CardBody>
          <h1 className="text-center">Les sessions sélectionnées</h1>
          <Row className="col-xl-12 justify-content-center">
            {experience.sessions.map((el, index) => (
              <>
                <Card className=" col-xl-8 bg-secondary border-0 rounded overflow-auto">
                  <CardBody className="bg-white border rounded mb-1 ">
                    <p>
                      <span className="text-info" style={{fontWeight: 'bold'}}>
                        Session {index + 1}
                      </span>
                      <span>
                        <button className="float-right bg-transparent border-0" onClick={toggle}>
                          <i className="far fa-trash-alt text-danger " />
                        </button>
                      </span>
                    </p>

                    <p>
                      <CustomInput
                        type="switch"
                        id={index}
                        name="customSwitch"
                        label="Lancer la session"
                        checked={el.isLaunched}
                        onChange={e => {
                          e.target.checked ? (el.isLaunched = true) : (el.isLaunched = false);
                          {
                            el.isLaunched
                              ? (el.launchDate = new Date().toDateString())
                              : (el.launchDate = null);
                          }
                          dispatch(updateExperience(id, {...experience}));
                        }}
                      />
                    </p>
                    <Table bordered>
                      <tr>
                        <th className="text-center">
                          <i className="fas fa-rocket text-danger" />
                          Limite de lancement
                        </th>
                        <th className="text-center">
                          <i className="fas fa-credit-card text-info" />
                          Limite de paiement
                        </th>
                        <th className="text-center">
                          <i className="fas fa-battery-full text-success" />
                          Jour de repos
                        </th>
                        <th>
                          <i className="fas fa-bell text-yellow" />
                          Jour de déroulement
                        </th>
                      </tr>
                      <tr>
                        <td>{new Date(el.launchLimit).toLocaleDateString('fr-EG', options)}</td>
                        <td>{new Date(el.paymentLimit).toLocaleDateString('fr-EG', options)}</td>

                        <td>{new Date(el.restDate).toLocaleDateString('fr-EG', options)}</td>
                        <td>{new Date(el.sessionDate).toLocaleDateString('fr-EG', options)}</td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Supprimer la session?</ModalHeader>
                  <ModalBody>Vous etes sur de supprimer cette session ?</ModalBody>
                  <ModalFooter>
                    <Button
                      className="btn btn-danger"
                      onClick={e => {
                        toggle();
                        const arr = experience.sessions.filter(e => e._id !== el._id);
                        experience.sessions = arr;
                        dispatch(updateExperience(experience._id, {...experience}));
                      }}
                    >
                      Supprimer
                    </Button>

                    <Button color="secondary" onClick={toggle}>
                      Abandonner
                    </Button>
                  </ModalFooter>
                </Modal>
              </>
            ))}
          </Row>
        </CardBody>
      </Card>
      <Link to={`/publication/${id}`} className="btn btn-success mb-3 mr-7 float-right">
        Terminer
      </Link>
    </>
  ) : (
    <></>
  );
};

export default HandleSessions;
