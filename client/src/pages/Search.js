import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <Layout title={'Search result'}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Result</h1>
          <h6>{values?.results.length < 1 
          ? 'No Products found' 
          : `Found ${values?.results.length}`}
          </h6>
          <div className='d-flex flex-wrap mt-4'>
            {values?.results.map((p) => (
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
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>  
    </Layout>
  )
};

export default Search;
