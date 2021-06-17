import React, {useState} from 'react';
import {Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';

const Publication = ({experience}) => {
  const [like, setLike] = useState();
  return (
    <>
      <Card className="shadow-sm col-xl-2 mr-3 border rounded p-0 ">
        <CardBody className="p-0">
          <img
            alt="image"
            className="p-0"
            src={experience.photo}
            style={{height: '300px', width: '251px'}}
          />
        </CardBody>
        <CardBody className="pt-3 p-2">
          <button
            className="bg-transparent border-0"
            onClick={() => {
              setLike(!like);
            }}
          >
            {like ? <i className="fas fa-heart text-danger" /> : <i className="far fa-heart" />}
          </button>
          <small className="text-gray">{experience.city}</small>
          <small className="float-right pt-1 pr-2 font-weight-bold">
            {experience.price} TND/personne
          </small>
          <br />
          <Link to={`details/${experience._id}`} className="text-gray-dark">
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: '4%',
              }}
            >
              {experience.type.title === 'en ligne' ? (
                <small>
                  <i className="fas fa-laptop mr-1" />
                </small>
              ) : (
                <small>
                  <i className="fas fa-users mr-1" />
                </small>
              )}
              {experience.title}
            </p>
          </Link>
        </CardBody>
      </Card>
    </>
  );
};

export default Publication;
