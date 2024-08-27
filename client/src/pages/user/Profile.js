import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import  toast from 'react-hot-toast';
import axios from 'axios';
import "./Profile.css"

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
        <div className='profuser container-fluid'>
            <div className='profuser1 row'>
                <div className='profuser2 col-md-3'>
                    <UserMenu />
                </div>
                <div className='profuser3 col-md-9'>
                    <div className='profuser4 form-container'>
                            <form onSubmit={handleSubmit} >
                            <h4 className='profuser5 title'>Profile</h4>
                            <div className="profuser6 mb-3">
                                <input 
                                    type="text" 
                                    value={firstname}
                                    onChange={(e) =>setFirstname(e.target.value)}
                                    className="profuser7 form-control" 
                                    id="exampleInputEmail1"
                                    placeholder="Firstname"
                                    autoFocus
                                />
                            </div>
                            <div className="profuser8 mb-3">
                                <input 
                                    type="text" 
                                    value={lastname}
                                    onChange={(e) =>setLastname(e.target.value)}
                                    className="profuser9 form-control" 
                                    id="exampleInputEmail1"
                                    placeholder="Lastname"
                                    autoFocus
                                />
                            </div>
                        <div className="profuser10 mb-3">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                                className="profuser11 form-control" 
                                id="exampleInputEmail1"
                                placeholder="Email"
                                disabled
                            />
                        </div>
                        <div className="profuser12 mb-3">
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) =>setPassword(e.target.value)}
                            className="profuser13 form-control" 
                            id="exampleInputEmail1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="profuser14 mb-3">
                        <input 
                            type="text" 
                            value={phone}
                            onChange={(e) =>setPhone(e.target.value)}
                            className="profuser15 form-control" 
                            id="exampleInputEmail1"
                            placeholder="Phone number"
                        />
                    </div>
                    <div className="profuser16 mb-3">
                        <input 
                            type="text" 
                            value={address}
                            onChange={(e) =>setAddress(e.target.value)}
                            className="profuser17 form-control" 
                            id="exampleInputEmail1"
                            placeholder="Address"
                        />
                    </div>
                        <button type="submit" className="profuser18 btn btn">
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