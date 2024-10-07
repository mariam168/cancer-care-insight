import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './js/SignUp';
import SignIn from './js/SignIn';
import './index.css';
import "./css/form.css";
import Home from './js/Home';
import './css/Home.css'
import Mammograph from './js/Mammograph';
import Pathology from './js/Pathology';
import './css/models.css';
import './css/PathologyModel.css'
import PatientProfile from './js/PatientProfile';
import './css/PatientProfile.css'
import Negative from './js/Negative';
import Positive from './js/Positive';
import './css/MommographResult.css'
import Dashboard from './js/Dashboard';
import './css/Dashboard.css'
import Doctors from './js/Doctors';
import Patients from './js/Patients';
import './css/Profiles.css'
import PathologyResult from './js/PathologyResult';
import './css/PathologyResult.css'
import DoctorProfile from './js/DoctorProfile';
import './css/DoctorProfile.css';
import ContactUs from './js/ContactUs';
import './css/ContactUs.css';
import AboutUs from './js/AboutUs';
import './css/AboutUs.css';
import PatientShow from './js/patientShow';
import ShowDoctor from './js/ShowDoctor';
import './css/PatientShow.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/Mammograph" element={<Mammograph/>} />
        <Route path="/Pathology" element={<Pathology/>} />
        <Route path="/Positive" element={<Positive/>} />
        <Route path="/Negative" element={<Negative/>} />
        <Route path="/Doctors" element={<Doctors/>} />  
        <Route path= "/Patients" element={<Patients/>} />   
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/PatientProfile" element={<PatientProfile/>} />
        <Route path="/DoctorProfile" element={<DoctorProfile/>} />
        <Route path="/PathologyResult" element={<PathologyResult/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/PatientShow/:id" element={<PatientShow/>} />
        <Route path="/ShowDoctor/:id" element={<ShowDoctor/>} />
      </Routes>
    </Router>
  );
}

export default App;

