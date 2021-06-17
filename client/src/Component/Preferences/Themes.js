import React from 'react';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';
import User from '../User';

const Themes = ({preferences, tselected, setTselected}) => {
  const onCheckboxBtnClick = selected => {
    const index = tselected.indexOf(selected);
    if (index < 0) {
      tselected.push(selected);
    } else {
      tselected.splice(index, 1);
    }
    setTselected([...tselected]);
  };

  return (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <h3 className="mb-0">Les thémes</h3>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {preferences.map(el =>
            el.themes.map(theme => {
              return (
                <Col lg="3" md="6">
                  <button
                    className={'btn-icon-clipboard'}
                    onClick={() => {
                      onCheckboxBtnClick(theme.name);
                    }}
                    style={tselected.includes(theme.name) ? {border: '2px solid #11cdef'} : {}}
                    type="button"
                  >
                    <i className={theme.icon} />
                    <span>{theme.name}</span>
                  </button>
                </Col>
              );
            })
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default Themes;
