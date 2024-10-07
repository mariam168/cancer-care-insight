import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

export default function DoctorProfile() {
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        address: '',
        id: '',
        name: '',
        experience: '',
        education: '',
        password: '',
        hospital_code: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = JSON.parse(sessionStorage.getItem('user'));

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        } else {
            console.error('Authentication token or user data not found.');
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

    const saveProfile = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('national_id', formData.id);
        data.append('experience', formData.experience);
        data.append('education', formData.education);
        data.append('password', formData.password);
        data.append('hospital_code', formData.hospital_code);
        if (profileImage) {
            data.append('image', profileImage);
        }

        try {
            const response = await axios.post('https://cancer.codexa.codes/api/admin/add-doctor', data, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Doctor added successfully:', response.data);
            setSuccess(true);
            alert('Profile saved successfully!');
        } catch (error) {
            console.error('Error adding doctor:', error.response.data);
            setError(error.response.data.message || 'An error occurred while adding the doctor.');
            alert('Error: ' + (error.response.data.message || 'An error occurred.'));
        }
    };

    if (!user || !token) {
        return <div>Loading...</div>;
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
            <form className='DoctorInformation' onSubmit={saveProfile}>
                <div className="section">
                    <div className='profileImage'>
                        <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} alt="Profile Preview" className='doctorpreview' />
                        <button type="button" onClick={() => document.getElementById('image').click()}>Add Image</button>
                        <input
                            className='profileInput'
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='contact_details'>
                        <h2 style={{ marginLeft: "15px" }}>Contact Details</h2>
                        <ul>
                            <li>
                                <img src={phone_icon} alt='phone' style={{ height: '25px' }} />
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </li>
                            <li>
                                <img src={email_icon} alt='email' style={{ height: '30px' }} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </li>
                            <li>
                                <img src={address_icon} alt='address' />
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </li>
                            <li>
                                <img src={ID_icon} alt="ID" />
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                />
                            </li>
                            <li >
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <p style={{ marginRight: "5px", marginLeft: "-20px" }}>password</p>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='edu_exp'>
                    <div className='doctorName'>
                        <h1>Doctor's Name</h1>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='experience'>
                        <h3>Experience</h3>
                        <textarea
                            type="text"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='education'>
                        <h3>Education</h3>
                        <textarea
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                    {success && <p style={{ color: 'green' }}>Profile saved successfully!</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
        </div>
    );
}
