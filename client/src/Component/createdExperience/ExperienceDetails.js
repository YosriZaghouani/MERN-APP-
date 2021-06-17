import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../../App.css';
import Loader from '../layout/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  getExperienceDetails,
  updateExperience,
  getExperiences,
  getProfile,
} from '../../JS/actions/index';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Media,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import AuthNavbar from '../layout/AuthNavbar';
import Details from '../sessions/Details';
const ExperienceDetails = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);

  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);

  console.log(
    '🚀 ~ file: ExperienceDetails.js ~ line 38 ~ ExperienceDetails ~ experience.langue',
    experience
  );
  return localStorage.getItem('token') ? (
    isLoading ? (
      <Loader />
    ) : experience ? (
      <>
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Demander la validation?</ModalHeader>
          <ModalBody>
            Si vous envoyer votre demande de validation, vous ne pouvez plus ni modifier ni
            supprimer votre expérience.
          </ModalBody>
          <ModalFooter>
            <Link
              className="btn btn-success"
              to={`/experiences`}
              onClick={e => {
                toggle();

                dispatch(
                  updateExperience(experience._id, {
                    ...experience,
                    status: 'beingValidated',
                  })
                );
                dispatch(getExperiences());
              }}
            >
              Envoyer
            </Link>

            <Button color="secondary" onClick={toggle}>
              Abandonner
            </Button>
          </ModalFooter>
        </Modal>
        {/* endModal */}
        <div>
          <AuthNavbar />
          <Col lg="8" md="8" className="center mt-2">
            <Card className="bg-transparent border-0">
              <CardHeader className="bg-transparent">
                {experience.status === 'beingValidated' ? (
                  <Link
                    style={{float: 'right'}}
                    className="btn btn-sm btn-info"
                    to={`/experiences`}
                  >
                    Retour
                  </Link>
                ) : (
                  <Row style={{float: 'right'}}>
                    <Col>
                      <Button className=" btn-sm btn-success" onClick={toggle}>
                        Envoyer{' '}
                      </Button>
                    </Col>
                    <Col>
                      <Link to={`/first/${id}`} className="btn btn-sm btn-info">
                        Modifier
                      </Link>
                    </Col>
                  </Row>
                )}
              </CardHeader>
              <Details experience={experience} />
            </Card>
          </Col>
        </div>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};
export default ExperienceDetails;
