import { React, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { emailId, answer, newPassword });

      if (res.data.success) {
        alert('Do you want to reset your password?')
        navigate('/login');
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }
  }
  return (
    <Layout title="forgot password - Supermarkets">
      <div className='register'>
        <h1>Reset password</h1>
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
              onChange={(e) => { setNewPassword(e.target.value) }}
              type="password"
              className="form-control"
              value={newPassword}
              placeholder='enter new password'
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Reset</button>
        </form>
      </div>

    </Layout>
  )
}


export default ForgotPassword;