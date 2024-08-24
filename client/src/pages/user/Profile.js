import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import  toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    //context
    const [ auth, setAuth ] = useAuth();
    //state
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[phone, setPhone] = useState("");
    const[address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { firstname, lastname, email, phone, address} = auth?.user;
        setFirstname(firstname);
        setLastname(lastname);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user])
    //form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(
            `${process.env.REACT_APP_API}/api/users/profile`,{
                firstname,
                lastname, 
                email, 
                password, 
                phone, 
                address,
            });
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user:data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error('Oops.. Something went wrong, Try again');
        }
    };
  return (
    <LayoutNF title={"Profile"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <div className='form-container'>
                            <form onSubmit={handleSubmit} >
                            <h4 className='title'>Update your profile</h4>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    value={firstname}
                                    onChange={(e) =>setFirstname(e.target.value)}
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                    placeholder="Firstname"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    value={lastname}
                                    onChange={(e) =>setLastname(e.target.value)}
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                    placeholder="Lastname"
                                    autoFocus
                                />
                            </div>
                        <div className="mb-3">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                                className="form-control" 
                                id="exampleInputEmail1"
                                placeholder="Email"
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) =>setPassword(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            value={phone}
                            onChange={(e) =>setPhone(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1"
                            placeholder="Phone number"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            value={address}
                            onChange={(e) =>setAddress(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1"
                            placeholder="Address"
                        />
                    </div>
                        <button type="submit" className="btn btn-primary">
                                Update
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default Profile;