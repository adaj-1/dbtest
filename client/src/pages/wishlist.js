import 'bootstrap/dist/css/bootstrap.min.css'

import * as React from "react"
import { useEffect, useState } from 'react';
import Layout from "../components/layout"
import Axios from 'axios';

export const WishlistPage = () => {
  const testUser = localStorage.getItem('User');

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/wishlistBooks/${testUser}`).then((response) => {
      setBookList(response.data);
    }) 
  }, [])  
  
  const deleteWishlist = (book_id) => {
    Axios.delete(`http://localhost:3001/api/deleteWishlist/${testUser}&${book_id}`);
  };

  const buyBook = (id) => {
    Axios.put("http://localhost:3001/api/buyBook", {
      User: testUser,
      book_id: id
    });
    
    deleteWishlist(id);
  }

  console.log(bookList.wish);

  return (
    <Layout pageTitle="My Wishlist">
      
      <h3>My Wishlist</h3>
      {bookList && (
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
            <th scope="col">Wishlist</th>
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
              <td>
                <button type='button' className="btn btn-danger btn-sm mx-1" onClick={() => { deleteWishlist(val.Book_ID); window.location.reload(); }}>Delete</button>
                <button type='button' className="btn btn-primary btn-sm" onClick={() => { buyBook(val.Book_ID); window.location.reload(); }}>Buy</button>
              </td>
            </tr>
          })}
        </thead>
      </table>
      )}
    </Layout>
  )
}

export default WishlistPage
