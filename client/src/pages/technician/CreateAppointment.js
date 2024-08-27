import React, {useState} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CreateAppointment.css";

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
    <LayoutNF title={"Dashboard - Create Appointment"}>
        <div className='capp container-fluid '>
            <div className='capp1 row'>
                <div className='capp2 col-md-3'>
                    <TechnicianMenu />
                </div>
                <div className='capp3 col-md-9'>
                    <h1>Create Appointment</h1>
                    <div className='capp4 m-1 w-75'>
                         <div className='capp5 mb-3'>
                            <input 
                                type="text"
                                value ={client}
                                placeholder="write a client name"
                                className="capp6 form-control"
                                onChange={(e) => setClient(e.target.value)}
                            />
                         </div>
                         <div className='capp7 mb-3'>
                            <input 
                                type="date"
                                value={date}
                                placeholder="Select a date"
                                className="capp8 form-control"
                                onChange={(e) => setDate(e.target.value)}
                            />
                         </div>
                         <div className='capp9 mb-3'>
                            <input 
                                type="text"
                                value ={time}
                                placeholder="write a time"
                                className="capp10 form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='capp11 mb-3'>
                            <input 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="capp11 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                        <div className='capp12 mb-3'>
                            <button 
                                className='capp13 btn btn'
                                onClick={handleCreate}
                            >
                                Create Appointments
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default CreateAppointment;
