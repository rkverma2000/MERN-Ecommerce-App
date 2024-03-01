import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Register = () => {

  const [fName, setFirstName] = useState('');
  const [lName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { fName, lName, emailId, phoneNo, address ,answer, password });

      if(res.data.success){
        alert(res.data.message, {duration: 5000});
        navigate('/login');
      }else{
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }

  }

  return (
    <Layout title="Register - SuperMarkets">
      <div className='register'>
        <h1>Register page</h1>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <input
              onChange={(e) => { setFirstName(e.target.value) }}
              type="text"
              className="form-control"
              value={fName}
              placeholder='enter first name'
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setLastName(e.target.value) }}
              type="text"
              className="form-control"
              value={lName}
              placeholder='enter last name'
              required

            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setEmailId(e.target.value) }}
              type="email"
              className="form-control"
              value={emailId}
              placeholder='enter email id'
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setPhoneNo(e.target.value) }}
              type="text"
              className="form-control"
              value={phoneNo}
              placeholder='enter phone no.'
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setAddress(e.target.value) }}
              type="text"
              className="form-control"
              value={address}
              placeholder='enter address'
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setAnswer(e.target.value) }}
              type="text"
              className="form-control"
              value={answer}
              placeholder='What is your habit ?'
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              className="form-control"
              value={password}
              placeholder='enter password'
              required

            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register;