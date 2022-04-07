import * as React from 'react'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import BooksPage from './pages/books';
import CustomersPage from './pages/customers';
import HomePage from './pages/home';
import NotFoundPage from './pages/404';
import ProfilePage from './pages/profile';
import SellPage from './pages/sell';
import WishlistPage from './pages/wishlist';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/books" element={<BooksPage />} />
          <Route exact path="/customers" element={<CustomersPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/sell" element={<SellPage />} />
          <Route exact path="/wishlist" element={<WishlistPage />} />
          <Route exact path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
