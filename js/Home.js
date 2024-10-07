import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';
import mammograph from '../Assets/mammograph.jfif';
import pathology from '../Assets/pathology.jfif';
import homeBackground from '../Assets/homeBackground.png'
import dashboard from '../Assets/dashboard.png';
import patients from '../Assets/patients.jfif';
import logo from '../Assets/logo.png';
import locationIcon from '../Assets/location.png';
import homeDoctor from '../Assets/homeDoctor.png';
import fayoum from '../Assets/fayoum.jpg';
import bahya from '../Assets/bahya.jpg';
import threeDots from '../Assets/threeDots.png'

function LeafletMap() {
  useEffect(() => {
    let map = null;
    let routingControl = null;
    map = L.map('map').setView([29.3155, 30.8426], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    const masallaMarker = L.marker([29.3094, 30.8588], { icon: customIcon }).addTo(map);
    masallaMarker.bindPopup(`<b>Fayoum Cancer Center</b><br><img id="fayoum-image" src="${fayoum}" 
                              alt="Fayoum Cancer Center" style="max-width: 200px; height: auto;">
                              <div id="masalla-time"></div>
                              <div>max capacity: 100</div>
                              <div>opening from 8 am to 5 pm</div>`);
    masallaMarker.on('click', function() {
      calculateTravelTime(masallaMarker);
    });

    const sheikhZayedMarker = L.marker([30.0255, 31.0217], { icon: customIcon }).addTo(map);
    sheikhZayedMarker.bindPopup(`<b>Bahya Sheikh Zayed Center</b><br><img id="bahya-image" 
                                 src="${bahya}" alt="Bahya Sheikh Zayed Center" style="max-width: 200px; height: auto;">
                                 <div id="bahya-time"></div>
                                 <div>max capacity: 80</div>`);
    sheikhZayedMarker.on('click', function() {
      calculateTravelTime(sheikhZayedMarker);
    });

    function calculateTravelTime(marker) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const currentLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
          if (routingControl) {
            map.removeControl(routingControl); 
          }

          routingControl = L.Routing.control({
            waypoints: [
              currentLatLng, 
              marker.getLatLng() 
            ],
            routeWhileDragging: true,
            show: false,
            router: new L.Routing.OSRMv1({
              serviceUrl: 'http://router.project-osrm.org/route/v1'
            }),
            createMarker: function() {
              return null;
            }
          }).addTo(map);

          routingControl.on('routesfound', function(e) {
            const route = e.routes[0];
            const travelTime = route.summary.totalTime / 3600; 
            const markerId = marker === masallaMarker ? 'masalla-time' : 'bahya-time';
            document.getElementById(markerId).innerText = `TravelingTime: ${travelTime.toFixed(2)} h`;
          });
        });
      } else {
        alert('Geolocation is not available in this browser.');
      }
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
}

export default function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('https://cancer.codexa.codes/api/admin/all-doctors')
      .then(response => {
        setDoctors(response.data.data.doctors.slice(-5, -1)); // Fetching first 4 doctors
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return (
    <>
      <nav>
        <ul className='threeDots' >
          <li><img src={threeDots} alt='threeDots' className='threeDotsImage'></img></li>
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
          <li><Link to="/AboutUs">AbouUS</Link></li>
          <li><Link to="/ContactUs">ContactUS</Link></li>
          <li><Link to="/SignIn"><button>SIGN IN</button></Link></li>
          <li><Link to="/SignUp"><button>SignUp</button></Link></li>
        </ul>
      </nav>

      <div className='homeBackground'>

        <div className="backgroundPar">
          <h1>Cancer Care Insight Website</h1>
          <h3>Empowering Women's Health</h3>
        </div>
        <div className='homeBackgroundImage'>
          <img src={homeBackground} alt="homeBackgound"></img>
        </div>
      </div>

      <div className='models'>
        <div className='modelsContent'>
          <div className='mammograph'>
            <Link to="/Mammograph">
              <h2>Mammograph analysis</h2>
              <img src={mammograph} alt="mammograph" className='mammo' />
            </Link>
          </div>
          <div className='pathology'>
            <Link to="/Pathology">
              <h2>Pathology analysis</h2>
              <img src={pathology} alt="pathology" />
            </Link>
          </div>
        </div>
      </div>

      <div className='dashboard'>
        <h2>Get Access To dashboard</h2>
        <p>Our Statistics Dashboard offers a swift and straightforward method<br></br>
          to access and comprehend key metrics, providing a comprehensive<br></br>
          system overview for efficient monitoring and analysis.</p>
        <img src={dashboard} alt="dashboard" />
        <Link to="/Dashboard">
          <button>Click Here</button>
        </Link>
      </div>

      <h2 className='doctors_section'>Get Access To Our Specialized Doctors</h2>
      <div className='doctors' style={{ marginTop: "-500px" }}>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <img src={doctor.image} alt={`doctor_${doctor.id}`} />
            <p>Dr: {doctor.name}</p>
          </div>
        ))}
      </div>

      <div className='homeDoctor'>
        <img src={homeDoctor} alt='home doctor' ></img>
        <button>Show All</button>
      </div>

      <div className='show'>
        <div className='hor1'></div>
        <div className='ver1'></div>
        <Link to="Doctors"><button className='doctorShow'>Show all</button></Link>
        <div className='ver2'></div>
        <div className='hor2'></div>
      </div>

      <div className='patients'>
        <h2>Get Access To All Patients</h2>
        <p>
          The advancement of technology and health information systems
          <br></br> allows for efficient and secure access to patient data in hospitals
        </p>
        <img src={patients} alt='patients' />
        <Link to="/Patients">
          <button>Click here</button>
        </Link>
      </div>

      <div className="geographicalMapping">
        <h2>Get Access T o Our Geographical Mapping </h2>
        <LeafletMap />
      </div>

      <div className='footer'>
        <img src={logo} alt='logo' />
        <p>© 2024 Your Website. All rights reserved.</p>
      </div>
    </>
  );
}
