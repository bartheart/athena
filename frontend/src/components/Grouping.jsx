import React, { useState } from 'react';
import '../views/Dashboard/Dashboard.css';
import axios from 'axios';

function Grouping() {
  const [numberOfGroupings, setNumberOfGroupings] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log('Number of groupings:', numberOfGroupings);
    try {
        // Send accumulated phrases to backend for analysis
        const response = await axios.post('http://localhost:8000/grouping', numberOfGroupings);
        console.log(response.data);
      } catch (error) {
        console.error('Error analyzing phrases:', error);
      }
      setNumberOfGroupings([]);
  };

  const handleChange = (event) => {
    setNumberOfGroupings(event.target.value);
  };

  return (
    <form className='grouping' onSubmit={handleSubmit}>
      <div className="grouping-title">Number of groupings</div>
      <input
        type="text"
        className="grouping-input"
        value={numberOfGroupings}
        onChange={handleChange}
      />
      <div className="actions">
        <div className="edit-key">Edit Key</div>
        <div className="re-upload">Re-upload</div>
      </div>
      <button type="submit" className="analyze-button">Analyze</button>
    </form>
  );
}

export default Grouping;
