import React, { useState, useEffect } from 'react';
import '../views/Dashboard/Dashboard.css';
import axios from 'axios';

const GroupingList = () => {
  const [answers, setAnswers] = useState([]);
  const [questionText, setQuestionText] = useState("Loading question...");
  const [questionId, setQuestionId] = useState(13);
  const [loading, setLoading] = useState(false); // State to handle loading

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:8000/process_answers/${questionId}`);
        console.log(`Fetched answers for questionId ${questionId}:`, response.data);
        if (response.data && response.data.length > 0) {
          setAnswers(response.data);
          setQuestionText(response.data[0].question); // Assume first answer has the 'question' field
        } else {
          setQuestionText("No answers found for this question");
          setAnswers([]); // Clear previous answers if any
        }
      } catch (error) {
        console.error("Error fetching the answers:", error);
        setQuestionText("Failed to load question"); // Fallback text in case of an error
      }
      setLoading(false); // End loading
    };

    fetchAnswers();
  }, [questionId]);  // Dependency array includes questionId to refetch when it changes

  const handlePrevClick = () => {
    if (questionId > 1) {
      setQuestionId(prev => prev - 1);
    }
  };

  const handleNextClick = () => {
    setQuestionId(prev => prev + 1);
  };

  return (
    <div className="submission-stats">
      <div className="stats-header">First Group</div>
      <div className="answer-list-container">
        <div className="question">
            <h1>{questionText}</h1>
            <div className="points">5 Points</div>
        </div>
        <div className="answer-list">
          {answers.map((answer, index) => (
            <div key={index} className="answer-box">
              {answer.answer}
              {answer.group}
            </div>
          ))}
        </div>
        
      </div>
      <div className="list-navigation">
        <button onClick={handlePrevClick} className="list-button prev">Previous</button>
        <button onClick={handleNextClick} className="list-button next">Next</button>
      </div>
    </div>
  );
}

export default GroupingList;
