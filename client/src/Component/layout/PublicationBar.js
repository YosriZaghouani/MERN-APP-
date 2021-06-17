import React, {useState} from 'react';
import {NavLink as NavLinkRRD, Link} from 'react-router-dom';
// nodejs library to set properties for components
import {PropTypes} from 'prop-types';

// reactstrap components
import {Collapse, Navbar, NavItem, NavLink, Nav, Container, Row, Col} from 'reactstrap';

const PublicationBar = props => {
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
    <Navbar className="navbar-light pt-0" expand="md" id="sidenav-main">
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        <Collapse navbar isOpen={collapseOpen} className="justify-content-center">
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}></button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes)}</Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <Link to="/explore">
                <NavLink>
                  <i className="far fa-eye mr-1" />
                  Tous
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/foryou">
                <NavLink>
                  <i className="fas fa-hand-holding-heart mr-1" />
                  Pour vous
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="fas fa-hourglass-half mr-1" />
                Dans cette semaine
              </NavLink>
            </NavItem>
            <NavItem>
              <Link to="/online">
                <NavLink>
                  <i className="fas fa-laptop mr-1" /> En ligne
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/inperson">
                <NavLink>
                  <i className="fas fa-users mr-1" /> En personne
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

PublicationBar.defaultProps = {
  routes: [{}],
};

PublicationBar.propTypes = {
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

export default PublicationBar;
