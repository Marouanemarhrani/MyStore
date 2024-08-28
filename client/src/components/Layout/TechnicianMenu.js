import React from 'react';
import { NavLink } from 'react-router-dom';
import "./TechnicianMenu.css";
 
const TechnicianMenu = () => {
  return (
    <> 
      <div className='tecmenu text-center'>
        <div className="tecmenu1 list-group">
            <h4>Technician panel</h4>
                <NavLink 
                    to="/dashboard/technician/create-appointment" 
                    className="tecmenu2 list-group-item list-group-item-action"
                >
                    Create Appointment
                </NavLink>
                <NavLink 
                    to="/dashboard/technician/appointments" 
                    className="tecmenu3 list-group-item list-group-item-action"
                >
                    Appointments
                </NavLink>
        </div>
      </div>
    </>
  );
};

export default TechnicianMenu;
