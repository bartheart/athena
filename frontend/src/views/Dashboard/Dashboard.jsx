import React from 'react';
import './Dashboard.css'; 
import Grouping from '../../components/Grouping';

function DashBoard() {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="logo">
          <div className="athena-ai">ATHENA ai</div>
        </div>
        <div className="sidebar">
          <div className="course-info">
            <div className="course-title">CSCE 2100 - 001: Intro to Computer Science</div>
            <div className="assignment-title">Assignment 2: OOP (Object oriented programming)</div>
            <div className="Type-title">Type: Short answer & Open ended</div>
          </div>
          <Grouping />
          <div className="navigation">
            <div className="sections">
              <div className="section">Help</div>
              <div className="section">Comments</div>
              <div className="section">Analytics</div>
              <div className="section">Settings</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="submission-stats">
          <div className="stats-header">Student Submissions</div>
          <div className="folder-icons">
            <div className="similarity-range">
            <img src="/file.png" alt="Dummy Image" className="image" />
                <div className="description">0-25% Similarity</div>
            </div>
            <div className="similarity-range">
              <img src="/file.png" alt="Dummy Image" className="image" />
              <div className="description">25-50% Similarity</div>
            </div>
            <div className="similarity-range">
            <img src="/file.png" alt="Dummy Image" className="image" />
              <div className="description">50-75% Similarity</div>
            </div>
            <div className="similarity-range">
            <img src="/file.png" alt="Dummy Image" className="image" />
              <div className="description">75-100% Similarity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
