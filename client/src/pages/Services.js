import React, {useState, useEffect} from 'react';
import useService from '../hooks/useService';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Services = () => {
    const services = useService();
  return (
    <Layout title={"All services"}>
      <div className='container'>
        <div className='row'>
            {services.map((c) => (
                <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                  <Link to={`/service/${c.slug}`} className='btn btn-primary'>
                    {c.name}
                  </Link>
                </div>
            ))}  
        </div>
      </div>
    </Layout>
  )
};

export default Services;
