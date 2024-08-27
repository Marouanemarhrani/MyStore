import React from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import { useAuth } from '../../context/auth';
import "./TechnicianDashboard.css"; // Create and link your CSS file

const TechnicianDashboard = () => {
  const [auth] = useAuth();

  return (
    <LayoutNF title={"Technician Dashboard"}>
      <div className='techDashboard container-fluid m-3 p-3'>
        <div className='techDashRow row'>
          <div className='techMenu col-md-3'>
            <TechnicianMenu />
          </div>
          <div className='techDashContent col-md-9'>
            <div className='techCard w-75 p-3'>
              <h4 className='techInfoTitle'>Technician Information</h4>
              <div className='techCardContent'>
                <span className='techLabel'>Full Name :</span>
                <span className='techInfo'>{auth?.user?.firstname} {auth?.user?.lastname}</span>

                <span className='techLabel'>Email :</span>
                <span className='techInfo'>{auth?.user?.email}</span>

                <span className='techLabel'>Phone :</span>
                <span className='techInfo'>{auth?.user?.phone}</span>

                <span className='techLabel'>Address :</span>
                <span className='techInfo'>{auth?.user?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default TechnicianDashboard;
