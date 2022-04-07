import 'bootstrap/dist/css/bootstrap.min.css'

import * as React from "react"

import Layout from "../components/layout"

import App from './App';

const IndexPage = () => {
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
  )
}

exports.replaceHydrateFunction = () => {
  return (<App/>, document.getElementById("root")) => {
    console.log("rendering!");
    ReactDOM.render(<App />, document.getElementById("root"));
  };
}

export default IndexPage
