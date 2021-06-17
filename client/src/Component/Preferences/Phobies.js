import React from 'react';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';

const Phobies = ({preferences, pselected, setPselected}) => {
  const onCheckboxBtnClick = selected => {
    const index = pselected.indexOf(selected);
    if (index < 0) {
      pselected.push(selected);
    } else {
      pselected.splice(index, 1);
    }
    setPselected([...pselected]);
  };

  return (
    <Card className="shadow mt-1">
      <CardHeader className="bg-transparent">
        <h3 className="mb-0">Si vous présentez des phobies, précisez les ici.</h3>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {preferences.map(el =>
            el.phobies.map(phobies => (
              <Col lg="5" md="6">
                <button
                  className={'btn-icon-clipboard'}
                  onClick={() => {
                    onCheckboxBtnClick(phobies.name);
                  }}
                  style={pselected.includes(phobies.name) ? {border: '2px solid #11cdef'} : {}}
                  type="button"
                >
                  <div>
                    <span>{phobies.name}</span>
                  </div>
                </button>
              </Col>
            ))
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default Phobies;
