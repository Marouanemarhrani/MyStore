import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateBrand.css";

const UpdateBrand = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single brand
    const getSingleBrand = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/brands/single-brand/${params.slug}`
            );
            setName(data.brand.name);
            setId(data.brand._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single brand');
        }
    };
    useEffect(() => {
        getSingleBrand()
        //eslint-disable-next-line
    }, []);

        //update brand
        const handleUpdate = async (e) => {
            e.preventDefault()
            try {
                const brandData = new FormData();
                brandData.append("name", name);
                photo && brandData.append("photo", photo);
                const {data} = axios.put(
                    `${process.env.REACT_APP_API}/api/brands/update-brand/${id}`,
                        brandData
                );
                if(data?.success){
                    toast.error(data?.message);
                }else{
                    toast.success('Brand updated successfully');
                    navigate('/dashboard/admin/brands');
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong in update');
            };
        };
    
        //delete brand
        const handleDelete = async() => {
            try {
                let answer = window.prompt('Delete brand?');
                if(!answer) return;
                const {data} = await axios.delete(
                    `${process.env.REACT_APP_API}/api/brands/delete-brand/${id}`
                );
                toast.success('Brand deleted successfully');
                navigate('/dashboard/admin/brands');
            } catch (error) {
                console.log(error);
                toast.error('Something wrong in delete');
            };
        };
  return (
    <LayoutNF title={"Dashboard - Update Brands"}>
        <div className='upbrd container-fluid '>
            <div className='upbrd1 row'>
                <div className='upbrd2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='upbrd3 col-md-9'>
                    <h1>Update Brands</h1>
                    <div className='upbrd4 m-1 w-75'>
                         <div className='upbrd6 mb-3'>
                            <label 
                                className='upbrd7 btn btn-outline-secondary col-md-12'
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
                         <div className='upbrd8 mb-3'>
                            {photo ? (
                                <div className='upbrd9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="brand-photo"
                                        height={'200px'} 
                                        className='upbrd10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='upbrd11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/brands/brand/photoURL/${id}`} 
                                    alt="brand-photo"
                                    height={'200px'} 
                                    className='upbrd12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='upbrd13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="upbrd14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='upbrd20 mb-3'>
                            <button 
                                className='upbrd21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Brand
                            </button>
                        </div> 
                        <div className='upbrd22 mb-3'>
                            <button 
                                className='upbrd23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Brand
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateBrand;
