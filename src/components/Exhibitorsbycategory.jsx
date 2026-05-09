import React from 'react';
import './graphs.css';
import graph from "../assets/exhibitorsbycategory-graph.png";


const ExhibitorsByCategory = () => {
  return (
    <div className="card">
      <h2 className="title">Exhibitors by Category</h2>
      <div className="chart-area">
        <div className="img-placeholder"><img src={graph} alt="" /></div>
      </div>
    </div>
  );
};

export default ExhibitorsByCategory;