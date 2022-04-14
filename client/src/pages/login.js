import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react'
import { useState } from 'react'
import Axios from 'axios'

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Layout from "../components/layout"


function LoginPage() {
    const [user_id, setUserID] = useState('');
    const [user_pass, setPassword] = useState('');

    const authenticate = () => {
        Axios.get(`http://localhost:3001/authenticate/${user_id}&${user_pass}`, {
            params: {
                user: user_id,
                pass: user_pass 
            }
        }).then((response) => {
            localStorage.setItem('User', response.data[0].User_ID);
            console.log(localStorage.getItem('User'));
            localStorage.setItem('Priv', response.data[0].Privilege);
            console.log(localStorage.getItem('Priv'));
        });
    };

    return(
        <Layout pageTitle="The Bookish Calgarian">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 class="text-center display-1">Welcome to The Bookish Calgarian.</h1>
            <p class="text-center lead">Find an affordable book today.</p>
            <p class="text-center lead"> Login to start.</p>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setUserID(e.target.value) }} />
                    </Col>
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setPassword(e.target.value) }} />
                    </Col>
                </Row>
                <Button class="btn btn-primary" onClick={() => { authenticate();  window.location.reload(); }}>Login</Button>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Layout>
           
    );

}
export default LoginPage;
