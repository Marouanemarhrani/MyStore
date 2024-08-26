import React from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <LayoutNF>
      <div className='adm container-fluid'>
        <div className='adm1 row'>
          <div className='adm2 col-md-3'>
            <AdminMenu />
          </div>
          <div className='adm3 col-md-9'>
            <div className='adm4 card p-3'>
              <h3>Admin Name: {auth?.user?.firstname}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default AdminDashboard;
