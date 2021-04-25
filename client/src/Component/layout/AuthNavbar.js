import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

// reactstrap components
import {
  NavbarBrand,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  UncontrolledCollapse,
  DropdownToggle,
  Navbar,
  Nav,
  Media,
} from 'reactstrap';
import {getProfile, logout} from '../../JS/actions';

const AuthNavbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal border " expand="md" style={{padding: '0%'}}>
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require('../../Assets/img/brand/argon-react.png').default} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <img alt="..." src={require('../../Assets/img/brand/argon-react.png').default} />
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {localStorage.getItem('token') ? (
                <>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                        <span className="  rounded-circle">
                          <h2>
                            {' '}
                            <i className="ni ni-circle-08" />
                          </h2>{' '}
                        </span>
                        <Media className="ml-2 d-none d-lg-block">
                          <span className="mb-0 text-sm font-weight-bold">
                            <i className="fas fa-chevron-down" />
                          </span>
                        </Media>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem to="/profile" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>Mon profile</span>
                      </DropdownItem>
                      <DropdownItem to="/experiences" tag={Link}>
                        <i className="ni ni-settings-gear-65" />
                        <span>Gérer les expériences</span>
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        <i className="ni ni-calendar-grid-58" />
                        <span>Activité</span>
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        <i className="ni ni-support-16" />
                        <span>Aide</span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        tag={Link}
                        onClick={e => {
                          e.preventDefault();
                          dispatch(logout());
                        }}
                        to="/login"
                      >
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/login" tag={Link}>
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/register" tag={Link}>
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">Register</span>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
