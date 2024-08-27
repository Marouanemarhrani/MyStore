import React from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';

const Users = () => {
  return (
    <LayoutNF title={"Dashboard - All users"}>
        <div className='container-fluid '>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>All Users</h1>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default Users
