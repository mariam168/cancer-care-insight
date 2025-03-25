import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pathology() {
  const [er, setEr] = useState('');
  const [pr, setPr] = useState('');
  const [her2, setHer2] = useState('');
  const [ki67, setKi67] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![0, 1].includes(Number(er)) || ![0, 1].includes(Number(pr)) || ![0, 1].includes(Number(her2))) {
      window.alert('Invalid input: ER, PR, and HER2 values should be 0 or 1.');
      return;
    }

    if (isNaN(ki67) || Number(ki67) < 0 || Number(ki67) > 100) {
      window.alert('Invalid input: KI67 should be a number between 0 and 100.');
      return;
    }

    const requestData = {
      features: [Number(er), Number(pr), Number(her2), Number(ki67)]
    };

    console.log('Sending data to server:', requestData);

    try {
      const response = await fetch('https://treatment-prediction-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
    
      } else {
        setPrediction(data.prediction);
        setError(null);
        navigate('/PathologyResult', { state: { prediction: data.prediction } });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`An error occurred while fetching the prediction: ${error.message}`);
    }
  };

  return (
   
      <div>
        <form className="modelPage secondary-color-bg  " onSubmit={handleSubmit}>
          <h3>Pathology Analysis</h3>
  
          <div className="pathologyModel">
            <div>
              <label htmlFor="ER">ER Result (Enter 0 for Negative and 1 for Positive)</label>
              <input
                type="number"
                id="ER"
                value={er}
                onChange={(e) => setEr(e.target.value)}
                min="0"
                max="1"
              />
            </div>
            <div>
              <label htmlFor="PR">PR Result (Enter 0 for Negative and 1 for Positive)</label>
              <input
                type="number"
                id="PR"
                value={pr}
                onChange={(e) => setPr(e.target.value)}
                min="0"
                max="1"
              />
            </div>
            <div>
              <label htmlFor="HER2">HER2 Result (Enter 0 for Negative and 1 for Positive)</label>
              <input
                type="number"
                id="HER2"
                value={her2}
                onChange={(e) => setHer2(e.target.value)}
                min="0"
                max="1"
              />
            </div>
            <div>
              <label htmlFor="KI67">KI67(%) Result</label>
              <input
                type="number"
                id="KI67"
                value={ki67}
                onChange={(e) => setKi67(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>
          <button type="submit" className='primary-color-bg'>Submit</button>
        </form>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>
  );
}
