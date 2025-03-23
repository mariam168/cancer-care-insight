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

        <div className="mammographResult">
          <h1>Mammograph Result Overview</h1>
          <p>Date of test: {currentDate}</p>
          <p>Result: Cancer</p>
          <img src={positive} alt="positive" />
        </div>
   
  );
}
