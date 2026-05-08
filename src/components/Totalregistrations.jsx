import React from 'react';
import './graphs.css';
import graph from "../assets/totalregistrations-graph.png";


const TotalRegistrations = () => {
  return (
    <div className="reg-card">
      <h2 className="reg-title">Total Registrations (2026)</h2>
      <div className="reg-chart-area">
        <div className="reg-img-placeholder"><img src={graph} alt="" /></div>
      </div>
    </div>
  );
};

export default TotalRegistrations;