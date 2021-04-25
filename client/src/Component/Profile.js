import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getProfile, logout, updateProfile} from '../JS/actions';
import {useAlert} from 'react-alert';
import {Container, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col} from 'reactstrap';
import ImageUploader from './ImageUploader';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [photo, setPhoto] = useState();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setBirthday(user.birthday);
      setCity(user.city);
      setAboutMe(user.aboutMe);
      setAddress(user.address);
      setPostalCode(user.postalCode);
      setPhoto(user.photo);
    }
  }, [user]);
  const handleSubmit = e => {
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
        address,
        photo,
      })
    );
    dispatch(getProfile());
  };

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
    <Container fluid className="mt-6">
      <Row>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="5">
                <div>
                  <img
                    alt=""
                    className="avatar  rounded-circle"
                    src={photo}
                    style={{height: '200px', width: '200px'}}
                  />
                </div>
                {edit ? (
                  <div style={{marginLeft: '31%', marginTop: '10%'}}>
                    <ImageUploader image={photo} setImage={setPhoto} />
                  </div>
                ) : (
                  <p></p>
                )}
              </Col>
            </Row>

            <CardBody className="mt-4 pt-md-4">
              <Row>
                <div className="col"></div>
              </Row>
              <div className="text-center">
                <h3>{name}</h3>
                <span className="font-weight-light">
                  <strong>Age</strong> <br />
                  <strong>{user ? user.birthday ? getAge(birthday) : <p></p> : <p></p>}</strong>
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
                <Col xs="6">
                  <h3 className="mb-0">Mon Profil</h3>
                </Col>
                <Col xs="3">
                  <Link to="/preferences" className="btn btn-primary" style={{padding: '1.5%'}}>
                    <small>
                      {' '}
                      <b>Ajouter mes préférences </b>{' '}
                    </small>{' '}
                  </Link>
                </Col>
                <Col text-right>
                  <Button
                    color="primary"
                    onClick={() => {
                      setEdit(true);
                    }}
                    size="sm"
                  >
                    Modifier mon profile
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
                          <label className="form-control-label" htmlFor="input-username">
                            Nom et prénom
                          </label>
                          <Input
                            aria-label="Small"
                            type="name"
                            name="text"
                            aria-describedby="inputGroup-sizing-sm"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email
                          </label>
                          <Input
                            aria-label="Small"
                            type="email"
                            name="email"
                            aria-describedby="inputGroup-sizing-sm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Téléphone
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="phoneNumber"
                            aria-describedby="inputGroup-sizing-sm"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Date de naissance
                          </label>
                          <Input
                            aria-label="Small"
                            type="date"
                            name="birthday"
                            aria-describedby="inputGroup-sizing-sm"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
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
                          <label className="form-control-label" htmlFor="input-address">
                            Addresse
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="address"
                            aria-describedby="inputGroup-sizing-sm"
                            value={address}
                            defaultValue={address}
                            onChange={e => setAddress(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">
                            Ville
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="city"
                            aria-describedby="inputGroup-sizing-sm"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">
                            Code postal
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="postalCode"
                            aria-describedby="inputGroup-sizing-sm"
                            value={postalCode}
                            defaultValue={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">A propos moi</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue={aboutMe}
                        type="textarea"
                        value={aboutMe}
                        onChange={e => setAboutMe(e.target.value)}
                      />
                    </FormGroup>

                    <Button
                      type="submit"
                      variant="info"
                      style={{marginLeft: '85%'}}
                      onClick={e => {
                        handleSubmit(e);
                        setEdit(false);
                        alert.show('Votre profil a été mis à jour');
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
                          <label className="form-control-label" htmlFor="input-username">
                            Nom et prénom
                          </label>
                          <Input
                            aria-label="Small"
                            type="name"
                            name="text"
                            aria-describedby="inputGroup-sizing-sm"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email
                          </label>
                          <Input
                            aria-label="Small"
                            type="email"
                            name="email"
                            aria-describedby="inputGroup-sizing-sm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Téléphone
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="phoneNumber"
                            aria-describedby="inputGroup-sizing-sm"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Date de naissance
                          </label>
                          <Input
                            aria-label="Small"
                            type="date"
                            name="birthday"
                            aria-describedby="inputGroup-sizing-sm"
                            value={birthday}
                            defaultValue={birthday}
                            onChange={e => setBirthday(e.target.value)}
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
                          <label className="form-control-label" htmlFor="input-address">
                            Addresse
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="address"
                            aria-describedby="inputGroup-sizing-sm"
                            value={address}
                            defaultValue={address}
                            onChange={e => setAddress(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">
                            Ville
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="city"
                            aria-describedby="inputGroup-sizing-sm"
                            value={city}
                            defaultValue={city}
                            onChange={e => setCity(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">
                            Code postal
                          </label>
                          <Input
                            aria-label="Small"
                            type="text"
                            name="postalCode"
                            aria-describedby="inputGroup-sizing-sm"
                            value={postalCode}
                            defaultValue={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">A propos</h6>

                  <div className="pl-lg-4">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="Parlez de vous ..."
                        rows="4"
                        defaultValue={aboutMe}
                        type="textarea"
                        value={aboutMe}
                        onChange={e => setAboutMe(e.target.value)}
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
  );
};

export default Profile;
