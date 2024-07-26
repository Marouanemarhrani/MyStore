import React, {useState, useEffect} from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div className='container'>
        <div className='row'>
            {categories.map((c) => (
                <div className='col-md-6'>
                    <button className='btn btn-primary'>
                        <Link to="/">
                            {c.name}
                        </Link>
                    </button>
                </div>
            ))}  
        </div>
      </div>
    </Layout>
  )
};

export default Categories;
