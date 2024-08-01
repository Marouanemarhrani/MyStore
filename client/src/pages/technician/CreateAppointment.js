import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
    const navigate =useNavigate();
    const [client, setClient] = useState("");
    const [date, setDate] = useState("");
    const [time, setPrice] = useState("");
    const [description, setDescription] = useState("");

    
    //create product function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const {data} = axios.post(
                `${process.env.REACT_APP_API}/api/appointments/create-appointment`, {
                    client,
                    date,
                    time,
                    description,
        });
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Appointments created successfully');
                navigate('/dashboard/technician/appointments');
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in create');
        };
    };
  return (
    <Layout title={"Dashboard - Create Product"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <TechnicianMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Create Appointment</h1>
                    <div className='m-1 w-75'>
                         <div className='mb-3'>
                            <input 
                                type="text"
                                value ={client}
                                placeholder="write a client name"
                                className="form-control"
                                onChange={(e) => setClient(e.target.value)}
                            />
                         </div>
                         <div className='mb-3'>
                            <input 
                                type="date"
                                value={date}
                                placeholder="Select a date"
                                className="form-control"
                                onChange={(e) => setDate(e.target.value)}
                            />
                         </div>
                         <div className='mb-3'>
                            <input 
                                type="text"
                                value ={time}
                                placeholder="write a time"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='mb-3'>
                            <input 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                        <div className='mb-3'>
                            <button 
                                className='btn btn-primary'
                                onClick={handleCreate}
                            >
                                Create Appointments
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default CreateAppointment;
