import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import moment from 'moment'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'

const { Option } = Select

const AdminOrders = () => {
    const [status, setStatus] = useState(["not processed", "processing", "shipped", "delivered", "cancelled"])
    const [changeStatus, setChangeStatus] = useState('')

    const [auth] = useAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-orders`);
            setOrders(data)

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value })
            getOrders()

        } catch (error) {
            console.log(error);

        }

    }

    return (
        <Layout>
            <div className="row">
                <div className="col-md-4">
                    <AdminMenu />

                </div>
                <div className="col-md-8">
                    <h1 className="text-center">
                        Orders
                    </h1>
                    {orders?.map((o, i) => {
                        return (
                            <div className='border shadow mb-3' >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{++i}</th>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}

                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.fName}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {o?.products?.map((p) => (
                                        <div className="row card mb-3 p-3 flex-row">
                                            <div className="col-md-4">
                                                <img height='125px' width={'50px'} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />

                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price: &#8377; {p.price}</p>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        )
                    }
                    )}


                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders