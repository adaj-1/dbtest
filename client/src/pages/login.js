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
    // citation: https://blog.logrocket.com/how-to-secure-react-app-login-authentication/
    const auth = async () => {
        try {
            const res = await Axios.get('http://localhost:3001/authenticate', { auth: { username: user_id, password: user_pass } });
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    // end of citation

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
                <Button class="btn btn-primary" onClick={auth}>Login</Button>
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
