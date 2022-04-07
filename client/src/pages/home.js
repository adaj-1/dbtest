import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react'

import {useEffect, useState} from 'react'

import Alert from "react-bootstrap/Alert"
import Axios from 'axios'
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Layout from "../components/layout"
import Row from "react-bootstrap/Row"

function HomePage() {

  const [numbertest, setNumber] = useState('');
  const [nametest, setName] = useState('');
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/gettestme').then((response) => {
      setNameList(response.data);
    })
  }, [])

  const submitTest = () => {
    Axios.post('http://localhost:3001/api/insert',
    {number_test: numbertest, name_test: nametest}).then(() => {
      Alert('successful insert');
    });
  };

  return (
    <Layout pageTitle="The Bookish Calgarian">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 class="text-center display-1">Welcome to The Bookish Calgarian.</h1>
      <p class="text-center lead">Find an affordable book today.</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div>
        <p>Please key in information for the book you are selling here.</p>
        <Form>
          <Row>
            <Col>
              <Form.Label>Number</Form.Label>
              <Form.Control type="number" placeholder="test" onChange={(e)=> {setNumber(e.target.value)}}/>
            </Col>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="test" onChange={(e) => { setName(e.target.value) }} />
            </Col>
          </Row>

          <Button class="btn btn-primary" onClick={submitTest}>Submit</Button>

          {nameList.map((val) => {
            return <h1> Numbers: {val.number} | Names: {val.name}</h1>
          })}

        </Form>
      </div >

    </Layout>
  );
}
export default HomePage;
