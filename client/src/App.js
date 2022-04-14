import * as React from 'react'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import BooksPage from './pages/books';
import CustomersPage from './pages/customers';
import HomePage from './pages/home';
import NotFoundPage from './pages/404';
import ProfilePage from './pages/profile';
import WishlistPage from './pages/wishlist';
import StorePage from './pages/store';
import LoginPage from './pages/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} /> 
          <Route exact path="/books" element={<BooksPage />} />
          <Route exact path="/customers" element={<CustomersPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/store" element={<StorePage />} />
          <Route exact path="/wishlist" element={<WishlistPage />} />
          <Route exact path="/404" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
