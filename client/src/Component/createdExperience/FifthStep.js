import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteExperience,
  getExperienceDetails,
  getExperiences,
  updateExperience,
} from '../../JS/actions/index';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Advice5 from '../layout/Advice5';
import {Link, Redirect} from 'react-router-dom';
import Loader from '../layout/Loader';
const FifthStep = ({
  match: {
    params: {id},
  },
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const isLoading = useSelector(state => state.experiencesReducers.isLoading);
  const experience = useSelector(state => state.experiencesReducers.experience);

  const [program, setProgram] = useState({});
  const [excludedEq, setExcludedEq] = useState({});
  const [includedEq, setIncludedEq] = useState({});
  useEffect(() => {
    dispatch(getExperienceDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (experience) {
      if (experience.program) {
        setProgram(experience.program.generalDesc);
      }
      if (experience.includedEq) {
        setIncludedEq(experience.includedEq);
      }
      if (experience.excludedEq) {
        setExcludedEq(experience.excludedEq);
      }
    }
  }, [experience]);
  return localStorage.getItem('token') ? (
    isLoading ? (
      <Loader />
    ) : experience ? (
      <>
        <Advice5 />
        <div className="main-content">
          <Container fluid>
            {/* progress */}
            <div className="text-center">5 de 6</div>
            <Progress multi style={{height: '21px'}}>
              <Progress bar value="90">
                90%
              </Progress>
            </Progress>
            <Col lg="12" md="12">
              <div className="header-body border-0" style={{padding: '2%', margin: '1%'}}>
                {/* button exit */}
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
                          program: {generalDesc: program.generalDesc},
                          excludedEq: {...excludedEq},
                          includedEq: {...includedEq},
                          status: 'created',
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

                {/* modal */}
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
                <Col lg="7" md="10">
                  <h2 style={{color: '#32325d'}}>
                    <i class="far fa-file-alt" style={{padding: '2%'}} />
                    Le programme de l'expérience
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
                      {/* global description */}
                      <Col lg="12" md="12">
                        <p
                          for="exampleText"
                          className="h3 font-weight-bold mb-0"
                          style={{paddingTop: '2%'}}
                        >
                          <i className="fas fa-align-justify" style={{paddingRight: '1%'}} />
                          Description générale
                        </p>
                        <FormGroup>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            rows="7"
                            defaultValue={
                              experience.program
                                ? experience.program.generalDesc
                                : program.generalDesc
                            }
                            onChange={e =>
                              setProgram({
                                generalDesc: e.target.value,
                              })
                            }
                            placeholder="Rédiger ici.."
                          />
                          <span className="mr-2 text-sm" style={{color: '#2dce89'}}>
                            <i className="ni ni-bulb-61" />
                            Votre description doit donner envie de participer à votre expérience.
                            Imaginez qu'elle raconte une histoire, avec un début, un milieu et une
                            fin.{' '}
                          </span>
                        </FormGroup>
                      </Col>
                      <h3 className="font-weight-bold mb-0" style={{padding: '2%'}}>
                        Les équipements inclus
                      </h3>
                      <Row>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className=" mb-0">A manger</CardTitle>
                                </div>

                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-utensils" />
                                  </div>
                                </Col>
                              </Row>

                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setIncludedEq({
                                        ...includedEq,
                                        food: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.includedEq
                                        ? experience.includedEq.food
                                          ? experience.includedEq.food
                                          : includedEq.food
                                        : includedEq.food
                                    }
                                    placeholder="Entrez ici la nourriture"
                                    type="textarea"
                                    maxlength="150"
                                    name="nourriture"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className="mb-0">A boire</CardTitle>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-wine-bottle" />{' '}
                                  </div>
                                </Col>
                              </Row>
                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setIncludedEq({
                                        ...includedEq,
                                        drink: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.includedEq
                                        ? experience.includedEq.drink
                                          ? experience.includedEq.drink
                                          : includedEq.drink
                                        : includedEq.drink
                                    }
                                    placeholder="Entrez ici les boissons"
                                    type="textarea"
                                    name="drink"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className=" mb-0">Matériels</CardTitle>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-archive" />{' '}
                                  </div>
                                </Col>
                              </Row>
                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setIncludedEq({
                                        ...includedEq,
                                        material: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.includedEq
                                        ? experience.includedEq.material
                                          ? experience.includedEq.material
                                          : includedEq.material
                                        : includedEq.material
                                    }
                                    placeholder="Entrez ici le matériel"
                                    type="textarea"
                                    name="matériel"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <span className="mr-2 text-sm" style={{color: '#2dce89'}}>
                        <i className="ni ni-bulb-61" />
                        Si les participants ont besoins de quoique ce soit pour profiter de
                        l'expérience précisez le ici{' '}
                      </span>
                      <br />
                      <small className="mr-2 " style={{color: 'grey'}}>
                        <i className="fas fa-info-circle" style={{paddingRight: '1%'}} />
                        Cette partie est facultative{' '}
                      </small>

                      <h3 className="font-weight-bold mb-0" style={{padding: '2%'}}>
                        Les équipements exclus
                      </h3>
                      <Row>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className=" mb-0">A manger</CardTitle>
                                </div>

                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-utensils" />
                                  </div>
                                </Col>
                              </Row>

                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setExcludedEq({
                                        ...excludedEq,
                                        food: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.excludedEq
                                        ? experience.excludedEq.food
                                          ? experience.excludedEq.food
                                          : excludedEq.food
                                        : excludedEq.food
                                    }
                                    placeholder="Entrez ici la nourriture"
                                    type="textarea"
                                    name="nourriture"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className="mb-0">A boire</CardTitle>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-wine-bottle" />{' '}
                                  </div>
                                </Col>
                              </Row>
                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setExcludedEq({
                                        ...excludedEq,
                                        drink: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.excludedEq
                                        ? experience.excludedEq.drink
                                          ? experience.excludedEq.drink
                                          : excludedEq.drink
                                        : excludedEq.drink
                                    }
                                    placeholder="Entrez ici les boissons"
                                    type="textarea"
                                    name="drink"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg="6" xl="4">
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody style={{padding: '5%'}}>
                              <Row>
                                <div className="col" style={{paddingTop: '5%'}}>
                                  <CardTitle className=" mb-0">Matériels</CardTitle>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape rounded-circle shadow">
                                    <i className="fas fa-archive" />{' '}
                                  </div>
                                </Col>
                              </Row>
                              <div style={{paddingTop: '3%'}}>
                                <FormGroup>
                                  <Input
                                    onChange={e =>
                                      setExcludedEq({
                                        ...excludedEq,
                                        material: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      experience.excludedEq
                                        ? experience.excludedEq.material
                                          ? experience.excludedEq.material
                                          : excludedEq.material
                                        : excludedEq.material
                                    }
                                    placeholder="Entrez ici le matériel"
                                    type="textarea"
                                    name="matériel"
                                  />
                                </FormGroup>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <span className="mr-2 text-sm" style={{color: '#2dce89'}}>
                        <i className="ni ni-bulb-61" />
                        Si vous allez offrir quoique ce soit aux participants précisez le ici{' '}
                      </span>
                      <br />
                      <small className="mr-2 " style={{color: 'grey'}}>
                        <i className="fas fa-info-circle" style={{paddingRight: '1%'}} />
                        Cette partie est facultative{' '}
                      </small>
                    </CardBody>
                  </Card>
                  <div className="mt-4">
                    <Link
                      to={`/fourth/${experience._id}`}
                      className="btn"
                      style={{color: '#5e72e4', backgroundColor: '#fff'}}
                    >
                      Précédent
                    </Link>
                    {program !== {} ? (
                      <Link
                        to={`/image/${id}`}
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch(
                            updateExperience(id, {
                              ...experience,
                              program: {generalDesc: program.generalDesc},
                              excludedEq: {...excludedEq},
                              includedEq: {...includedEq},
                              status: 'created',
                            })
                          );
                        }}
                      >
                        suivant
                      </Link>
                    ) : (
                      <Button className="btn btn-primary" color="primary" disabled>
                        Enregistrer
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

export default FifthStep;
