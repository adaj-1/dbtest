import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react'

import { useEffect, useState } from 'react'

import Alert from "react-bootstrap/Alert"
import Axios from 'axios'
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Layout from "../components/layout"
import Row from "react-bootstrap/Row"

function HomePage() {

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
    </Layout>
  );
}
export default HomePage;
