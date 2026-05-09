import React from 'react';
import './Recentactivity.css';


import up from "../assets/up.svg";

const RecentActivity = () => {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <h2 className="activity-title">Recent Platform Activity</h2>
        <button className="activity-view-all">View All</button>
      </div>

      <div className="activity-list">

        <div className="activity-item">
          <div className="activity-icon"><img src={up} alt="" /></div>
          <div className="activity-info">
            <p className="activity-item-title">New exhibitor registered</p>
            <p className="activity-item-subtitle">Advanced Diagnostics Ltd</p>
          </div>
          <span className="activity-time">5 min ago</span>
        </div>


        <div className="activity-item">
          <div className="activity-icon"><img src={up} alt="" /></div>
          <div className="activity-info">
            <p className="activity-item-title">Visitor verified</p>
            <p className="activity-item-subtitle">Dr. Ahmed Hassan</p>
          </div>
          <span className="activity-time">12 min ago</span>
        </div>


        <div className="activity-item">
          <div className="activity-icon"><img src={up} alt="" /></div>
          <div className="activity-info">
            <p className="activity-item-title">Booth assignment</p>
            <p className="activity-item-subtitle">B23 to PharmaCorp</p>
          </div>
          <span className="activity-time">25 min ago</span>
        </div>


        <div className="activity-item">
          <div className="activity-icon"><img src={up} alt="" /></div>
          <div className="activity-info">
            <p className="activity-item-title">Payment received</p>
            <p className="activity-item-subtitle">$2,500</p>
          </div>
          <span className="activity-time">1 hour ago</span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;