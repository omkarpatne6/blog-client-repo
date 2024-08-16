import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Details from './screens/Details.jsx';
import Home from './screens/Home.jsx'
import React from 'react';
import Navbar from './components/Navbar'
import Scrolly from './components/Scrollprogress';
import AddNew from './screens/AddNew.jsx';
import EditBlog from './screens/EditBlog.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth_screens/Login.jsx';
import Register from './auth_screens/Register.jsx';
import MyBlogs from './screens/MyBlogs.jsx';

const App = () => {
  return (
    <>
      <Scrolly />
      <Navbar />

      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/details/:slug' element={<Details />}></Route>
        <Route exact path='/newblog' element={<AddNew />}></Route>
        <Route exact path='/editblog/:slug' element={<EditBlog />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/my-blogs' element={<MyBlogs />}></Route>
      </Routes>
    </>
  );
}

export default App;
