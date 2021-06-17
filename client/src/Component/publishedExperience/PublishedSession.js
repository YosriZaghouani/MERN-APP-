import React, {useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from 'reactstrap';
import {useDispatch} from 'react-redux';
import PeopleInterested from './PeopleInterested';
import {updateExperience} from '../../JS/actions';
import PeopleReserved from '../Reservation/PeopleReserved';
import emailjs from 'emailjs-com';
import ReservationDemand from '../reservationDemand/ReservationDemand';
import CancelSession from './CancelSession';

const PublishedSession = ({experience, el, index}) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Lancer la session?</ModalHeader>
        <ModalBody>êtes-vous sûr de vouloir lancer cette session ?</ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-success"
            onClick={e => {
              toggle();
              el.isLaunched = true;
              el.launchDate = new Date().toDateString();
              dispatch(updateExperience(experience._id, {...experience}));
              el.peopleInterrested.map((e, index) =>
                emailjs
                  .send(
                    'service_ltodfa4',
                    'template_aezy7w2',
                    {
                      sessionDate: new Date(el.sessionDate).toLocaleDateString('fr-EG', options),
                      to_name: e.userName,
                      experience_title: experience.title,
                      user_email: e.userEmail,
                    },
                    'user_D9wLZlfoJrXQgfo54ZKD6'
                  )
                  .then(
                    result => {
                      console.log(result.text);
                    },
                    error => {
                      console.log(error.text);
                    }
                  )
              );
            }}
          >
            Lancer
          </Button>

          <Button color="secondary" onClick={toggle}>
            Abandonner
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Supprimer la session?</ModalHeader>
        <ModalBody>êtes-vous sûr de vouloir supprimer cette session ?</ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={e => {
              toggle2();
              const arr = experience.sessions.filter(e => e._id !== el._id);
              experience.sessions = arr;
              dispatch(updateExperience(experience._id, {...experience}));
            }}
          >
            Supprimer
          </Button>

          <Button color="secondary" onClick={toggle2}>
            Abandonner
          </Button>
        </ModalFooter>
      </Modal>

      <Card className=" col-xl-8 bg-secondary border-0 rounded overflow-auto">
        <CardBody className="bg-white border rounded mb-1 ">
          <p>
            <span className="text-info" style={{fontWeight: 'bold'}}>
              Session {index + 1}
            </span>
            <span>
              {el.isCanceled ? (
                <></>
              ) : el.isLaunched ? (
                <div className="float-right bg-transparent border-0">
                  <CancelSession experience={experience} el={el} options={options} />
                </div>
              ) : (
                <button className="float-right bg-transparent border-0" onClick={toggle2}>
                  <i className="far fa-trash-alt text-danger " />
                </button>
              )}
            </span>
          </p>

          <p>
            {el.isCanceled ? (
              <span>
                Vous avez annulé cette session le
                {new Date(el.cancelDate).toLocaleDateString('fr-EG', options)}
              </span>
            ) : el.isLaunched ? (
              <span>lancée le {new Date(el.launchDate).toLocaleDateString('fr-EG', options)}</span>
            ) : (
              <Button className="text-danger" size="sm" onClick={toggle}>
                Lancer
              </Button>
            )}
          </p>
          <Table bordered>
            <tr className="text-center">
              {el.isLaunched ? (
                <></>
              ) : (
                <th>
                  <i className="fas fa-rocket text-danger" />
                  Limite de lancement
                </th>
              )}
              <th>
                <i className="fas fa-credit-card text-info" />
                Limite de paiement
              </th>
              <th>
                <i className="fas fa-battery-full text-success" />
                Jour de repos
              </th>
              <th>
                <i className="fas fa-bell text-yellow" />
                Jour de déroulement
              </th>
            </tr>
            <tr className="text-center">
              {el.isLaunched ? (
                <></>
              ) : (
                <td>{new Date(el.launchLimit).toLocaleDateString('fr-EG', options)}</td>
              )}
              <td>{new Date(el.paymentLimit).toLocaleDateString('fr-EG', options)}</td>
              <td>{new Date(el.restDate).toLocaleDateString('fr-EG', options)}</td>
              <td>{new Date(el.sessionDate).toLocaleDateString('fr-EG', options)}</td>
            </tr>
          </Table>
          {el.isCanceled ? (
            <></>
          ) : el.isLaunched ? (
            <Row>
              <Col xl="4">
                <PeopleReserved experience={experience} el={el} index={index} />
              </Col>
              <Col>
                <ReservationDemand
                  el={el}
                  index={index}
                  experience={experience}
                  options={options}
                />
              </Col>
            </Row>
          ) : (
            <PeopleInterested experience={experience} el={el} index={index} />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default PublishedSession;
