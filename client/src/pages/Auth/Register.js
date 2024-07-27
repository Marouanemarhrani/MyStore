import React, {useState} from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import  toast from "react-hot-toast";
import "./Register.css";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/register`, {
                firstname, 
                lastname, 
                email, 
                password, 
                phone, 
                address,
            });
            if(res && res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error); 
            toast.error('Something went wrong');
        }
    };
  return (
    <Layout title = "Register">
      <div className='register'>
        <form onSubmit={handleSubmit}>
            <h1 className='title'>Register Page</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                    FirstName
                </label>
                <input 
                    type="text" 
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="form-control" 
                    id="exampleInputName" 
                    placeholder='Enter your firstname'
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                    LastName
                </label>
                <input 
                    type="text" 
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="form-control" 
                    id="exampleInputName"
                    placeholder='Enter your lastname'
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                </label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder='Enter your email'
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <input 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder='Enter your password'
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                    Phone
                </label>
                <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder='Enter your phone number'
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                </label>
                <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1"
                    placeholder='Enter your address' 
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
      </div>
    </Layout>
  )
}

export default Register;
