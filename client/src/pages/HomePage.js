import React, { useState, useEffect, useRef  } from 'react';
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
import image from "./../data/image.png";
import image1 from "./../data/image1.png";
import image2 from "./../data/image2.png";
import image3 from "./../data/image3.png";
import banner from "./../data/banner.png";
import banner1 from "./../data/banner1.png";
import banner2 from "./../data/banner2.png";
import banner3 from "./../data/banner3.png";
import filterimage from "./../data/filter.png";
import video from "./../data/video.mp4";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [appleCompanies, setAppleCompanies] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedCompanies, setCheckedCompanies] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [cart, setCart] = useCart();
  const [showBanner, setShowBanner] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollRight = () => {
    const carousel = carouselRef.current;
    const scrollAmount = carousel.offsetWidth;
    
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    if (carousel.scrollLeft + scrollAmount >= carousel.scrollWidth) {
      setTimeout(() => {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      }, 300);
    }
  };
  
  const scrollLeft = () => {
    const carousel = carouselRef.current;
    const scrollAmount = carousel.offsetWidth;
  
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    if (carousel.scrollLeft <= 0) {
      setTimeout(() => {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      }, 300);
    }
  };
  
  
    
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
  //get all companies
  const getAllCompany = async () => {
    try {
        const {data} = await axios.get(
            `${process.env.REACT_APP_API}/api/companies/get-company`
        );
        if(data?.success){
            setCompanies(data?.company);
        };
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting company');
    };
};

  //get apple companies
  const getApplecompanies = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/companies/getapple`
      );
      if (data?.success) {
        setAppleCompanies(data?.companies);
      };
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting apple companies');
    };
  };

  //get Best sellers
  const getBestSeller = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/bestseller`
      );
      setBestseller(data?.bestsellers);
    } catch (error) {
      console.log(error);
      toast.error('Error getting bestsellers');
    }
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
        { 
          checked: checkedCategories,  // Categories selected
          companies: checkedCompanies,  // Companies selected
          radio  // Price range selected
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error('Error applying filters');
    }
  };
  
  // Handle category filter changes
    const handleCategoryFilter = (e) => {
      const { value, checked } = e.target;
      setCheckedCategories((prevChecked) =>
        checked ? [...prevChecked, value] : prevChecked.filter((id) => id !== value)
      );
    };

    // Handle company filter changes
    const handleCompanyFilter = (e) => {
      const { value, checked } = e.target;
      setCheckedCompanies((prevChecked) =>
        checked ? [...prevChecked, value] : prevChecked.filter((id) => id !== value)
      );
    };
  // Handle price filter changes
  const handlePriceChange = (e) => {
    setRadio(e.target.value);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setCheckedCategories([]);
    setCheckedCompanies([]);  // Reset company filter
    setRadio([]);
    getAllProducts(); // Fetch all products after resetting filters
  };
  

  // Use effects for fetching data and applying filters
  useEffect(() => {
    getAllCategory();
    getAllCompany();
    getApplecompanies();
    getAllProducts();
    getBestSeller();
    getTotal();
  }, []);

  useEffect(() => {
    if (checkedCategories.length || checkedCompanies.length || radio.length) {
      filterProduct();  // Apply filters when any are selected
    } else {
      getAllProducts();  // Fetch all products when no filters are applied
    }
  }, [checkedCategories, checkedCompanies, radio]);  // Add checkedCompanies to the dependency array
  
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
            </div>
          </div>
          <div>
            <img src={image1} alt="Slide 2" />
            <div className="home27 ">
            </div>
          </div>
          <div>
            <img src={image2} alt="Slide 3" />
            <div className="home29 ">
            </div>
          </div>
          <div>
            <img src={image3} alt="Slide 4" />
            <div className="home31">
            </div>
          </div>
        </Carousel>
      </div>
      <div className='home3 container-fluid row mt-3'>
        <div className="filter-image-section">
          {/* Title */}
          <h2 className="filter-section-title">We help you choose your products</h2>

          {/* Inner container for image and filters */}
          <div className="inner-content">
            {/* Image on the left */}
            <div className="image-container">
              <img src={filterimage} alt="Filter Image" />
            </div>

            {/* Filters on the right */}
            <div className='home4'>
              {/* Toggle Category Filter */}
              <button className='home101 btn' onClick={() => setShowCategory(!showCategory)}>
                {showCategory ? 'Hide Categories' : 'Show Categories'}
              </button>
              {showCategory && (
                <div className='home6 d-flex flex-column'>
                  {categories?.map((category) => (
                    <Checkbox
                      key={category._id}
                      value={category._id}
                      checked={checkedCategories.includes(category._id)} 
                      onChange={handleCategoryFilter}
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              )}

              {/* Toggle Brand Filter */}
              <button className='home101 btn mt-4' onClick={() => setShowBrands(!showBrands)}>
                {showBrands ? 'Hide Brands' : 'Show Brands'}
              </button>
              {showBrands && (
                <div className='home100 d-flex flex-column'>
                  {companies?.map((company) => (
                    <Checkbox
                      key={company._id}
                      value={company._id}
                      checked={checkedCompanies.includes(company._id)} 
                      onChange={handleCompanyFilter}
                    >
                      {company.name}
                    </Checkbox>
                  ))}
                </div>
              )}

              {/* Toggle Price Filter */}
              <button className='home101 btn mt-4' onClick={() => setShowPrice(!showPrice)}>
                {showPrice ? 'Hide Price Range' : 'Show Price Range'}
              </button>
              {showPrice && (
                <div className='home8 d-flex flex-column'>
                  <Radio.Group onChange={handlePriceChange} value={radio}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              )}

              {/* Reset Filters */}
              <div className='home9 d-flex flex-column mt-4'>
                <button className='home10 btn' onClick={handleResetFilters}>
                  Clear filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home37 bestsellers-section">
          <h5 className="home38 bestseller-title">Our Bestsellers</h5>
          <p className="home39 bestseller-subtitle">It goes faster then chocolates</p>
          <div className="home40 bestseller-carousel-wrapper">
            <div className="home40 bestseller-carousel" ref={carouselRef}>
              {bestseller.slice(0, 12).map((c, index) => (
                <div key={c._id} className={`home41 bestseller-card ${index >= 4 ? 'hidden' : ''}`}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${c._id}`}
                    alt={c.name}
                    className="home42 bestseller-image"
                  />
                  <div className="home43 bestseller-details">
                    <h6 className="home44 bestseller-name">{c.name}</h6>
                    <p className="home45 bestseller-price">From {c.price} €</p>
                    <p className="home46 bestseller-rating">★ {c.rating}/5</p>
                    <button
                      className="home47 btn"
                      onClick={() => navigate(`/product/${c.slug}`)}
                    >
                      See More 
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-arrow carousel-arrow-left" onClick={scrollLeft}>
              &#8249;
            </div>
            <div className="carousel-arrow carousel-arrow-right" onClick={scrollRight}>
              &#8250;
            </div>
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
                  <div className='home-buttons'>
                    <button
                      className='home20 btn ms-1'
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className='home21 btn ms-1'
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
        <div className="home61 col-md-8 offset-md-2">
          <div className="home36">
              <h5>Know us more</h5>
          </div>
          <div className="home27-banner-section col-md-12">
              <div className="home28-banner col-md-3">
                  <img src={banner} alt="Banner" className="home29-banner-image" />
              </div>
              <div className="home30-banner col-md-3">
                  <img src={banner1} alt="Banner1" className="home31-banner-image" />
              </div>
              <div className="home71-banner col-md-3">
                  <img src={banner2} alt="Banner2" className="home74-banner-image" />
              </div>
              <div className="home72-banner col-md-3">
                  <img src={banner3} alt="Banner3" className="home73-banner-image" />
              </div>
          </div>
          <div className="home70-banner-section col-md-12">
              <div className="home32-banner video-banner col-md-6">
                  <video className="home33-banner-video" controls src={video} alt="Video"></video>
              </div>
          </div>
        </div>
        <div className='home50 col-md-8 offset-1'>
            <div className='home51'>
              <h5>Apple Products</h5>
              <h10>Apple fan? Find all apple products here</h10>
            </div>
            <div className='home52 d-flex flex-wrap'>
              {appleCompanies.map(company => (
                <Link to={`/company/${company.slug}`} className='home53 card m-2' style={{ width: '18rem' }} key={company._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/companies/company/photoURL/${company._id}`}
                  className='home54card-img-top'
                  alt={company.name}
                />
                <li key={company._id} className="home37 company-name">{company.name}</li>
                </Link>
              ))}
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default HomePage;
