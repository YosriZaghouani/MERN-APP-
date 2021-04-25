import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import addUser from '../JS/actions/index';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
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
} from 'reactstrap';
import Loader from './layout/Loader';
import {useForm} from 'react-hook-form';

const Signup = () => {
  const loading = useSelector(state => state.userReducer.loading);
  const error = useSelector(state => state.userReducer.errors);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = e => {
    dispatch(
      addUser({
        name,
        email,
        password,
        phoneNumber,
      })
    );
  };
  return (
    <div className="main-content">
      {loading ? (
        <Loader />
      ) : (
        <Col lg="10" md="8" className="center border" style={{padding: '1%'}}>
          <Row>
            <Col>
              <Card className="bg-secondary  border">
                <CardHeader className="bg-transparent">
                  <div className="text-center">
                    <h3>Créer votre compte</h3>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Nom et prénom"
                          onChange={e => setName(e.target.value)}
                          invalid={errors['name']}
                          innerRef={register({
                            required: 'Le champ nom est obligatoire.',
                          })}
                        />
                      </InputGroup>
                      {errors.name && (
                        <span className="mr-2 text-sm" style={{color: '#dd3a4a'}}>
                          {errors.name.message}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                          invalid={errors['email']}
                          innerRef={register({
                            required: 'Le champ email est obligatoire.',
                          })}
                        />
                      </InputGroup>
                      {errors.email && (
                        <>
                          <span className="mr-2 text-sm" style={{color: '#dd3a4a'}}>
                            {errors.email.message}
                          </span>{' '}
                          <br />
                        </>
                      )}

                      {error && (
                        <span className="mr-2 text-sm" style={{color: '#dd3a4a'}}>
                          {error.msg}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-phone-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="phonenumber"
                          placeholder="Numéro de téléphone"
                          onChange={e => setPhoneNumber(e.target.value)}
                          invalid={errors['phonenumber']}
                          innerRef={register({
                            required: 'Le champ téléphone est obligatoire.',
                          })}
                        />
                      </InputGroup>
                      {errors.phonenumber && (
                        <span className="mr-2 text-sm" style={{color: '#dd3a4a'}}>
                          {errors.phonenumber.message}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="Password"
                          name="password"
                          placeholder="Mot de passe"
                          onChange={e => setPassword(e.target.value)}
                          invalid={errors['password']}
                          innerRef={register({
                            required: 'Le mot de passe est obligatoire.',
                          })}
                        />
                      </InputGroup>
                      {errors.password && (
                        <span className="mr-2 text-sm" style={{color: '#dd3a4a'}}>
                          {errors.password.message}
                        </span>
                      )}
                    </FormGroup>
                    <Row>
                      <Col>
                        <Link to="/login">
                          <div className="text-muted font-italic">
                            <small>Se connecter à un compte existant</small>
                          </div>
                        </Link>
                      </Col>
                      <Col>
                        <div className="text-center">
                          <Button color="primary" type="submit">
                            S'inscrire
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <img
                alt="..."
                src={require('../Assets/img/brand/register.jpg').default}
                style={{width: '100%', marginTop: '11%'}}
              />
            </Col>
          </Row>
        </Col>
      )}
    </div>
  );
};

export default Signup;
