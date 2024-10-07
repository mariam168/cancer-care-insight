import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import add from '../Assets/add.png';
import home_icon from '../Assets/home_icon.png';
import dashboard_icon from '../Assets/dashboard_icon.png';
import mammograph_icon from '../Assets/mammograph_icon.png';
import pathology_icon from '../Assets/pathology_icon.png';
import patient_icon from '../Assets/patient_icon.png';
import doctor_icon from '../Assets/doctor_icon.png';
import profile2 from '../Assets/profile2.jpg';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('Authentication token not found.');
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!token) return; // Exit early if token is not set

      try {
        const response = await axios.get('https://cancer.codexa.codes/api/admin/all-doctors', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        // Check if response.data.doctors is an array
        if (Array.isArray(response.data.data.doctors)) {
          setDoctors(response.data.data.doctors);
        } else {
          console.error('API response does not contain an array of doctors:', response.data);
          setError('API response does not contain an array of doctors');
        }
      } catch (error) {
        setError('Error fetching doctors');
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [token]); // Fetch doctors whenever token changes

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Link to="/DoctorProfile" className="add">
            <img src={add} alt="add" />
          </Link>
        </div>
        <ul>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            filteredData.map((doctor) => (
              <li key={doctor.id}>
                <div>
                  <img src={doctor.image || profile2} alt="Profile" />
                  <p>{doctor.name}</p>
                </div>
                <div className="profilesButtons">
                  <Link to={`/ShowDoctor/${doctor.id}`}>
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
