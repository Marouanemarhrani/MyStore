import React from 'react';
import { NavLink } from 'react-router-dom';
 
const TechnicianMenu = () => {
  return (
    <> 
      <div className='text-center'>
        <div className="list-group">
            <h4>Technician panel</h4>
                <NavLink 
                    to="/dashboard/technician/create-appointment" 
                    className="list-group-item list-group-item-action"
                >
                    Create Appointment
                </NavLink>
                <NavLink 
                    to="/dashboard/technician/appointments" 
                    className="list-group-item list-group-item-action"
                >
                    Appointments
                </NavLink>
                <NavLink 
                    to="/dashboard/technician/orders" 
                    className="list-group-item list-group-item-action"
                >
                    Orders
                </NavLink>
        </div>
      </div>
    </>
  );
};

export default TechnicianMenu;
