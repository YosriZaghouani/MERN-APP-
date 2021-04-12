import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { getProfile, logout, updateProfile } from "../JS/actions";
import { useAlert } from "react-alert";
import FileUpload from "./FileUpload";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Loader from "./layout/Loader";
import AuthNavbar from "./layout/AuthNavbar";
import UpdateAlert from "./layout/UpdateAlert";

const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [aboutMe, setAboutme] = useState("");
  const [postalCode, setPostalcode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [editDone, setEditDone] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setBirthday(user.birthday);
      setCity(user.city);
      setAboutme(user.aboutMe);
      setAdress(user.adress);
      setPostalcode(user.postalCode);
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProfile(user._id, {
        name,
        email,
        phoneNumber,
        birthday,
        city,
        aboutMe,
        postalCode,
        adress,
      })
    );
    setEditDone(true);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, editDone]);

  //Render the User's Age depending on his birthday

  function getAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="main-content">
      {loading ? (
        <Loader />
      ) : !isAuth ? (
        <Redirect to="/login" />
      ) : (
        <div className="header bg-white py-7 py-lg-6">
          <AuthNavbar />
          <Container fluid className="mt-6">
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require(".././Assets/img/theme/team-3-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                <Link
                  to="/"
                  className="float-right btn"
                  color="danger"
                  size="sm"
                >
                  Logout
                </Link>
              </div>
            </CardHeader> */}
                  <CardBody className="mt-8 pt-md-4">
                    <Row>
                      <div className="col"></div>
                    </Row>
                    <div className="text-center">
                      <h3>{name}</h3>
                      <span className="font-weight-light">
                        {user ? (
                          user.birthday ? (
                            getAge(birthday)
                          ) : (
                            <p></p>
                          )
                        ) : (
                          <p></p>
                        )}
                      </span>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                      </div>

                      <hr className="my-4" />
                      <Link
                        to="/login"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Se déconnecter
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Mon Profil</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={() => {
                            setEdit(true);
                          }}
                          size="sm"
                        >
                          Modifier le profile
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  {edit ? (
                    <CardBody>
                      <Form>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Nom et prénom
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="name"
                                  name="text"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-email"
                                >
                                  Email
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="email"
                                  name="email"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Téléphone
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="phoneNumber"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Date de naissance
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="date"
                                  name="birthday"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={birthday}
                                  onChange={(e) => setBirthday(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}

                        <div className="pl-lg-4">
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Addresse
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="adress"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={adress}
                                  defaultValue={adress}
                                  onChange={(e) => setAdress(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  Ville
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="city"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Code postal
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="postalCode"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={postalCode}
                                  defaultValue={postalCode}
                                  onChange={(e) =>
                                    setPostalcode(e.target.value)
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          A propos moi
                        </h6>
                        <div className="pl-lg-4">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              placeholder="A few words about you ..."
                              rows="4"
                              defaultValue={aboutMe}
                              type="textarea"
                              value={aboutMe}
                              onChange={(e) => setAboutme(e.target.value)}
                            />
                          </FormGroup>
                          <Button
                            variant="info"
                            style={{ marginLeft: "85%" }}
                            onClick={(e) => {
                              handleSubmit(e);
                              setEdit(false);
                              alert.show("Votre profil a été mis à jour");
                            }}
                          >
                            Enregistrer
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  ) : (
                    <CardBody>
                      <Form>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Nom et prénom
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="name"
                                  name="text"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-email"
                                >
                                  Email
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="email"
                                  name="email"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Téléphone
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="phoneNumber"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Date de naissance
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="date"
                                  name="birthday"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={birthday}
                                  defaultValue={birthday}
                                  onChange={(e) => setBirthday(e.target.value)}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>

                        <hr className="my-4" />
                        {/* Address */}

                        <div className="pl-lg-4">
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Addresse
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="adress"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={adress}
                                  defaultValue={adress}
                                  onChange={(e) => setAdress(e.target.value)}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  Ville
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="city"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={city}
                                  defaultValue={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Code postal
                                </label>
                                <Input
                                  aria-label="Small"
                                  type="text"
                                  name="postalCode"
                                  aria-describedby="inputGroup-sizing-sm"
                                  value={postalCode}
                                  defaultValue={postalCode}
                                  onChange={(e) =>
                                    setPostalcode(e.target.value)
                                  }
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                          A propos
                        </h6>

                        <div className="pl-lg-4">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              placeholder="Parlez de vous ..."
                              rows="4"
                              defaultValue={aboutMe}
                              type="textarea"
                              value={aboutMe}
                              onChange={(e) => setAboutme(e.target.value)}
                              disabled
                            />
                          </FormGroup>
                        </div>
                      </Form>
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Profile;
