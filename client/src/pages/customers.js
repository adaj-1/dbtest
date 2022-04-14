import 'bootstrap/dist/css/bootstrap.min.css'

import * as React from "react"
import { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import Layout from "../components/layout"
import Search from '../components/search'
import Axios from 'axios'

import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

export const CustomersPage = () => {

  const testUser = localStorage.getItem('User');
  const priv = localStorage.getItem('Priv');
  var admin = false;
  
  if (priv === 'admin')
  {
    admin = true;
  }

  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [updateRole, setUpdateRole] = useState('');
  const [updateBDU, setUpdateBDU] = useState('');
  const [updateSDU, setUpdateSDU] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [BDU, setBDU] = useState('');
  const [SDU, setSDU] = useState('');
  const [ssn, setSSN] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');

  const [allUsers, setAllUsers] = useState([]);


  const findUser = () => {
    Axios.get(`http://localhost:3001/api/searchUsers/${search}`).then((response) => {
      setUserList(response.data);
    });
  };
  
  const deleteUser = (user, role) => {
    Axios.delete(`http://localhost:3001/api/deleteUser/${user}&${role}`);
  };

  const updateUser = (updateUser) => {
    Axios.put("http://localhost:3001/api/updateUser", {
      User: updateUser,
      Role: updateRole,
      Buyer_discount_usage: updateBDU,
      Seller_discount_usage: updateSDU
    });
  };



  const addUser = () => {
    Axios.post('http://localhost:3001/api/addUser', {
      User: username,
      Password: password,
      Role: Role,
      Buyer_discount_usage: BDU,
      Seller_discount_usage: SDU,
    }); 
  };
  
  const addEmployee = () => {
    Axios.post('http://localhost:3001/api/addEmployee', {
      User: username,
      Ssn: ssn,
      Bday: birth_date,
      Add: address,
      Sal: salary
    }); 

    addUser();
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/allUsers`).then((response) => {
      setAllUsers(response.data);
    });
  }, []);
  return (
    <Layout pageTitle="Users">
      
      <Form>
        {admin && (
        <Form.Group className="mb-3" controlId="formSearch">
          <Row>
            <Col xs="11">
              <Form.Control type="text" placeholder="Search users by User ID or Role." onChange={(e) => { setSearch(e.target.value) }} />
            </Col>
            <Col xs="1">
              <button type="button" class="btn btn-primary" onClick={findUser}>Search</button>
            </Col>
          </Row>
        </Form.Group>
        )}
      </Form>

      <table class="table table-sm">
        {admin && !search &&(
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Role</th>
              <th scope="col">Buyer Discount Usage</th>
              <th scope="col">Seller Discount Usage</th>
              <th scope="col">Manage</th>
            </tr>
            {allUsers.map((val) => {
              return <tr>
                <td>{val.User_ID}</td>

                <td>{val.Privilege}</td>

                <td>{val.Buyer_discount_usage}</td>

                <td>{val.Seller_discount_usage}</td>

                <td>
                  <button type='button' className="btn btn-success btn-sm" onClick={() => { updateUser(val.User_ID); window.location.reload(); }}>Update</button>
                  <button type='button' className="btn btn-danger btn-sm mx-1" onClick={() => { deleteUser(val.User_ID, val.Role); window.location.reload(); }}>Delete</button>
                </td>
              </tr>
            })}
            </thead>
            )}
          </table>

      <br></br>
      {admin && search && (
      <p>Your search for <b>{search}</b> returned:</p>
      )}
        <table class="table table-sm">
        {admin && (
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Role</th>
              <th scope="col">Buyer Discount Usage</th>
              <th scope="col">Seller Discount Usage</th>
              {search && (
              <th scope="col">Manage</th>
              )}
              </tr>
          {userList.map((val) => {
            return <tr>
              <td>{val.User_ID}</td>
              
              <td>{val.Privilege}</td>

              <td>{val.Buyer_discount_usage}</td>
              
              <td>{val.Seller_discount_usage}</td>
             
              <td>
                <button type='button' className="btn btn-success btn-sm" onClick={() => { updateUser(val.User_ID); window.location.reload(); }}>Update</button>
                <button type='button' className="btn btn-danger btn-sm mx-1" onClick={() => { deleteUser(val.User_ID, val.Role); window.location.reload(); }}>Delete</button>
              </td>
            </tr>
          })}
          <tr>
            <td>Update:</td>
            <td>
              <Form.Control type="text" placeholder="Update Role" onChange={(e) => { setUpdateRole(e.target.value) }} />
            </td>
            <td>
              <Form.Control type="number" placeholder="Update Buyer Discount Usage" onChange={(e) => { setUpdateBDU(e.target.value) }} />
            </td>
            <td>
              <Form.Control type="number" placeholder="Update Sell Discount Usage" onChange={(e) => { setUpdateSDU(e.target.value) }} />
            </td>
            <td></td>
            <td></td>
          </tr>
          </thead>
        )}
        </table>
    

        <br></br>
        <br></br>
        <br></br>
      {admin && (
        <h3>Add User</h3>
      )}

      {admin && (
        <Form>
          <Row>
            <Col>
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" placeholder="User ID" onChange={(e) => { setUsername(e.target.value); setRole('user') }} />
            </Col>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Label>Buyer Discount Usage</Form.Label>
              <Form.Control type="number" placeholder="Buyer Discount Usage" onChange={(e) => { setBDU(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Seller Discount Usage</Form.Label>
            <Form.Control type="number" placeholder="Seller Discount Usage" onChange={(e) => { setSDU(e.target.value) }}/>
            </Col>    
          </Row>
        </Form>
      )}
      
        <br></br>
      {admin && (
        <div class="text-center">
          <button type='button' class="btn btn-default btn-primary" onClick={() => {addUser();  window.location.reload(); }}>Add User</button> 
        </div>
      )}

      {admin && (
        <h3>Add Employee</h3>
      )}

      {admin && (
        <Form>
          <Row>
            <Col>
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" placeholder="User ID" onChange={(e) => { setUsername(e.target.value); setRole('admin') }} />
            </Col>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Label>Buyer Discount Usage</Form.Label>
              <Form.Control type="number" placeholder="Buyer Discount Usage" onChange={(e) => { setBDU(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Seller Discount Usage</Form.Label>
              <Form.Control type="number" placeholder="Seller Discount Usage" onChange={(e) => { setSDU(e.target.value) }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Label>Ssn</Form.Label>
              <Form.Control type="number" placeholder="Ssn" onChange={(e) => { setSSN(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Birth date</Form.Label>
              <Form.Control type="date" placeholder="Birth date" onChange={(e) => { setBirth_date(e.target.value) }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Salary</Form.Label>
              <Form.Control type="number" placeholder="Salary" onChange={(e) => { setSalary(e.target.value) }} />
            </Col>
          </Row>
        </Form>
      )}

      <br></br>
      {admin && (
        <div class="text-center">
          <button type='button' class="btn btn-default btn-primary" onClick={() => { addEmployee(); window.location.reload();}}>Add Employee</button>
        </div>
      )}

    </Layout>
  )
}

export default CustomersPage
