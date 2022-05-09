import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";
import './index.css';
import Home from './views/Home';
import AdminCMS from './views/Admin';
import Admin from './views/AdminLogin';
import Profile from './views/Profile'
import VisitProfile from './views/VisitProfile';
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
     <Route exact path="/adminCMS" element={<AdminCMS/>}/>
     <Route exact path="/profile/:Id" element={<Profile/>}/>
     <Route exact path="/visitProfile/:Id" element={<VisitProfile/>}/>
     <Route exact path="/register" element={<Register/>}/>
     <Route exact path="/details/:Id" element={<Details/>}/>
 </Routes>
</Router>,
  document.getElementById('root')
);

