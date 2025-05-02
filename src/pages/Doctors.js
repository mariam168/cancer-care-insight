import React, { useState } from "react";
import { Link } from "react-router-dom";
import add from '../Assets/add.png';
import SideBar from '../components/SideBar/SideBar';
import profile2 from '../Assets/profile2.jpg';
import '../styles/Profiles.scss';
import doctorsData from './Data'; 

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState(doctorsData); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profiles">
      <SideBar/>
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
          {filteredData.map((doctor) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;