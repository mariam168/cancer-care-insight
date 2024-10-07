import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultProfileImage from '../Assets/profile2.jpg';
import home_icon from '../Assets/home_icon.png';
import dashboard_icon from '../Assets/dashboard_icon.png';
import mammograph_icon from '../Assets/mammograph_icon.png';
import pathology_icon from '../Assets/pathology_icon.png';
import patient_icon from '../Assets/patient_icon.png';
import doctor_icon from '../Assets/doctor_icon.png';
import wave from '../Assets/overview.jpg';

export default function PatientProfile() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    name: '',
    id: '',
    gender: '',
    birth_date: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('Authentication token not found.');
      
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('gender', formData.gender);
    data.append('birth_date', formData.birth_date);
    if (profileImage) {
      data.append('image', profileImage);
    }

    try {
      const response = await axios.post('https://cancer.codexa.codes/api/admin/add-patient', data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Patient added successfully:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error adding patient:', error.response.data);
      setError(error.response.data.message || 'An error occurred while adding the patient.');
    }
  };

  const [historyButtons, setHistoryButtons] = useState([
    { label: 'Medical History', isOpen: false },
    { label: 'Chronic Disease History', isOpen: false },
    { label: 'Family History', isOpen: false },
  ]);

  const toggleHistoryButton = (index) => {
    setHistoryButtons((prevButtons) =>
      prevButtons.map((button, i) => ({
        ...button,
        isOpen: i === index ? !button.isOpen : false,
      }))
    );
  };

  if (!token) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="patientProfile">
      <aside className="aside_nav">
        <ul>
          <li><Link to="/"><img src={home_icon} alt="Home"></img><h3>Home</h3></Link></li>
          <li><Link to="/Dashboard"><img src={dashboard_icon} alt="Dashboard"></img><h3>Dashboard</h3></Link></li>
          <li><Link to="/Patients"><img src={patient_icon} alt="Patients"></img><h3>Patients</h3></Link></li>
          <li><Link to="/Doctors"><img src={doctor_icon} alt="Doctors"></img><h3>Doctors</h3></Link></li>
          <li><Link to="/mammograph"><img src={mammograph_icon} alt="Mammograph"></img><h3>Mammograph</h3></Link></li>
          <li><Link to="/pathology"><img src={pathology_icon} alt="Pathology"></img><h3>Pathology</h3></Link></li>
        </ul>
      </aside>
      <form className="patientProfileContent" onSubmit={handleSubmit}>
        <div className="patientProfileLeftSide">
          <div className="patientProfileImage">
            <label htmlFor='image'>
              <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} alt="Profile Preview" className='patientPreview' />
              <h2>
                {isNameEditing ? (
                  <textarea
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                    onBlur={() => setIsNameEditing(false)}
                    aria-label="Name"
                  />
                ) : (
                  <span onClick={() => setIsNameEditing(true)}>
                    {/* {formData.name} */}
                  </span>
                )}
              </h2>
            </label>
            <input className='profileInput' type='file' id='image' name='image' accept='image/*' onChange={handleImageChange} aria-label="Upload Image" />
          </div>
          <div className="patientContactDetails">
            <ul>
              <li>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="name"
                  aria-label="name"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  aria-label="Phone"
                />
              </li>
              <li>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  aria-label="Email"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  aria-label="Address"
                />
              </li>
              
            </ul>
          </div>
          <div className="patientLapResult">
            <h4>Latest Lab Result</h4>
            <ul>
              <li>
                <label>
                  <img src={mammograph_icon} alt="Mammograph" />
                  <input type="file" aria-label="Upload Mammograph Result" />
                </label>
              </li>
              <li>
                <label>
                  <img src={pathology_icon} alt="Pathology" />
                  <input type="file" aria-label="Upload Pathology Result" />
                </label>
              </li>
            </ul>
          </div>
          <div className="patientDoctorNotes">
            <h4>Notes</h4>
            <textarea className="write_notes" placeholder="Write Notes" aria-label="Write Notes"></textarea>
            {/* <textarea className="doctor_name" placeholder="Doctor's Name" aria-label="Doctor's Name"></textarea> */}
          </div>
        </div>
        <div className="patientProfileRightSide">

          <div className="patientOverview">
            <img src={wave} alt="Overview" />
            <div>
              <textarea placeholder="Next Visit" aria-label="Next Visit"></textarea>
              <textarea placeholder="Last Visit" aria-label="Last Visit"></textarea>
            </div>
            <div>
            <li>
                <textarea
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Gender"
                  aria-label="Gender"
                />
              </li>
              <li>
                <textarea
                  type="text"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  aria-label="Date of Birth"
                />
              </li>
            </div>
          </div>
          <div className='history' style={{height:"325px"}}>
            <h3>Patient's History</h3>
            {historyButtons.map((button, index) => (
              <div key={index}>
                <button className={button.isOpen ? 'opened' : ''} onClick={() => toggleHistoryButton(index)}>
                  {button.label} {button.isOpen ? '⬇️' : '➡️'}
                </button>
                {button.isOpen && (
                  <textarea placeholder={`Enter ${button.label} here...`} aria-label={`${button.label} History`} />
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" style={{position:"relative",left:"190%",top:"-10px",backgroundColor:"#efef"}}>Submit</button>
        {success && <p style={{ color: 'green' }}>Patient profile added successfully!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
