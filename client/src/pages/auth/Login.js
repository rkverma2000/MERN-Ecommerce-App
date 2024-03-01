import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useNavigate, useLocation, Link} from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../context/auth';


const Login = () => {

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {emailId, password });

      if(res.data.success){
        setAuth({
          ...auth, 
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || '/');
      }else{
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }

  }
  return (
    <Layout title="Login - SuperMarkets">
    <div className='register'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
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
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            className="form-control"
            value={password}
            placeholder='enter password'
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/forgot-password">forgot password</Link>
      </form>
    </div>
  </Layout>
  )
}

export default Login;