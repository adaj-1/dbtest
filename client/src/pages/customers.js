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

  const [auth, setAuth] = useState('');
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
  const [wishlistID, setWishlistID] = useState('');


  /*
  useEffect(() => {
    Axios.get('http://localhost:3001/read-cookie').then((response) => {
      setAuth(response.data[0].screen);
    })
  }, [])
  */

  const findUser = () => {
    Axios.get(`http://localhost:3001/api/searchUsers/${search}`).then((response) => {
      setUserList(response.data);
    });
  };
  const deleteUser = (user) => {
    Axios.delete(`http://localhost:3001/api/deleteUser/${user}`);
  };


  const updateUser = (updateUser) => {
    Axios.put("http://localhost:3001/api/updateUser", {
      User: updateUser,
      Role: updateRole,
      Buyer_discount_usage: updateBDU,
      Seller_discount_usage: updateSDU
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getNumUsers').then((response) => {
      setWishlistID(response.data[0].userIDs + 1);
    });
  }, []);


  const addUser = () => {
    Axios.post('http://localhost:3001/api/addUser', {
      User: username,
      Password: password,
      Role: Role,
      Buyer_discount_usage: BDU,
      Seller_discount_usage: SDU,
      WishlistID: wishlistID
    }); 
  };
  


  return (
    <Layout pageTitle="Users">
      <Form>
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
      </Form>

      <br></br>
      <p>Your search for <b>{search}</b> returned:</p>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Role</th>
              <th scope="col">Buyer Discount Usage</th>
              <th scope="col">Seller Discount Usage</th>
              <th scope="col">Wishlist ID</th>
              <th scope="col">Manage</th>
            </tr>
          {userList.map((val) => {
            return <tr>
              <td>{val.User_ID}</td>
              
              <td>{val.Role}</td>

              <td>{val.Buyer_discount_usage}</td>
              
              <td>{val.Seller_discount_usage}</td>
             
              <td>{val.Wishlist_ID}</td>
              <td>
                <button type='button' className="btn btn-success btn-sm" onClick={() => { updateUser(val.User_ID) }}>Update</button>
                <button type='button' className="btn btn-danger btn-sm mx-1" onClick={() => { deleteUser (val.User_ID)}}>Delete</button>
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
        </table>
        
        <br></br>
        <br></br>
        <br></br>

        <h3>Add User</h3>
        <Form>
          <Row>
            <Col>
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" placeholder="User ID" onChange={(e) => { setUsername(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </Col>
            <Col>
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Role" onChange={(e) => { setRole(e.target.value) }} />
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
        <br></br>
        <div class="text-center">
          <button type='button' class="btn btn-default btn-primary" onClick={addUser}>Add User</button> 
        </div>
    </Layout>
  )
}

export default CustomersPage
