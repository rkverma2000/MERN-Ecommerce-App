import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CategoryForm from '../../components/forms/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data.success) {
                alert(`${name} category created successfully`)
                getAllCategories();
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
            alert('error in category input form')
        }
    }
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);
            alert('error while getting categories')
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                setSelected(null);
                setUpdatedName('')
                setVisible(false)
                getAllCategories()
                alert(data.message)
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert('something went worong')
        }
    }

    const handleDelete = async (pId) => {
        try {

            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
            if (data.success) {
                getAllCategories()
                alert(data.message)
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert('something went worong')
        }
    }
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3 ">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage category</h1>
                        <div className="p-3 w-25">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">category name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        categories.map((c) => (
                                            <tr key={c._id}>
                                                <td >{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory;