import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {deleteExperience, getExperiences, getUserDetails} from '../../JS/actions/index';

const CreatedExperienceAd = ({experience}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Supprimer l'expérience?</ModalHeader>
        <ModalBody>Etes vous sur de supprimer l'expérience?</ModalBody>
        <ModalFooter>
          <Link
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteExperience(experience._id));
              toggle();
              dispatch(getExperiences());
            }}
            to={`/admin`}
          >
            Supprimer
          </Link>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      {/* endModal */}
      <tr>
        <td>{experience.createdAt.substr(0, 10)} </td>

        <td>{experience.title} </td>
        <td>
          {experience.status === 'created' ? (
            <>
              <i className="fas fa-circle pr-1" />
              Créée
            </>
          ) : experience.status === 'beingValidated' || experience.status === 'contentValidated' ? (
            <>
              <i className="fas fa-circle text-yellow pr-1" />
              En cours
            </>
          ) : experience.status === 'accepted' ? (
            <>
              {' '}
              <i className="fas fa-circle text-success pr-1" />
              Acceptée
            </>
          ) : (
            <>
              <i className="fas fa-circle text-danger pr-1" />
              Refuséé
            </>
          )}
        </td>
        <td>{experience.type.title}</td>
        <td>{experience.activity}</td>

        <td>
          {experience.status === 'beingValidated' ? (
            <Link style={{margin: '5%', fontSize: 'x-large'}} to={`admin/${experience._id}`}>
              <i className=" fas fa-clipboard-check text-yellow" />
            </Link>
          ) : experience.status === 'contentValidated' ? (
            <Link style={{margin: '5%', fontSize: 'large'}} to={`admin/${experience._id}`}>
              <i className="fas fa-user-clock text-yellow" />
            </Link>
          ) : (
            <Link style={{margin: '5%', fontSize: 'large'}} to={`admin/${experience._id}`}>
              <i className="far fa-eye"></i>
            </Link>
          )}

          <Link style={{margin: '5%', fontSize: 'large'}} to={`/first/${experience._id}`}>
            <i className="far fa-edit"></i>
          </Link>
          <Link onClick={toggle} style={{margin: '5%', fontSize: 'large'}} to={`admin`}>
            <i className="far fa-trash-alt text-danger"></i>{' '}
          </Link>
        </td>
      </tr>
    </>
  );
};

export default CreatedExperienceAd;
