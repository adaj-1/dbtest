import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react";
import { useEffect, useState } from 'react';
import Layout from "../components/layout";
import Axios from 'axios';

export const ProfilePage = () => {
  const testUser = localStorage.getItem('User');

  const [userList, setUserList] = useState('');
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {

    Axios.get(`http://localhost:3001/api/searchUsers/${testUser}`).then((response) => {
      setUserList(response.data);
    });

    Axios.get(`http://localhost:3001/api/searchPurchase/${testUser}`).then((response) => {
      setPurchaseList(response.data);
    });

  },[]);
  /*
  {userList && (
      <p>
        According to your purchase and sales history, you are eligible for <b>{userList[0].Buyer_discount_usage}</b> remaining buyer discounts and <b>{userList[0].Seller_discount_usage}</b> remaining seller discounts!
      </p>
      )}

  */

  return (
    <Layout pageTitle="My Profile">
      <h1 class="text-center display-4">My Profile</h1>
    
      <h3>My Purchase History</h3>
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
          {purchaseList.map((val, index) => {
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

export default ProfilePage
