import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import AdminMenu from '../../components/Layout/AdminMenu';
import "./SellOffers.css";

const SellOffers = () => {
    const [offers, setOffers] = useState([]);

    //get all sells 
    const getAllSells = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/sells/get-sell`
            );
            setOffers(data.sells);
        } catch (error) {
            console.log(error);
            toast.error('error in get sells');
        }
    };

    useEffect(()=> {
        getAllSells();
    }, []);
  return (
    <LayoutNF>
        <div className='app container-fluid '>
        <div className='app1 row'>
            <div className='app2 col-md-3'>
                <AdminMenu />
            </div>
            <div className='app3 col-md-9'>
                <h1 className='app4 text-center'>All Sells Offer List </h1>
                <div className='app5 d-flex'>
                    {offers?.map((p) => (
                        <Link 
                            key={p._id}
                            className='app6 appointment-link'
                        >
                            <div className="app7 card m-2" style={{width: '18rem'}}>
                                
                                <div className="app8 card-body">
                                    <h5 className="app9 card-title">device Name: {p.deviceName}</h5>
                                    <p className="app10 card-text">estimated Price: {p.estimatedPrice}</p>
                                    <p className="app11 card-text">user Offer: {p.userOffer}</p>
                                    <p className="app11 card-text">phone Number: {p.phoneNumber}</p>
                                    <p className="app11 card-text">status: {p.status}</p>
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

export default SellOffers;
