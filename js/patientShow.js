import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultProfileImage from '../Assets/profile2.jpg';
import home_icon from '../Assets/home_icon.png';
import dashboard_icon from '../Assets/dashboard_icon.png';
import mammograph_icon from '../Assets/mammograph_icon.png';
import pathology_icon from '../Assets/pathology_icon.png';
import patient_icon from '../Assets/patient_icon.png';
import doctor_icon from '../Assets/doctor_icon.png';
import { Link } from "react-router-dom";
const ShowProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchPatientDetails(storedToken);
    } else {
      setError('Authentication token not found. Please log in.');
    }
  }, []);

  const fetchPatientDetails = async (token) => {
    try {
      const response = await axios.get(`https://cancer.codexa.codes/api/admin/show-patient/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Patient details:', response.data);
      setPatient(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in.');
      } else if (error.response && error.response.status === 404) {
        setError('Patient not found.');
      } else {
        setError('Error fetching patient details.');
        console.error('Error fetching patient details:', error);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="showProfile" >
     <aside className="aside_nav">
        <ul>
          <li><Link to="/"><img src={home_icon} alt="Home" /><h3>Home</h3></Link></li>
          <li><Link to="/Dashboard"><img src={dashboard_icon} alt="Dashboard" /><h3>Dashboard</h3></Link></li>
          <li><Link to="/Patients"><img src={patient_icon} alt="Patients" /><h3>Patients</h3></Link></li>
          <li><Link to="/Doctors"><img src={doctor_icon} alt="Doctors" /><h3>Doctors</h3></Link></li>
          <li><Link to="/mammograph"><img src={mammograph_icon} alt="Mammograph" /><h3>Mammograph</h3></Link></li>
          <li><Link to="/pathology"><img src={pathology_icon} alt="Pathology" /><h3>Pathology</h3></Link></li>
        </ul>
      </aside>   
    <div className = "rightSection">
        
      <h2>{patient.name}'s Profile</h2>
      <img src={patient.image || defaultProfileImage} alt="Profile" />
      <p>Phone: {patient.phone}</p>
      <p>Email: {patient.email}</p>
      <p>Address: {patient.address}</p>
      <p>Gender: {patient.gender}</p>
      <p>Date of Birth: {patient.birth_date}</p>
   
    </div>
    <div className='leftSection'>
        <div className='leftSectionContent'>
        <div>
       <h3>Chronic Disease History</h3>
       <p>{patient.chronic_disease_history}</p>
       </div>
        <div>
       <h3>medical_history</h3>
       <p>{patient.medical_history}</p>
       </div>
        <div>
       <h3>family_history</h3>
       <p>{patient.family_history}</p>
       </div>
       </div>
    </div>

    </div>
  );
};

export default ShowProfile;

