import React, {useState, useEffect} from 'react';
import useService from '../hooks/useService';
import { Link } from 'react-router-dom';
import "./Services.css";
import LayoutNF from '../components/Layout/LayoutNF';

const Services = () => {
    const services = useService();
  return (
    <LayoutNF title={"All services"}>
      <div className='srvs-body'>
      <h1 className='srvs-title'>Our Services</h1>
      <div className='divallsrvs container'>
        <div className='divallsrvs2 row'>
            {services.map((c) => (
                <div className='divallsrvs3 col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                  <Link to={`/service/${c.slug}`} className='services-btn btn-primary'>
                    {c.name}
                  </Link>
                </div>
            ))}
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default Services;