import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react"


const CartPage = () => {
    const [auth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const removeCartItem = (pId) => {
        try {
            const cartItems = [...cart];
            const index = cartItems.findIndex((item) => item._id === pId)
            cartItems.splice(index, 1);
            setCart(cartItems)
            localStorage.setItem("cart", JSON.stringify(cartItems))

        } catch (error) {
            console.log(error);
        }

    }

    const totalPrice = () => {
        let total = 0;
        cart.map((item) => (
            total = total + item.price
        ))
        return total;
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(false)

            localStorage.removeItem('cart');
            setCart([])
            navigate('/dashboard/user/orders')
            alert("payment completed succesfully")

        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }
    return (

        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">
                            {`Hello ${auth?.token && auth?.user?.fName}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 1 ? `You have ${cart.length} items in your cart ${(auth?.token) ? "" : "please login to checkout"}` : 'Your cart is empty'}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {cart?.map((p) => (
                            <div className="row card mb-3 p-3 flex-row">
                                <div className="col-md-4">
                                    <img height='125px' width={'50px'} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />

                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price: &#8377; {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>

                            </div>
                        ))}


                    </div>
                    <div className="col-md-6 text-center">
                        <h2>Cart Summary</h2>
                        <h4>Total: &#8377; {totalPrice()}</h4>
                        {auth?.user?.address ? (

                            <div className="mb-3">
                                <h4>Current address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                            </div>

                        ) : (
                            <div className="mb-3">
                                {(auth?.token) ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: "/cart" })}>Please login to checkout </button>

                                )
                                }
                            </div>
                        )
                        }

                        <div className="mb-2">
                            {!clientToken || !cart.length ? "" : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault"
                                            }

                                        }}
                                        onInstance={(instance) => setInstance(instance)}

                                    />
                                    <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                        {loading ? "Processing..." : "Make payment"}
                                    </button>
                                </>
                            )}


                        </div>

                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default CartPage