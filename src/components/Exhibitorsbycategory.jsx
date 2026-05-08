import React from 'react';
import './graphs.css';
import graph from "../assets/exhibitorsbycategory-graph.png";


const ExhibitorsByCategory = () => {
  return (
    <div className="pie-card">
      <h2 className="pie-title">Exhibitors by Category</h2>
      <div className="pie-chart-area">
        <div className="pie-img-placeholder"><img src={graph} alt="" /></div>
      </div>
    </div>
  );
};

export default ExhibitorsByCategory;