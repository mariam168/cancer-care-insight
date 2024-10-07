import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/logo.png';
import google from '../Assets/google-removebg-preview.png';
import sign from '../Assets/sign.png';
import threeDots from '../Assets/threeDots.png';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [hospitalCode, setHospitalCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    setCsrfToken(token);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        'https://cancer.codexa.codes/api/doctor/register',
        {
          name: fullName,
          hospital_code: hospitalCode,
          email,
          password,
          password_confirmation: confirmPassword
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          withCredentials: true  // Ensure credentials are sent with the request
        }
      );
      // Handle successful response
      console.log('Response:', response.data);
      navigate('/SignIn');
    } catch (error) {
      // Handle errors from the server
      setErrors({ server: error.response?.data?.message || 'An error occurred' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!fullName) errors.fullName = 'Full name is required';
    if (!hospitalCode) errors.hospitalCode = 'Hospital code is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  return (
    <div className='signContent'>
      <nav>
        <ul className='threeDots'>
          <li><img src={threeDots} alt='threeDots' className='threeDotsImage' /></li>
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
        <form onSubmit={handleSubmit} className='sign'>
          <h1>Let's get started</h1>
          <img src={sign} alt='sign' className='signImage' />

          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className='input'
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='input'
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='input'
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className='input'
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <label htmlFor="hospitalCode">Hospital Code</label>
          <input
            type="text"
            id="hospitalCode"
            value={hospitalCode}
            onChange={(event) => setHospitalCode(event.target.value)}
            className='input'
          />
          {errors.hospitalCode && <p className="error">{errors.hospitalCode}</p>}

          <button type="submit" className='join'>Join Us</button>
          <p style={{
            marginLeft: "290px",
            marginTop: "3px",
            marginBottom: "-5px"
          }}>
            Already have an account?
            <Link to='/SignIn'> SignIn</Link>
          </p>
          <button className='google'>
            <img src={google} alt='google icon' /> Sign up with Google
          </button>
          {errors.server && <p className="error">{errors.server}</p>}
        </form>
      </div>
    </div>
  );
}
