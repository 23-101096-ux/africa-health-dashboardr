import React from 'react';
import './graphs.css';
import graph from "../assets/totalregistrations-graph.png";


const TotalRegistrations = () => {
  return (
    <div className="card">
      <h2 className="title">Total Registrations (2026)</h2>
      <div className="chart-area">
        <div className="img-placeholder"><img src={graph} alt="" /></div>
      </div>
    </div>
  );
};

export default TotalRegistrations;