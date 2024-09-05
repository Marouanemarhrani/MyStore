import React from 'react';
import useService from '../hooks/useService';
import {useNavigate } from 'react-router-dom';
import "./Services.css";
import LayoutNF from '../components/Layout/LayoutNF';

const ServicesAdmin = () => {
    const services = useService();
    const navigate = useNavigate();
  return (
    <LayoutNF title={"All services"}>
      <div className='srvs-body'>
      <h1 className='srvs-title'>Our Services</h1>
      <div className='divallsrvs container'>
        <div className='divallsrvs2 row'>
            {services.map((c) => (
                <div className='divallsrvs3 col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                  <div className="div-srvs2">
                    <img
                      src={`${process.env.REACT_APP_API}/api/services/service/photoURL/${c._id}`}
                      className="srvcphoto"
                      alt={c.name}
                    />
                  </div>
                  <button 
                    onClick={() => navigate(`/service/${c.slug}`)}
                    className='services-btn btn '>
                      {c.name}
                  </button>
                </div>
            ))}
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default ServicesAdmin;