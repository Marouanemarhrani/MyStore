import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import TechnicianMenu from '../../components/Layout/TechnicianMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateAppointment.css";

const UpdateAppointment = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [id, setId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");


    //get single product
    const getSingleAppointment = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/appointments/single-appointment/${params.lastname}`
            );
            const formattedDate = new Date(data.appointment.date).toISOString().split('T')[0];
            
            setId(data.appointment._id);
            setFirstname(data.appointment.firstname);
            setLastname(data.appointment.lastname);
            setEmail(data.appointment.email);
            setPhone(data.appointment.phone);
            
            setDate(formattedDate);
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
                    firstname,
                    lastname,
                    email,
                    phone, 
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
        <div className='upapp container-fluid '>
            <div className='upapp1 row'>
                <div className='upapp2 col-md-3'>
                    <TechnicianMenu />
                </div>
                <div className='upapp3 col-md-9'>
                    <h1>Update Appointment</h1>
                    <div className='upapp4 m-1 w-75'>
                         <div className='upapp5 mb-3'>
                            <input 
                                type="text"
                                value ={firstname}
                                placeholder="write a firstname"
                                className="upapp6 form-control"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                         </div>
                         <div className='upapp5 mb-3'>
                            <input 
                                type="text"
                                value ={lastname}
                                placeholder="write a lastname"
                                className="upapp6 form-control"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                         </div>
                         <div className='upapp5 mb-3'>
                            <input 
                                type="text"
                                value ={email}
                                placeholder="write a email"
                                className="upapp6 form-control"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                         </div>
                         <div className='upapp5 mb-3'>
                            <input 
                                type="text"
                                value ={phone}
                                placeholder="write a phone"
                                className="upapp6 form-control"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                         </div>
                         <div className='upapp7 mb-3'>
                            <input 
                                type="date"
                                value={date}
                                placeholder="Select a date"
                                className="upapp8 form-control"
                                onChange={(e) => setDate(e.target.value)}
                            />
                         </div>
                         <div className='mb-3'>
                            <input 
                                type="text"
                                value ={time}
                                placeholder="write a time"
                                className="upapp9 form-control"
                                onChange={(e) => setTime(e.target.value)}
                            />
                         </div>
                         <div className='mb-3'>
                            <textarea 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="upapp10 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                        <div className='mb-3'>
                            <button 
                                className='upapp11 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Appoitment
                            </button>
                        </div> 
                        <div className='upapp12 mb-3'>
                            <button 
                                className='upapp13btn btn'
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
