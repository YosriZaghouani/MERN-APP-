import React, {useState} from 'react';
import ModalBase from '../layout/ModalBase';

const TableState = ({el, demandAccepted, setDemandAccepted, demandRefused, setDemandRefused}) => {
  const [statusVerif, setStatusVerif] = useState('');

  return (
    <>
      {el.reservationDemand &&
        el.reservationDemand.map(s => (
          <>
            <tr>
              <td>
                <span>{s.userName}</span>
              </td>
              {(s.status && s.status === 'refused') || statusVerif === `refused ${s.userId}` ? (
                <td style={{padding: '5.2%'}}>
                  <span style={{paddingRight: '16%'}} className="float-right">
                    refusée
                  </span>
                </td>
              ) : (s.status && s.status === 'accepted') ||
                statusVerif === `accepted ${s.userId}` ? (
                <td style={{padding: '5.2%'}}>
                  <span className="pr-4 float-right">acceptée</span>
                </td>
              ) : (
                <td>
                  <div className="float-right row">
                    <div className="col-xl-4">
                      <ModalBase
                        buttonLabel={<i className="far fa-check-circle text-success" />}
                        modalBody={`Accepter la demande de résrevation de "${s.userName}" ?`}
                        firstButton="Oui"
                        secondButton="Non"
                        style={{
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          fontSize: 'x-large',
                          border: 0,
                          paddingRight: '0%',
                        }}
                        className="col-xl-4"
                        click={() => {
                          s = {...s, status: 'accepted'};
                          const arr = el.reservationDemand.filter(e => e.userId !== s.userId);
                          el.reservationDemand = arr;
                          el.reservationDemand.push(s);
                          setStatusVerif(`accepted ${s.userId}`);
                          demandAccepted.push({userEmail: s.userEmail, userName: s.userName});
                          setDemandAccepted(demandAccepted);
                          console.log(demandAccepted);
                        }}
                      />
                    </div>
                    <div className="col-xl-4">
                      <ModalBase
                        buttonLabel={<i className="far fa-times-circle text-danger" />}
                        modalBody={`Refuser la demande de résrevation de "${s.userName}" ?`}
                        firstButton="Oui"
                        secondButton="Non"
                        style={{
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          fontSize: 'x-large',
                          border: 0,
                          paddingLeft: '0%',
                        }}
                        click={() => {
                          s = {...s, status: 'refused'};
                          const arr = el.reservationDemand.filter(e => e.userId !== s.userId);
                          el.reservationDemand = arr;
                          el.reservationDemand.push(s);
                          setStatusVerif(`refused ${s.userId}`);
                          demandRefused.push({userEmail: s.userEmail, userName: s.userName});
                          setDemandRefused(demandRefused);
                          console.log(demandRefused);
                        }}
                      />
                    </div>
                  </div>
                </td>
              )}
            </tr>
          </>
        ))}
    </>
  );
};

export default TableState;
