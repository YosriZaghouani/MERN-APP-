import React from 'react';
import PropTypes from 'prop-types';
import {CardBody, CardTitle, Card, Col, Row} from 'reactstrap';

const CardBase = props => {
  const {title, cardIcon, children} = props;
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          {title && (
            <div className="col">
              <CardTitle className="h4  mb-0 ">{title}</CardTitle>
            </div>
          )}
          {cardIcon && (
            <Col className="col-auto">
              <div className="icon icon-shape bg-secondary text-black rounded-circle shadow">
                <i className={cardIcon} />
              </div>
            </Col>
          )}
        </Row>
        <div className="mt-3 mb-0 text-muted text-sm">{children}</div>
      </CardBody>
    </Card>
  );
};

CardBase.propTypes = {
  title: PropTypes.string,
  cardIcon: PropTypes.string,
  children: PropTypes.node,
};

export default CardBase;
