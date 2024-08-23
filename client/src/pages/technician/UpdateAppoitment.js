import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAppointment = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [id, setId] = useState("");
    const [client, setClient] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");


    //get single product
    const getSingleAppointment = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/appointments/single-appointment/${params.slug}`
            );
            setId(data.appointment._id);
            setClient(data.appointment.client);
            setDate(data.appointment.date);
            setTime(data.appointment.time);
            setDescription(data.appointment.description);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single appointment');
        }
    };
    useEffect(() => {
        getSingleAppointment()
        //eslint-disable-next-line
    }, []);

    
    //update Appointment function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/appointments/update-appointment/${id}`,{
                    client, 
                    date, 
                    time, 
                    description,
        });
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Appointments updated successfully');
                navigate('/dashboard/technician/appointments');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in update');
        };
    };

    //delete product 
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Delete appointment?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/appointments/appointment/${id}`
            );
            toast.success('Appointment deleted successfully');
            navigate('/dashboard/technician/appointments');
        } catch (error) {
            console.log(error);
            toast.error('Something wrong in delete');
        };
    };
  return (
    <Layout title={"Dashboard - Update Appointment"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <TechnicianMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Update Technician</h1>
                    <div className='m-1 w-75'>
                         <div className='mb-3'>
                            <input 
                                type="text"
                                value ={client}
                                placeholder="write a client"
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
                                onChange={(e) => setTime(e.target.value)}
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
                                onClick={handleUpdate}
                            >
                                Update Appoitment
                            </button>
                        </div> 
                        <div className='mb-3'>
                            <button 
                                className='btn btn-danger'
                                onClick={handleDelete}
                            >
                                Delete Appointment
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateAppointment;