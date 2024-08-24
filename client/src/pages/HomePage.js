import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import { IoMdClose } from "react-icons/io";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image from "./../data/image.jpg";
import image1 from "./../data/image1.jpg";
import image2 from "./../data/image2.jpg";
import image3 from "./../data/image3.jpg";
import image4 from "./../data/image4.jpg";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [cart, setCart] = useCart();
  const [showBanner, setShowBanner] = useState(true);

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
      const { data } = await axios.get(
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
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      {showBanner && (
        <div className='home banner'>
          <span className='home1 banner-text'>
            Estimate your phone price in a second
            <Link to='/login' className='banner-link'>
              Try Now!
            </Link>
          </span>
          <span className='home2 banner-close' onClick={() => setShowBanner(false)}>
            <IoMdClose />
          </span>
        </div>
      )}
      <div className="home24 carousel-container">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
        >
          <div>
            <img src={image} alt="Slide 1" />
            <div className="home25 ">
              <button className="home26 banner-button">Learn More</button>
            </div>
          </div>
          <div>
            <img src={image1} alt="Slide 2" />
            <div className="home27 ">
              <button className="home28 banner-button">Learn More</button>
            </div>
          </div>
          <div>
            <img src={image2} alt="Slide 3" />
            <div className="home29 ">
              <button className="home30 banner-button">Learn More</button>
            </div>
          </div>
          <div>
            <img src={image3} alt="Slide 4" />
            <div className="home31">
              <button className="home32 banner-button">Learn More</button>
            </div>
          </div>
        </Carousel>
      </div>
      <div className='home3 container-fluid row mt-3'>
        <div className='home4 col-md-2'>
          <h5 className='home5 text-center'>Filter By Category</h5>
          <div className='home6 d-flex flex-column'>
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
          <h5 className='home7 text-center mt-4'>Filter By Price</h5>
          <div className='home8 d-flex flex-column'>
            <Radio.Group onChange={handlePriceChange} value={radio}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='home9 d-flex flex-column'>
            <button className='home10 btn btn-danger' onClick={handleResetFilters}>
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className='home11 col-md-8 offset-1'>
          <div className='home12'>
            <h5>All Products</h5>
            <h10>Enjoy our bunch of products...</h10>
          </div>
          <div className='home13 d-flex flex-wrap'>
            {products?.map((p) => (
              <div className='home14 card m-2' style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                  className='home15 card-img-top'
                  alt={p.name}
                />
                <div className='home16 card-body'>
                  <h5 className='home17 card-title'>{p.name}</h5>
                  <p className='home18 card-text'>{p.description.substring(0, 30)}...</p>
                  <p className='home19 card-text'>{p.price} €</p>
                  <div className='home26-buttons'>
                    <button
                      className='home20 btn btn-primary ms-1'
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className='home21 btn btn-secondary ms-1'
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success('Item added to cart');
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='home22 m-2 p-3'>
            {products && products.length < total && (
              <button
                className='home23 btn '
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load more'}
              </button>
            )}
          </div>
        </div>
        <div className="container-fluid row mt-3">
          <div className="col-md-8 offset-md-2">
            <div className="products-section">
            </div>
            <div className="home36">
              <h5>Know us more</h5>
            </div>
            <div className="home27-banner-section col-md-12">
              <div className="home28-banner">
                <img src={image4} alt="Banner 1" className="home29-banner-image" />
              </div>
              <div className="home30-banner">
                <img src={image4} alt="Banner 2" className="home31-banner-image" />
              </div>
              <div className="home32-banner video-banner">
                <video className="home33-banner-video" controls src="video1.mp4" alt="Video 1"></video>
              </div>
              <div className="home34-banner video-banner">
                <video className="home35-banner-video" controls src="video2.mp4" alt="Video 2"></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
