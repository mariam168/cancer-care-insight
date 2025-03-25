import React, { useEffect, useState } from "react";
import negative from "../Assets/negative3.png";


export default function Negative() {
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
      <p>Result: No Cancer</p>
      <img src={negative} alt="negative" />
    </div>
  );
}
