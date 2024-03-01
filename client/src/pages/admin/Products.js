import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
            setProducts(data.products)

        } catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>all products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>

                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text">&#8377; {p.price}</p>


                                    </div>
                                </div>

                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products