import React from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import LayoutNF from '../components/Layout/LayoutNF';
import "./Categories.css";

const Categories = () => {
    const categories = useCategory();
  return (
    <LayoutNF title={"All categories"}>
      <div className='ctg-body'>
        <h1 className='ctg-h1'>All Categories</h1>
      <div className='div-ctg1 container'>
        <div className='div-ctg2 row'>
            {categories.map((c) => (
                <div className='div-ctg3 col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                  <Link to={`/category/${c.slug}`} className='ctg-btn btn-primary'>
                    {c.name}
                  </Link>
                </div>
            ))}
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default Categories;