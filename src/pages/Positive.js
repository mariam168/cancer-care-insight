import React, { useEffect, useState } from "react";
import positive from "../Assets/positive2.jpg"; 
import '../styles/MommographResult.scss'

export default function Positive() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    updateCurrentDate();
  }, []);

  const updateCurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setCurrentDate(formattedDate);
  };

  return (

        <div className="mammographResult secondary-color-bg">
          <h3>Mammograph Result Overview</h3>
          <p>Date of test: {currentDate}</p>
          <p>Result: Cancer</p>
          <img src={positive} alt="positive" />
        </div>
   
  );
}
