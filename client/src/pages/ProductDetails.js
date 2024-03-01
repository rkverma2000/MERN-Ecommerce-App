import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({})

    const getProduct = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setProduct(data?.product)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    return (
        <Layout>
            <div className="row container">
                <div className="col-md-6">
                    <img height='360px' width='300px' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>category: {product.category?.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: {product.price}</h6>
                    <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails