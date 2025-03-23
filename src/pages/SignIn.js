import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import google from '../Assets/google-removebg-preview.png';

import sign from '../Assets/sign.png';
import '../styles/form.scss'

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMode, setLoginMode] = useState('admin'); 
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [responseArray, setResponseArray] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }

        const url = loginMode === 'admin' 
            ? 'https://cancer.codexa.codes/api/admin/login' 
            : 'https://cancer.codexa.codes/api/doctor/login';

        try {
            const response = await axios.post(url, {
                email,
                password
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            console.log('Login successful:', response.data);

        
            const token = response.data.data.token;
            console.log(token);

            if (token) {
                sessionStorage.setItem('token', token);
                console.log('Stored token:', token);
                setResponseArray(prevArray => [...prevArray, response.data]);
                navigate('/');
            } else {
                setError('Token is missing from response');
                console.error('Token is missing from response:', response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    console.error('Validation error details:', error.response.data);

                    setError(error.response.data.message || 'Invalid email or password');
                    setFieldErrors(error.response.data.errors || {});
                } else {
                    setError('An error occurred');
                }
                console.error('Login error:', error.response.data);
            } else {
                setError('A network error occurred');
                console.error('Network error:', error);
            }
        }
    };

    return (
        <div className="card-container">
        <div className="card">
          <h1 className="text-primary mb-3">Welcome back 👋</h1>
          <img src={sign} alt="sign" className="img-fluid mx-auto d-block mb-3" style={{ maxWidth: "100px" }} />
      
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Login as:</label>
              <select className="form-select" value={loginMode} onChange={(e) => setLoginMode(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
      
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
              {fieldErrors.email && <div className="text-danger">{fieldErrors.email[0]}</div>}
            </div>
      
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
              {fieldErrors.password && <div className="text-danger">{fieldErrors.password[0]}</div>}
            </div>
      
            {error && <div className="alert alert-danger">{error}</div>}
      
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            <Link to="/forgot-password" className="d-block text-end mt-2">Forgot Password?</Link>
      
            <button className="btn btn-outline-primary w-100 mt-3 d-flex align-items-center justify-content-center">
              <img src={google} alt="google" className="me-2" style={{ width: "20px" }} />
              Sign In with Google
            </button>
          </form>
        </div>
      </div>
    );
}
