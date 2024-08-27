import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LayoutNF from '../components/Layout/LayoutNF';
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const params = useParams();
  const [service, setService] = useState({});

  //initalp details
  useEffect(() =>{
    if(params?.slug) getService()
  }, [params?.slug]);
  //get Service
  const getService = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/services/single-service/${params.slug}`
      );
      setService(data?.service);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutNF>
      <div className='services-body'>
      <div className='divsrvsdetails row container mt-2'>
          <h1 className='div2-h1 text-center'>Service Details</h1>
        <div className='div-srvs1 col-md-6'>

          <h6 className='div3-h6'>Name : {service.name}</h6>
          <h6 className='div3-h6'>Description : {service.description}</h6>
          <h6 className='div3-h6'>Price : {service.price}</h6>
          <h6 className='div3-h6'>Duration : {service?.duration}</h6>
          <button className='book-btn-secondary ms-1'>Book an appointement</button>
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default ServiceDetails; 
