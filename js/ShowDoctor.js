import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import defaultProfileImage from '../Assets/profile2.jpg';
import home_icon from '../Assets/home_icon.png';
import dashboard_icon from '../Assets/dashboard_icon.png';
import mammograph_icon from '../Assets/mammograph_icon.png';
import pathology_icon from '../Assets/pathology_icon.png';
import patient_icon from '../Assets/patient_icon.png';
import doctor_icon from '../Assets/doctor_icon.png';
import phone_icon from '../Assets/phone_icon.png';
import email_icon from '../Assets/email_icon.png';
import address_icon from '../Assets/address_icon.png';
import ID_icon from '../Assets/ID_icon.jpg';

const ShowDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchDoctorDetails(storedToken);
    } else {
      console.error('Authentication token not found.');
    }
  }, []);

  const fetchDoctorDetails = async (token) => {
    try {
      const response = await axios.get(`https://cancer.codexa.codes/api/admin/show-profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Doctor details:', response.data);
      setDoctor(response.data.doctor);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in.');
      } else if (error.response && error.response.status === 404) {
        setError('Doctor not found.');
      } else {
        setError('Error fetching doctor details.');
        console.error('Error fetching doctor details:', error);
      }
    }
  };

  if (!token) {
    return <div>Loading...</div>; // Handle case where token is not yet loaded
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!doctor) {
    return <div>Loading...</div>; // Handle case where doctor details are not yet loaded
  }

  return (
    <div className="doctorProfile">
      <aside className="aside_nav">
        <ul>
          <li><Link to="/"><img src={home_icon} alt="homeIcon" /><h3>Home</h3></Link></li>
          <li><Link to="/Dashboard"><img src={dashboard_icon} alt="dashboardIcon" /><h3>Dashboard</h3></Link></li>
          <li><Link to="/Patients"><img src={patient_icon} alt="patientIcon" /><h3>Patients</h3></Link></li>
          <li><Link to="/Doctors"><img src={doctor_icon} alt="doctorIcon" /><h3>Doctors</h3></Link></li>
          <li><Link to="/mammograph"><img src={mammograph_icon} alt="mammographIcon" /><h3>Mammograph</h3></Link></li>
          <li><Link to="/pathology"><img src={pathology_icon} alt="pathologyIcon" /><h3>Pathology</h3></Link></li>
        </ul>
      </aside>
      <div className="DoctorInformation">
        <div className="section">
          <div className="profileImage">
            <img src={doctor.image || defaultProfileImage} alt="Profile" />
          </div>
          <div className="contact_details">
            <h2>Contact Details</h2>
            <ul>
              <li>
                <img src={phone_icon} alt="phone" style={{ height: '25px' }} />
                {doctor.phone}
              </li>
              <li>
                <img src={email_icon} alt="email" style={{ height: '30px' }} />
                {doctor.email}
              </li>
              <li>
                <img src={address_icon} alt="address" />
                {doctor.address}
              </li>
              <li>
                <img src={ID_icon} alt="ID" />
                {doctor.national_id}
              </li>
            </ul>
          </div>
        </div>
        <div className="edu_exp">
          <div className="doctorName">
            <h1>Doctor's Name</h1>
            <p>{doctor.name}</p>
          </div>
          <div className="experience">
            <h3>Experience</h3>
            <p>{doctor.experience}</p>
          </div>
          <div className="education">
            <h3>Education</h3>
            <p>{doctor.education}</p>
          </div>
          <div className="hospital_code">
            <h3>Hospital Code</h3>
            <p>{doctor.hospital_code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDoctor;
