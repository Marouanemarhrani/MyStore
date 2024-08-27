import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import TechnicianMenu from '../../components/Layout/TechnicianMenu';

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
    <Layout>
        <div className='container-fluid '>
      <div className='row'>
        <div className='col-md-3'>
            <TechnicianMenu />
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Appointment List </h1>
            <div className='d-flex'>
                {appointments?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/technician/appointment/${p.slug}`}
                        className='appointment-link'
                    >
                        <div className="card m-2" style={{width: '18rem'}}>
                            
                            <div className="card-body">
                                <h5 className="card-title">{p.client}</h5>
                                <p className="card-text">{p.date}</p>
                                <p className="card-text">{p.time}</p>
                            </div>
                        </div>
                    </Link>    
                ))}
            </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Appointments;
