import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import "./Appointments.css";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    //get all appointments
    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/appointments/appointments`
            );
            setAppointments(data.appointments);
        } catch (error) {
            console.log(error);
            toast.error('error in get appointments');
        }
    };

    useEffect(()=> {
        getAllAppointments();
    }, []);
  return (
    <LayoutNF>
        <div className='app container-fluid '>
        <div className='app1 row'>
            <div className='app2 col-md-3'>
                <TechnicianMenu />
            </div>
            <div className='app3 col-md-9'>
                <h1 className='app4 text-center'>All Appointment List </h1>
                <div className='app5 d-flex'>
                    {appointments?.map((p) => (
                        <Link 
                            key={p._id}
                            to={`/dashboard/technician/appointment/${p.lastname}/${p.firstname}`}
                            className='app6 appointment-link'
                        >
                            <div className="app7 card m-2" style={{width: '18rem'}}>
                                
                                <div className="app8 card-body">
                                    <h5 className="app9 card-title">{p.firstname} {p.lastname}</h5>
                                    <p className="app10 card-text">{p.date}</p>
                                    <p className="app11 card-text">{p.time}</p>
                                    <p className="app11 card-text">{p.status}</p>
                                </div>
                            </div>
                        </Link>    
                    ))}
                </div>
            </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default Appointments;
