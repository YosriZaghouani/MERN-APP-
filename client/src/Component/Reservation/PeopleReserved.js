import React from 'react';
import PopOver from '../layout/PopOver';
const PeopleReserved = ({experience, el, index}) => {
  return (
    <>
      <PopOver
        title={`Personnes qui ont réservées (${el.reservationDemand.length})`}
        index={`Popover${index + 1}`}
        text={
          el.reservationDemand &&
          el.reservationDemand.map(s => (
            <>
              <span>{s.userName}</span>
              <br />
            </>
          ))
        }
        header="Demandes de réservation"
      />
    </>
  );
};

export default PeopleReserved;
