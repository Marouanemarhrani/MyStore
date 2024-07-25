import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] =  useState(1);
  const [loading, setLoading] = useState(1);

  const navigate = useNavigate();

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/categories/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      };
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    };
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Error getting products');
    }
  };

  //getTotal count
  const getTotal = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error('error in product count');
    };
  };

    useEffect(() => {
      if (page === 1) return;
      loadMore();
    },[page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Fetch filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/products/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error('Error applying filters');
    }
  };

  // Handle category filter changes
  const handleFilter = (e) => {
    const { value, checked } = e.target;
    setChecked((prevChecked) =>
      checked ? [...prevChecked, value] : prevChecked.filter((id) => id !== value)
    );
  };

  // Handle price filter changes
  const handlePriceChange = (e) => {
    setRadio(e.target.value);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setChecked([]);
    setRadio([]);
    getAllProducts(); // Fetch all products after resetting filters
  };

  // Use effects for fetching data and applying filters
  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts(); // Fetch all products when no filters are applied
    }
  }, [checked, radio]);

  return (
    <Layout title={'Home'}>
      <div className='container-fluid row mt-3'>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                value={c._id}
                checked={checked.includes(c._id)}
                onChange={handleFilter}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={handlePriceChange} value={radio}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column'>
            <button
              className='btn btn-danger'
              onClick={handleResetFilters}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div className='card m-2' style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>{p.description.substring(0, 30)}...</p>
                  <p className='card-text'>€ {p.price}</p>
                  <button 
                    className='btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More details
                  </button>
                  <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length <total &&(
              <button 
                className='btn btn-warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading  ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
