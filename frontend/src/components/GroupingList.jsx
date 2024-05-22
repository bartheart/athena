import React, { useState, useEffect } from 'react';
import '../views/Dashboard/Dashboard.css';
import axios from 'axios';

const GroupingList = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/process_answers');
        console.log("Fetched answers:", response.data); // Debug log
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching the answers:", error);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="submission-stats">
      <div className="stats-header">First Group</div>
      <div className="answer-list-container">
        <div className="question">
            <h1>#1. What is the purpose of prototype in software development?</h1>
            <div className="points">5 Points</div>
        </div>
        <div className="answer-list">
          {answers.map((answer, index) => (
            <div key={index} className="answer-box">
              {answer.answer}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default GroupingList;