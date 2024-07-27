import React, {useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
          <h1 className='text-center'>Service Details</h1>
          <h6>Name : {service.name}</h6>
          <h6>Description : {service.description}</h6>
          <h6>Price : {service.price}</h6>
          <h6>Duration : {service?.duration}</h6>
          <button className='btn btn-secondary ms-1'>Book an appointement</button>
        </div>
      </div>
      
    </Layout>
  )
};

export default ServiceDetails;
