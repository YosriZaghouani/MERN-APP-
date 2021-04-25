import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../JS/actions';
import Loader from './layout/Loader';

// import { Redirect } from 'react-router-dom'
import User from './User';
// reactstrap components
import {Card, CardHeader, Table, Row} from 'reactstrap';
const Admin = ({match}) => {
  const users = useSelector(state => state.userReducer.users);
  const loading = useSelector(state => state.userReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Card tables</h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Utilisateur</th>
                <th scope="col">Status</th>
                <th scope="col">Téléphone</th>
                <th scope="col">E-mail</th>
                <th scope="col" />
              </tr>
            </thead>

            {users && users.map(user => <User key={User._id} user={user} />)}
          </Table>
        </Card>
      </div>
    </Row>
  );
};

export default Admin;
