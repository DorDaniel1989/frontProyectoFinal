import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';
import Admin from './views/Admin';
import Profile from './views/Profile';
import Register from './views/Register';
import Details from './views/Details';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <Router>
  <Routes>
     <Route exact path="/" element={<Home/>}/>
     <Route exact path="/admin" element={<Admin/>}/>
     <Route exact path="/profile" element={<Profile/>}/>
     <Route exact path="/register" element={<Register/>}/>
     <Route exact path="/details/:Id" element={<Details/>}/>
 </Routes>
</Router>,
  document.getElementById('root')
);

