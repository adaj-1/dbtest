import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from "react"

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ), document.getElementById('root')
);
