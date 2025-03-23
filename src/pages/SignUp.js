import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import google from '../Assets/google-removebg-preview.png';
import sign from '../Assets/sign.png';
import '../styles/form.scss'

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
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      setCsrfToken(metaTag.getAttribute('content'));
    } else {
      console.error('CSRF token meta tag not found.');
    }
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
          withCredentials: true  
        }
      );
       console.log('Response:', response.data);
      navigate('/SignIn');
    } catch (error) {
  
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
<div className="signContent">
  <div className="form">
    <form onSubmit={handleSubmit} className="sign">
      <h1>Let's get started</h1>
      <img src={sign} alt="sign" className="signImage" />

      <label htmlFor="fullName">Full name</label>
      <input
        type="text"
        id="fullName"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        className="input"
      />
      {errors.fullName && <p className="error">{errors.fullName}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="input"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="input"
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        className="input"
      />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

      <label htmlFor="hospitalCode">Hospital Code</label>
      <input
        type="text"
        id="hospitalCode"
        value={hospitalCode}
        onChange={(event) => setHospitalCode(event.target.value)}
        className="input"
      />
      {errors.hospitalCode && <p className="error">{errors.hospitalCode}</p>}

      <button type="submit" className="join">Join Us</button>
      <p>
        Already have an account?
        <Link to="/SignIn"> SignIn</Link>
      </p>
      <button className="google">
        <img src={google} alt="google icon" /> Sign up with Google
      </button>
      {errors.server && <p className="error">{errors.server}</p>}
    </form>
  </div>
</div>
  );
}
