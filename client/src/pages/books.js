import 'bootstrap/dist/css/bootstrap.min.css'

import * as React from "react"
import { useEffect, useState } from 'react'

import Form from "react-bootstrap/Form"
import Layout from "../components/layout"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Axios from 'axios'

export const BooksPage = () => {

  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState([]);

  const findBook = () => {
    Axios.get(`http://localhost:3001/api/searchBooks/${search}`).then((response) => {
      setBookList(response.data);
    });
  };

  return (
    <Layout pageTitle="Books">
      <Form>
        <Form.Group className="mb-3" controlId="formSearch">
          <Row>
            <Col xs="11">
              <Form.Control type="text" placeholder="Search books by Title, ISBN, or Author." onChange={(e) => { setSearch(e.target.value) }} />
            </Col>
            <Col xs="1">
              <button type="button" class="btn btn-primary" onClick={findBook}>Search</button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      
      <br></br>
      <p>Your search for <b>{search}</b> returned:</p>
      <br></br>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Book ID</th>
            <th scope="col">ISBN</th>
            <th scope="col">Author</th>
            <th scope="col">Quality</th>
            <th scope="col">Publication</th>
            <th scope="col">Language</th>
            <th scope="col">Genre</th>
            <th scope="col">Bookstore</th>
            <th scope="col">Shelf</th>
          </tr>
        {bookList.map((val, index) => {
          return <tr>
            <td>{index + 1}</td>
            <td>{val.Title}</td>
            <td>{val.Price}</td>
            <td>{val.Book_ID}</td> 
            <td>{val.ISBN}</td>
            <td>{val.Author}</td>
            <td>{val.Quality}</td>
            <td>{val.Publication_date}</td>
            <td>{val.Written_language}</td>
            <td>{val.Genre}</td>
            <td>{val.Bookstore}</td>
            <td>{val.Shelf}</td>
          </tr>
        })}
        </thead>
      </table>
    </Layout>
  )
}

export default BooksPage
