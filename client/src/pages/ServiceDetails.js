import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LayoutNF from '../components/Layout/LayoutNF';
import "./ServiceDetails.css";
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const ServiceDetails = () => {
  const params = useParams();
  const [service, setService] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  //initalp details
  useEffect(() =>{
    if(params?.slug) getService()
  }, [params?.slug]);
  //get Service
  const getService = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/services/single-service/${params.slug}`
      );
      setService(data?.service);
    } catch (error) {
      console.log(error);
      toast.error("error in getting the service details")
    }
  };

  //book apoointment
  const handleRequest = async (e) => {
    e.preventDefault()
    try {
        const {data} = axios.post(
            `${process.env.REACT_APP_API}/api/appointments/create-appointment`, {
                firstname,
                lastname,
                email,
                phone,
                description,
    });
        if(data?.success){
            toast.error(data?.message);
        }else{
            toast.success('Appointments requested successfully');
            setShowModal(false)
        }
    } catch (error) {
        console.log(error);
        toast.error('Somthing went wrong in requesting');
    };
};

  return (
    <LayoutNF>
      <div className='services-body'>
      <div className='divsrvsdetails row container mt-2'>
          <h1 className='div2-h1 text-center'>Service Details</h1>
        <div className='div-srvs1 col-md-6'>
        <div className="div-srvs2">
            <img
              src={`${process.env.REACT_APP_API}/api/services/service/photoURL/${service._id}`}
              className="dtls3"
              alt={service.name}
            />
          </div>
          <h6 className='div3-h6'>Name : {service.name}</h6>
          <h6 className='div3-h6'>Description : {service.description}</h6>
          <h6 className='div3-h6'>Price : {service.price}</h6>
          <h6 className='div3-h6'>Duration : {service?.duration}</h6>
          <button className='book-btn ms-1 ' onClick={() => setShowModal(true)}>Book an appointement</button>
          <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="submit booking"
                className="book-Modal"
                overlayClassName="Overlay"
            >
                <h2>Book an appointment</h2>
                <form onSubmit={handleRequest} >
                    <input 
                        type="text" 
                        onChange={(e) =>setFirstname(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Firstname"
                        className="book1 form-control mb-3"
                        autofocus
                    />
                    <input 
                        type="text" 
                        onChange={(e) =>setLastname(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Lastname"
                        className="book1 form-control mb-3"
                        autofocus
                    />
                    <input 
                        type="text" 
                        onChange={(e) =>setEmail(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Contact email"
                        className="book1 form-control mb-3"
                        autofocus
                    />
                    <input 
                        type="text" 
                        onChange={(e) =>setPhone(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Contact phone"
                        className="book2 form-control mb-3"
                        autofocus
                    />
                    <textarea 
                        type="text" 
                        onChange={(e) =>setDescription(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Describe you problem"
                        className="book3 form-control mb-3"
                        autofocus
                    />
                    <button type="submit" className="book4 btn">Submit request</button>
                    <button className="book5 btn" onClick={() => setShowModal(false)}>Cancel</button>
                </form>
            </Modal>
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default ServiceDetails; 
