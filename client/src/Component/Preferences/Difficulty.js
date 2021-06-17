import React from 'react';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';

const Difficulty = ({preferences, dselected, setDselected}) => {
  const onCheckboxBtnClick = selected => {
    const index = dselected.indexOf(selected);
    if (index < 0) {
      dselected.push(selected);
    } else {
      dselected.splice(index, 1);
    }
    setDselected([...dselected]);
  };

  return (
    <Card className="shadow mt-1">
      <CardHeader className="bg-transparent">
        <h3 className="mb-0">les niveaux de difficultés</h3>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {preferences.map(el =>
            el.difficulties.map(difficulties => (
              <Col lg="3" md="6">
                <button
                  className={'btn-icon-clipboard'}
                  onClick={() => {
                    onCheckboxBtnClick(difficulties.name);
                  }}
                  style={dselected.includes(difficulties.name) ? {border: '2px solid #11cdef'} : {}}
                  type="button"
                >
                  <div>
                    <i className={difficulties.icon} />
                    <span>{difficulties.name}</span>
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

export default Difficulty;
