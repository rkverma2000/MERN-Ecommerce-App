import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"

const Orders = () => {
    const [auth] = useAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data)

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])



    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center'>orders</h4>
                        {orders?.map((o, i) => {
                            return (
                                <div className='border shadow' >
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
                                                <td>{o?.status}</td>
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
            </div>
        </Layout>
    )
}

export default Orders