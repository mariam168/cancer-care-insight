import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';
import mammograph from '../Assets/mammograph.jfif';
import pathology from '../Assets/pathology.jfif';
import homeBackground from '../Assets/homeBackground.png'
import dashboardImage from '../Assets/dashboard.png';
import patientsImg from '../Assets/patients.jfif';
import fayoum from '../Assets/fayoum.jpg';
import bahya from '../Assets/bahya.jpg';
import doctor1 from '../Assets/doctor1.jpg';
import doctor2 from '../Assets/doctor2.jpg';
import doctor3 from '../Assets/doctor3.jpg';
import doctor4 from '../Assets/doctor4.jpg';
import '../styles/Home.scss';
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
  
  const doctors = [
    { id: 1, name: "Sarah Johnson", image: doctor1 },
    { id: 2, name: "James Anderson", image: doctor2 },
    { id: 3, name: "Emily Carter", image: doctor3},
    { id: 4, name: "Michael Brown", image: doctor4 }
  ];
  



  return (
    <>
    <Container fluid className="custom-background mt-4 p-2">
  <Row className="d-flex justify-content-between align-items-center text-center mx-auto w-100 p-3">
    <Col md={6} className="mb-4 text-md-start text-center ps-4 ms-4">
      <h1 className="fs-1 fw-bold bg-white p-3 rounded shadow">
        Cancer Care Insight Website
      </h1>
      <h3 className="fw-bold primary-color bg-white p-3 rounded shadow d-inline-block fs-4">
        Empowering Women's Health
      </h3>
    </Col>

    <Col md={4} className="text-center">
      <div className="animated-circle">
        <img
          src={homeBackground}
          alt="homeBackground"
          className="img-fluid animated-img"
        />
      </div>
    </Col>
  </Row>

  <Row className="mt-5 justify-content-center mx-auto">
    <Col lg={6} md={6} sm={12} className="mb-3">
      <Card className="shadow-lg border-0 p-2 rounded-4">
        <Card.Body className="d-flex align-items-center">
          <div className="flex-grow-1 text-start text-md-start text-center">
            <Link to="/Mammograph" className="text-decoration-none text-dark">
              <h2 className="fs-4">Mammograph Analysis</h2>
            </Link>
            <p className="text-muted fs-5">
              A comprehensive analysis of mammogram images to detect potential signs of breast cancer.
            </p>
          </div>
          <img
            src={mammograph}
            alt="mammograph"
            className="rounded-circle border border-secondary p-2"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Card.Body>
      </Card>
    </Col>

    <Col lg={5} md={6} sm={12} className="mb-3">
      <Card className="shadow-lg border-0 p-2 rounded-4">
        <Card.Body className="d-flex align-items-center">
          <div className="flex-grow-1 text-start text-md-start text-center">
            <Link to="/Pathology" className="text-decoration-none text-dark">
              <h2 className="fs-4">Pathology Analysis</h2>
            </Link>
            <p className="text-muted fs-5">
              Advanced pathology image examination to identify abnormal tissue patterns.
            </p>
          </div>
          <img
            src={pathology}
            alt="pathology"
            className="rounded-circle border border-secondary p-2"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>


      <div className="container-fluid mx-auto my-5">
        <div className="row align-items-center bg-light  p-4 rounded">
          <Col md={8} className="text-center text-md-start ">
          <div style={{width:"80%"}}>
            <h2 className="fw-bold primary-color">Get Access To Dashboard</h2>
            <p className="lead mt-3">
              Our Statistics Dashboard offers a swift and straightforward method to access and comprehend key metrics, providing a comprehensive system overview for efficient monitoring and analysis.
            </p>
            <Link to="/Dashboard">
              <Button className="mt-3 w-25 buttonPrimary" >Click Here</Button>
            </Link>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <img src={dashboardImage} alt="Dashboard" className="img-fluid" style={{ maxWidth: '350px' }} />
          </Col>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center primary-color fw-bold mb-4">Get Access To Our Specialized Doctors</h2>
        <Row className="justify-content-center">
          {doctors.map((doctor) => (
            <Col key={doctor.id} md={3} sm={6} xs={12} className="mb-4">
              <Card className="shadow text-center p-3">
                <img src={doctor.image} alt={`doctor_${doctor.id}`} className="card-img-top img-fluid rounded" style={{ height: '180px' }} />
                <Card.Body>
                  <p className="fw-bold">Dr. {doctor.name}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex align-items-center justify-content-center my-4">
         
          <Link to="Doctors">
            <Button className="buttonPrimary ">Show All</Button>
          </Link>
          
        </div>
      </div>

      <div className="container-fluid my-5">
        <Row className="bg-light shadow-lg p-4 rounded justify-content-center align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3 primary-color">Get Access To All Patients</h2>
            <p>
              The advancement of technology and health information systems allows for efficient and secure access to patient data in hospitals.
            </p>
            <Link to="/Patients">
              <Button className="mt-3 buttonPrimary w-25">Click Here</Button>
            </Link>
          </Col>
          <Col md={6} className="text-center">
            <img src={patientsImg} alt="Patients" className="img-fluid rounded-circle shadow-lg w-50" />
          </Col>
        </Row>
      </div>

      <div className="container-fluid mt-5">
        <div className="text-center">
          <h2 className="mb-4">Get Access To Our Geographical Mapping</h2>
        </div>
        <div className="d-flex justify-content-center">
          <LeafletMap />
        </div>
      </div>
    </>
  );
}
