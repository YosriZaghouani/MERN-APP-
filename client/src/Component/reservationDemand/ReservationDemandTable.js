import React from 'react';
import {Table} from 'reactstrap';
import TableState from './TableState';
const ReservationDemandTable = ({
  el,
  experience,
  demandAccepted,
  setDemandAccepted,
  demandRefused,
  setDemandRefused,
}) => {
  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead>
          <th scope="col">Nom et prénom</th>
          <th scope="col"></th>
        </thead>
        <tbody>
          <TableState
            el={el}
            experience={experience}
            demandAccepted={demandAccepted}
            setDemandAccepted={setDemandAccepted}
            demandRefused={demandRefused}
            setDemandRefused={setDemandRefused}
          />
        </tbody>
      </Table>
    </>
  );
};

export default ReservationDemandTable;
