import React from 'react';
import './Quickactions.css';

import pp from "../assets/pp.svg";
import bbuild from "../assets/build.svg";
import point from "../assets/point.svg";
import cc from "../assets/callender.svg";

const QuickActions = () => {
  return (
    <div className="qa-card">
      <h2 className="qa-title">Quick Actions</h2>
      <div className="qa-grid">
        

        <button className="qa-btn qa-btn-primary">
          <span className="qa-btn-icon"><img src={pp} alt="" /></span>
          Verify Visitors
        </button>


        <button className="qa-btn qa-btn-secondary">
          <span className="qa-btn-icon"><img src={bbuild} alt="" /></span>
          Approve Exhibitor
        </button>


        <button className="qa-btn qa-btn-secondary">
          <span className="qa-btn-icon"><img src={point} alt="" /></span>
          Assign Booth
        </button>


        <button className="qa-btn qa-btn-secondary">
          <span className="qa-btn-icon"><img src={cc} alt="" /></span>
          Add Event
        </button>

      </div>
    </div>
  );
};

export default QuickActions;