import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
const StatusCheckbox = props => {
  const status = [
    {id: 1, name: 'créées'},
    {id: 2, name: 'en cours'},
    {id: 3, name: 'refusées'},
    {id: 4, name: 'acceptées'},
  ];
  const [checked, setChecked] = useState([]);
  const [created, setCreated] = useState(false);
  const handleToggle = value => {
    if (value === 1) {
      setCreated(true);
    }
  };
  return (
    <>
      <Col lg="5" md="10" className="mb-2">
        <Row className="icon-examples">
          {status.map((el, index) => (
            <React.Fragment key={index}>
              <Col>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id={el.id}
                    type="checkbox"
                    name={el.name}
                    onChange={() => handleToggle(el.id)}
                    checked={checked.indexOf(el.id) === -1 ? false : true}
                  />
                  <label className="custom-control-label" htmlFor={el.id}>
                    <small>{el.name}</small>
                  </label>
                </div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default StatusCheckbox;
