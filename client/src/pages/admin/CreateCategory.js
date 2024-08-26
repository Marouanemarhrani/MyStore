import  React, {useEffect, useState}  from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';
import './CreateCategory.css';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //Handle Form
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post(
                `${process.env.REACT_APP_API}/api/categories/create-category`,{
                name,
            });
            if(data?.success){
                toast.success(`${name} created`);
                getAllCategory();
            }else{
                toast.error(data.message);
            };
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form');
        };
    };
    //get all categories
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/categories/get-category`
            );
            if(data?.success){
                setCategories(data?.category);
            };
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        };
    };
    useEffect(() => {
        getAllCategory();
    },[]);

    //update category
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(
                `${process.env.REACT_APP_API}/api/categories/update-category/${selected._id}`, 
                 {name:updatedName}
            );
            if(data.success){
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something wrong in update category');
        };
    };

    //delete category
    const handleDelete = async(pId) => {
        try {
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/categories/delete-category/${pId}`,
            );
            if(data.success){
                toast.success(`${name} is deleted`);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something wrong in update category');
        };
    };
  return (
    <LayoutNF title={"Dashboard - Create Category"}>
    <div className='ccat container-fluid '>
        <div className='ccat1 row'>
            <div className='ccat2 col-md-3'>
                <AdminMenu />
            </div>
            <div className='ccat3 col-md-9'>
                <h1>Manage Categories</h1>
                <div className='ccat4 p-3 w-50'>
                    <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                    />
                </div>
                <div className='ccat5 w-75'>
                    <table className="ccat6 table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categories?.map((c) => (
                            <>
                                <tr>
                                    <td key={c._id}>{c.name}</td>
                                    <td>
                                        <button 
                                            className='ccat7 btn btn ms-2'
                                            onClick={() => {
                                                setVisible(true);  
                                                setUpdatedName(c.name);
                                                setSelected(c);
                                            }}
                                            >
                                            Edit
                                        </button>
                                        <button 
                                            className='ccat8 btn btn ms-2'
                                            onClick={() => {handleDelete(c._id)}}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Modal 
                    onCancel={() => setVisible(false)} 
                    footer={null}
                    visible={visible}
                >
                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                </Modal>
            </div>
        </div>
    </div>
    </LayoutNF>
  );
};

export default CreateCategory;
