import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select;

const CreateProduct = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            alert('error while getting categories')
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        try {

            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('category', category)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            productData.append('photo', photo)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)

            if (data.success) {
                alert(data.message)
                navigate('/dashboard/admin/products')

            } else {
                alert(data.message)
            }

        } catch (error) {

            console.log(error);
            alert('something went wrong')

        }

    }

    return (
        <Layout>
            <div className="container-fluid  m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false}
                                placeholder='Select a category'
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => setCategory(value)}
                            >
                                {categories.map((c) => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}

                            </Select>

                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12' >
                                    {photo ? photo.name : "Upload photo"}
                                    <input type="file" name="" id="" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />

                                </label>
                            </div>
                            <div className="md-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt='product' height='200px' className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='enter product name' className='form-control' onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <textarea type='text' value={description} placeholder='enter product description' className='form-control' onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={price} placeholder='enter product price' className='form-control' onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='enter product quantity' className='form-control' onChange={(e) => { setQuantity(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <Select bordered={false}
                                    placeholder='Select shipping'
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value='0' >No</Option>
                                    <Option value='1' >Yes</Option>

                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>Create product</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct