import React, { useEffect, useState } from "react";
import axios from "axios";
import home_icon from '../Assets/home_icon.png';
import dashboard_icon from '../Assets/dashboard_icon.png';
import mammograph_icon from '../Assets/mammograph_icon.png';
import pathology_icon from '../Assets/pathology_icon.png';
import patient_icon from '../Assets/patient_icon.png';
import doctor_icon from '../Assets/doctor_icon.png';
import profile2 from '../Assets/profile2.jpg';
import add from '../Assets/add.png';
import { Link } from "react-router-dom";

const Users = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchPatients(storedToken);
    } else {
      console.error('Authentication token not found.');
      setError('Authentication token not found.');
    }
  }, []);

  const fetchPatients = async (token) => {
    try {
      let url = 'https://cancer.codexa.codes/api/admin/all-patients';
      if (phoneQuery || emailQuery) {
        url = `https://cancer.codexa.codes/api/admin/filter-patient?phone=${phoneQuery}&email=${emailQuery}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data.data.patients)) {
        setPatients(response.data.data.patients);
      } else {
        setError('API response does not contain an array of patients');
        console.error('API response does not contain an array of patients:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in.');
        console.error('Unauthorized. Please log in.');
      } else {
        setError('Error fetching patients');
        console.error('Error fetching patients:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneQuery(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailQuery(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profiles">
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
      <div className="profiles_content">
        <div className="profiles_search">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
         
          <Link to="/PatientProfile" className="add"><img src={add} alt="Add" /></Link>
        </div>
        <ul>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            filteredPatients.map((patient) => (
              <li key={patient.id}>
                <div>
                  <img src={patient.image || profile2} alt="Profile" />
                  <p>{patient.name}</p>
                </div>
                <div className="profilesButtons">
                  <Link to={`/PatientShow/${patient.id}`}>
                    <button>View Profile</button>
                  </Link>
                  <button>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Users;
