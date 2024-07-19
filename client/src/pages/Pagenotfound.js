import React from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import './Pagenotfound.css';

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="page-not-found">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <NavLink to="/">Go Back Home</NavLink>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
