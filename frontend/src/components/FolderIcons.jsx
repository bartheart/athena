import React, { useState } from 'react';
import '../views/Dashboard/Dashboard.css';
import axios from 'axios';

function FolderIcons() {
  return (
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
  );
}

export default FolderIcons;