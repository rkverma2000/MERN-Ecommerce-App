import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth.js';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setchecked] = useState([])
  const [radio, setRadio] = useState([])



  const handleFilter = (value, id) => {

    let all = [...checked]

    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => (c !== id))
    }
    setchecked(all)

  }


  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])



  const getAllProducts = async () => {

    try {

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
      setProducts(data.products)

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length])


  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (checked.length || radio.length) getFilteredProducts();

  }, [checked, radio])

  return (
    <Layout>
      <div className="row mt-3">

        <div className="col-md-3">
          <h1 className='text-center'>Filters</h1>
          <h4 className='ms-2'>Categories</h4>
          <div className="d-flex flex-column ms-2 mb-3">
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='ms-2'>Prices</h4>
          <div className="d-flex flex-column ms-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)} >
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.value}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">

          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">&#8377; {p.price}</p>
                  <div>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                    <button className="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      alert("item added to cart")
                    }}>Add to cart</button>

                  </div>



                </div>
              </div>

            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Home;