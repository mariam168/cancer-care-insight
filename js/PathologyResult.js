import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import positive from '../Assets/positive2.jpg';

export default function PathologyResult() {
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const prediction = location.state?.prediction || '';

  useEffect(() => {
    updateCurrentDate();
  }, []);

  const updateCurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(); 
    setCurrentDate(formattedDate);
  };

  return (
    <div className="mammographResult">
      <h1>Pathology Result Overview</h1>
      <p>Date of test: {currentDate}</p>
      <p>Result: {prediction ? prediction : 'No prediction available yet'}</p>
      <img src={positive} alt="positive" />
    </div>
  );
}
