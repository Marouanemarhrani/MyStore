import  React, {useState}  from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBrand.css';

const CreateBrand = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    //Handle Form
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const brandData = new FormData();
            brandData.append("name", name);
            brandData.append("photo", photo);
            const {data} = await axios.post(
                `${process.env.REACT_APP_API}/api/brands/create-brand`,
                brandData,
            );
            if(data?.success){
                toast.success('Brand created successfully');
                navigate('/dashboard/admin/brands');
            }else{
                toast.error('Error in creating');
            };
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form');
        };
    };
  return (
    <LayoutNF title={"Dashboard - Create Brand"}>
    <div className='cbrnd container-fluid '>
        <div className='cbrnd1 row'>
            <div className='cbrnd2 col-md-3'>
                <AdminMenu />
            </div>
            <div className='cbrnd3 col-md-9'>
                <h1>Manage Brands</h1>
                <div className='cbrnd4 p-3 w-50'>
                    <div className='cbrnd5 mb-3'>
                        <input 
                            type="text"
                            value ={name}
                            placeholder="write a name"
                            className="cbrnd13 form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='cbrnd6 mb-3'>
                        <label 
                            className='cbrnd7 btn btn-outline-secondary col-md-12'
                        >
                            {photo ? photo.name : "upload Photo" }
                            <input 
                                type="file" 
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])} 
                                hidden 
                            />
                        </label>
                    </div>
                    <div className='cbrnd8 mb-3'>
                        {photo && (
                            <div className='cbrnd9 text-center'> 
                                <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt="brand-photo"
                                    height={'200px'} 
                                    className='cbrnd10 img-responsive'
                                />
                            </div>
                        )}
                    </div>
                    <div className='cbrnd11 mb-3'>
                        <button 
                            className='cbrnd12 btn btn-primary'
                            onClick={handleSubmit}
                        >
                            Create Brand
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    </LayoutNF>
  );
};

export default CreateBrand;
