import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import google from '../Assets/google-removebg-preview.png';
import logo from '../Assets/logo.png';
import threeDots from '../Assets/threeDots.png';
import sign from '../Assets/sign.png';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMode, setLoginMode] = useState('admin'); // New state for login mode
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

            // Extract token from response data
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
        <div>
            <nav>
                <ul className='threeDots'>
                    <li><img src={threeDots} alt='threeDots' className='threeDotsImage'></img></li>
                </ul>
                <ul className='logoUl'>
                    <div className='logo'>
                        <li>
                            <img src={logo} alt="Logo" className='logoImage' />
                        </li>
                    </div>
                </ul>
                <ul className='links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About US</Link></li>
                    <li><Link to="/contact">Contact US</Link></li>
                    <li><Link to="/SignIn"><button>SIGN IN</button></Link></li>
                    <li><Link to="/SignUp"><button>SIGN UP</button></Link></li>
                </ul>
            </nav>

            <div className="form">
                <form onSubmit={handleSubmit} style={{ position: "relative", top: "70px" }} className='sign'>
                    <h1>Welcome back 👋</h1>
                    <img src={sign} alt='sign' className='signImage'></img>

                    <label>
                        Login as:
                        <select value={loginMode} onChange={(e) => setLoginMode(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </label>

                    <label htmlFor="email" style={{ marginTop: "25px" }}>Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input' style={{ height: "25px" }} />
                    {fieldErrors.email && <p className="error">{fieldErrors.email[0]}</p>}

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' style={{ height: "25px" }} />
                    {fieldErrors.password && <p className="error">{fieldErrors.password[0]}</p>}

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className='join'>Sign In</button>
                    <a href='/' style={{ marginLeft: "360px", marginTop: "5px" }}>Forgot Password?</a>
                    <button className='google' style={{ marginBottom: '30px', marginTop: "30px" }}><img src={google} alt='google'></img>Sign In with Google</button>
                </form>
                <div>
                    {responseArray.length > 0 && (
                        <div>
                            <h2>Token:</h2>
                            {responseArray.map((response, index) => (
                                <p key={index}>{response.token}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
