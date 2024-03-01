import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');


    useEffect(() => {
        const { fName, lName, emailId, phoneNo, address } = auth.user
        setLastName(lName)
        setFirstName(fName)
        setEmailId(emailId)
        setPhoneNo(phoneNo)
        setAddress(address)

    }, [auth?.user])


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, { fName, lName, emailId, phoneNo, address });

            if (data?.success) {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                alert(data?.message)

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }

    }
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='register'>
                            <h1>Update profile </h1>
                            <form onSubmit={handleUpdate} >
                                <div className="mb-3">
                                    <input
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        type="text"
                                        className="form-control"
                                        value={fName}
                                        placeholder='enter first name'

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        type="text"
                                        className="form-control"
                                        value={lName}
                                        placeholder='enter last name'


                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        onChange={(e) => { setEmailId(e.target.value) }}
                                        type="email"
                                        className="form-control"
                                        value={emailId}
                                        placeholder='enter email id'
                                        disabled

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        onChange={(e) => { setPhoneNo(e.target.value) }}
                                        type="text"
                                        className="form-control"
                                        value={phoneNo}
                                        placeholder='enter phone no.'

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        placeholder='enter address'

                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Profile