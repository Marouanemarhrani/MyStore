import React from 'react';
import Layout from '../../components/Layout/Layout';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import { useAuth } from '../../context/auth';

const TechnicianDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <TechnicianMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h3>Technician Name: {auth?.user?.firstname}</h3>
              <h3>Technician Email: {auth?.user?.email}</h3>
              <h3>Technician Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechnicianDashboard;
