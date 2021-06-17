import React from 'react';
import PopOver from '../layout/PopOver';
const PeopleInterested = ({el, index}) => {
  return (
    <>
      <PopOver
        title={`Personnes interessées (${el.peopleInterrested.length})`}
        index={`Popover${index + 1}`}
        text={
          el.peopleInterrested &&
          el.peopleInterrested.map(s => (
            <>
              <span>{s.userName}</span>
              <br />
            </>
          ))
        }
        header="Personnes intéressées"
      />
    </>
  );
};

export default PeopleInterested;
