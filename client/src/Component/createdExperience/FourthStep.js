import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Progress,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Loader from '../layout/Loader';
import {
  deleteExperience,
  getExperienceDetails,
  getExperiences,
  updateExperience,
} from '../../JS/actions/index';
import SideBar from '../layout/SideBar';
import Advice4 from '../layout/Advice4';
const FourthStep = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);

  const [city, setCity] = useState('Ariana');
  const [location, setLocation] = useState(' ');
  const [assemblyPoint, setAssemblyPoint] = useState(' ');
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const defaultCities = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'La Manouba',
    'Le Kef',
    'Mahdia',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (experience) {
      if (experience.city) {
        setCity(experience.city);
        setStartHour(experience.startHour);
        setEndHour(experience.endHour);
      }
      if (experience.location) {
        setAssemblyPoint(experience.type.assemblyPoint);
        setLocation(experience.type.location);
      }
    }
  }, [experience]);

  return localStorage.getItem('token') ? (
    isLoading ? (
      <Loader />
    ) : experience ? (
      <>
        <Advice4 />
        <div className="main-content">
          <Container fluid>
            {/* progress */}
            <div className="text-center">4 de 6</div>
            <Progress multi style={{height: '21px'}}>
              <Progress bar value="50">
                80%
              </Progress>
            </Progress>

            <Col lg="12" md="12">
              <div className="header-body border-0" style={{padding: '2%', margin: '1%'}}>
                {/* exit button */}
                {experience.type &&
                experience.title &&
                experience.startHour &&
                experience.program ? (
                  <Link
                    to="/experiences"
                    style={{float: 'right'}}
                    className=" btn btn-sm"
                    onClick={() => {
                      dispatch(
                        updateExperience(id, {
                          ...experience,
                          city: city,
                          type: {
                            ...experience.type,
                            location: location,
                            assemblyPoint: assemblyPoint,
                          },
                          endHour: endHour,
                          startHour: startHour,
                        })
                      );
                    }}
                  >
                    Enregistrer et quitter
                  </Link>
                ) : (
                  <Button
                    onClick={toggle}
                    style={{
                      padding: '0.5% 0.5% 0%',
                      float: 'right',
                    }}
                  >
                    <i className="ni ni-fat-remove" />
                  </Button>
                )}

                {/* modal  */}
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Abandonner la création ?</ModalHeader>
                  <ModalBody>
                    Si vous abandonner la création, vous perderz toutes les informations saisies.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                      Continuer
                    </Button>{' '}
                    <Link
                      className="btn"
                      to={'/experiences'}
                      color="secondary"
                      onClick={() => {
                        dispatch(deleteExperience(experience._id));
                        toggle();
                        dispatch(getExperiences());
                      }}
                    >
                      Abandonner
                    </Link>
                  </ModalFooter>
                </Modal>
                {/* step title */}
                <Col lg="6" md="10">
                  <h2 style={{color: '#32325d'}}>
                    <i className="fas fa-map-pin" style={{padding: '2%'}} />
                    Lieu et heure de l'expérience
                  </h2>
                </Col>
                {/* form */}
                <Form>
                  <Card className=" shadow border-0">
                    <CardHeader className="bg-transparent">
                      {/* experience type */}
                      {experience.type.title === 'en ligne' ? (
                        <div className="icon icon-shape bg-secondary text-black rounded-circle shadow">
                          <i className="ni ni-laptop" />
                        </div>
                      ) : (
                        <div className="icon icon-shape bg-secondary text-black rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      )}

                      <span> Expérience {experience.type.title} </span>
                    </CardHeader>

                    <CardBody className="px-lg-5 py-lg-5">
                      {/* city part */}
                      <FormGroup className="mb-3 border rounded" style={{padding: '2%'}}>
                        <div>
                          <small className="font-weight-bold">
                            <i className="fas fa-search-location" /> Dans quelle ville
                            proposerez-vous votre expérience ?
                          </small>
                        </div>
                        <FormGroup>
                          <Col lg="5" md="6">
                            <Input
                              type="select"
                              name="city"
                              id="exampleSelect"
                              onChange={e => {
                                e.target.value
                                  ? setCity(e.target.value)
                                  : console.log(e.target.value);
                              }}
                            >
                              {defaultCities.map(c =>
                                experience.city === null ? (
                                  <option>{c}</option>
                                ) : (
                                  <option selected={experience.city === c}>{c}</option>
                                )
                              )}
                            </Input>
                          </Col>
                        </FormGroup>

                        {experience.type.title === 'en personne' ? (
                          <div>
                            <FormGroup>
                              <div>
                                <small className="font-weight-bold">
                                  Où votre expérience se passera-t-elle?
                                </small>
                              </div>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-caps-small" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  onChange={e => setLocation(e.target.value)}
                                  placeholder="localisation"
                                  type="string"
                                  autoComplete="new-password"
                                  name="location"
                                  defaultValue={experience ? experience.type.location : location}
                                  // invalid={errors["location"]}
                                  // innerRef={register({
                                  //   required: "La localisation est obligatoire.",
                                  // })}
                                />
                              </InputGroup>
                            </FormGroup>
                            {/* assembly point part */}
                            <FormGroup>
                              <div>
                                <small className="font-weight-bold">
                                  Indiquez le point de rassemblement des participants?
                                </small>
                              </div>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-caps-small" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  onChange={e => setAssemblyPoint(e.target.value)}
                                  placeholder="Point de rassemblement"
                                  type="string"
                                  autoComplete="new-password"
                                  name="assemblyPoint"
                                  defaultValue={
                                    experience ? experience.type.assemblyPoint : assemblyPoint
                                  }
                                  // invalid={errors["assemblyPoint"]}
                                  // innerRef={register({
                                  //   required:
                                  //     "Le point de rassemblement est obligatoire.",
                                  // })}
                                />
                              </InputGroup>
                              <span className="mr-2 text-sm" style={{color: '#2dce89'}}>
                                <i className="ni ni-bulb-61" />
                                Assurez-vous que le point de rassemblement est facile à trouver.
                              </span>
                            </FormGroup>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </FormGroup>
                      {/* start hour part */}
                      <FormGroup className="mb-3 border rounded" style={{padding: '2%'}}>
                        <div>
                          <small className="font-weight-bold">
                            <i className="fas fa-hourglass-half" /> A quelle heure proposerez-vous
                            votre expérience ?
                          </small>
                        </div>
                        <Row className="icon-examples">
                          <Col lg="4" md="6">
                            <span className="mr-2 text-sm">L'heure de début</span>
                            <FormGroup>
                              <Input
                                type="time"
                                name="startHour"
                                id="exampleDatetime"
                                placeholder="datetime"
                                min="07:00"
                                max="19:00"
                                defaultValue={experience ? experience.startHour : startHour}
                                onChange={e => {
                                  e.target.value
                                    ? setStartHour(e.target.value)
                                    : console.log(e.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          {/* end hour */}
                          <Col lg="4" md="6">
                            <span className="mr-2 text-sm">L'heure de fin</span>

                            <FormGroup>
                              <Input
                                type="time"
                                name="endHour"
                                id="exampleDatetime"
                                placeholder="datetime"
                                min="07:00"
                                max="19:00"
                                defaultValue={experience ? experience.endHour : endHour}
                                onChange={e => {
                                  e.target.value
                                    ? setEndHour(e.target.value)
                                    : console.log(e.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <span className="mr-2 text-sm" style={{color: 'rgb(94, 114, 228)'}}>
                          <i className="far fa-calendar-check" /> Vous fixerez la date de
                          déroulement une fois l'expérience est validée.
                        </span>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  <div className="mt-4">
                    <Link
                      to={`/third/${experience._id}`}
                      className="btn"
                      style={{color: '#5e72e4', backgroundColor: '#fff'}}
                    >
                      Précédent
                    </Link>
                    {startHour !== 0 && endHour !== 0 && city !== '' ? (
                      <Link
                        to={`/fifth/${experience._id}`}
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch(
                            updateExperience(id, {
                              ...experience,
                              city: city,
                              type: {
                                ...experience.type,
                                location: location,
                                assemblyPoint: assemblyPoint,
                              },
                              endHour: endHour,
                              startHour: startHour,
                            })
                          );
                        }}
                      >
                        Suivant
                      </Link>
                    ) : (
                      <Button color="primary" className="btn-primary" disabled>
                        Suivant
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </Col>
          </Container>
        </div>
      </>
    ) : (
      <p></p>
    )
  ) : (
    <Redirect to="/login" />
  );
};

export default FourthStep;
