import React, { useState } from 'react';
import '../views/Dashboard/Dashboard.css';
import axios from 'axios';

function GroupingList() {
    
  return (
    <div className="submission-stats">
        <div className="stats-header">First Group</div>
        <div className="group-lists">
        <div className="similarity-range">
                <div className="description">0-25% Similarity</div>
            </div>
            <div className="similarity-range">
                <div className="description">25-50% Similarity</div>
            </div>
            <div className="similarity-range">
                <div className="description">50-75% Similarity</div>
            </div>
            <div className="similarity-range">
                <div className="description">75-100% Similarity</div>
            </div>
        </div>
    </div>  
  );
}

export default GroupingList;