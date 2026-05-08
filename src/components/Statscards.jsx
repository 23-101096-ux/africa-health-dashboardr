import React from 'react';
import './StatsCards.css';

import mony from "../assets/mony.svg";
import pp from "../assets/pp.svg";
import bbuild from "../assets/build.svg";
import point from "../assets/point.svg";

const StatsCards = () => {
  return (
    <div className="stats-container">
      
      <div className="stat-card">
        <div className="stat-top">
          <div className="stat-icon"><img src={mony} alt="" /></div>
          <span className="stat-change positive">+32%</span>
        </div>
        <div className="stat-value">$384,500</div>
        <div className="stat-label">Booking Revenue</div>
      </div>

     
      <div className="stat-card">
        <div className="stat-top">
          <div className="stat-icon"><img src={pp} alt="" /></div>
          <span className="stat-change positive">+24%</span>
        </div>
        <div className="stat-value">2,847</div>
        <div className="stat-label">Total Registrations</div>
      </div>

     
      <div className="stat-card">
        <div className="stat-top">
          <div className="stat-icon"><img src={bbuild} alt="" /></div>
          <span className="stat-change positive">+18%</span>
        </div>
        <div className="stat-value">156</div>
        <div className="stat-label">Total Exhibitors</div>
      </div>

      
      <div className="stat-card">
        <div className="stat-top">
          <div className="stat-icon"><img src={point} alt="" /></div>
          <span className="stat-change neutral">85%</span>
        </div>
        <div className="stat-value">136/160</div>
        <div className="stat-label">Venue Occupancy</div>
      </div>
    </div>
  );
};

export default StatsCards;