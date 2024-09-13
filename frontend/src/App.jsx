import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateBlogPost from './components/CreateBlogPost';
import ListBlogPost from './components/ListBlogPost';
import BlogDetails from './components/BlogDetails';
import EditBlogPost from './components/EditBlogPost';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import NotFound from './NotFound';
import Layout from './components/Layout';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute ';
import MyProfile from './components/MyProfile';
import ResetPasswordConfirm from './components/ResetPasswordConfirm ';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<PrivateRoute element={Home} />} />
          <Route path="/list-posts" element={<PrivateRoute element={ListBlogPost} />} />
          <Route path="/create" element={<PrivateRoute element={CreateBlogPost} />} />
          <Route path="/profile" element={<PrivateRoute element={MyProfile} />} />
          <Route path="/posts/:id" element={<PrivateRoute element={BlogDetails} />} />
          <Route path="/posts/:id/edit" element={<PrivateRoute element={EditBlogPost} />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password_confirm/:uid/:token" element={<ResetPasswordConfirm />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
