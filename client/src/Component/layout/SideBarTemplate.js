import React, {useState} from 'react';
import {NavLink as NavLinkRRD, Link} from 'react-router-dom';
// nodejs library to set properties for components
import {PropTypes} from 'prop-types';

// reactstrap components
import {Collapse, Navbar, NavItem, NavLink, Nav, Container, Row, Col} from 'reactstrap';

const SideBarTemplate = props => {
  const [collapseOpen, setCollapseOpen] = useState();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(data => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const {routes, logo} = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
      style={{marginTop: '4.7%'}}
    >
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {/* User */}
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}

          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}></button>
              </Col>
            </Row>
          </div>

          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          {/* Heading */}

          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <Link to="/experiences">
                <NavLink>
                  <i className="ni ni-spaceship text-success" />
                  Mes expériences
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/reservation">
                <NavLink>
                  <i className="fas fa-money-check text-danger" /> Mes réservations
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="fas fa-balance-scale text-info" /> Mon calendrier
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

SideBarTemplate.defaultProps = {
  routes: [{}],
};

SideBarTemplate.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default SideBarTemplate;
