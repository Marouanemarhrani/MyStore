import React from 'react';
import { useSearch } from '../context/search';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import "./Search.css";
import LayoutNF from '../components/Layout/LayoutNF';

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <LayoutNF title={'Search result'}>
      <div className='divsrch1 container'>
        <div className='divsrch2 text-center'>
          <h1 className='srch-h1'>Search Result</h1>
          <h6 className='srch-h6'>{values?.results.length < 1 
          ? 'No Products found' 
          : `Found ${values?.results.length}`}
          </h6>
          <div className='divsrch3 d-flex flex-wrap mt-4'>
            {values?.results.map((p) => (
              <div className='divsrch4-card m-2' style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                  className='divsrch4-img card-img-top'
                  alt={p.name}
                />
                <div className='divsrch5-card-bd -card-body'>
                  <h5 className='srch-h5-title card-title'>{p.name}</h5>
                  <p className='srch-p card-text'>{p.description.substring(0, 30)}...</p>
                  <p className='srch-p card-text'>€ {p.price}</p>
                  <button
                    className='divsrch6-home20 btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More details
                </button>
                  <button
                    className='divsrch7-home21-btn btn-secondary ms-1'
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success('Item added to cart');
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>  
    </LayoutNF>
  )
};

export default Search;