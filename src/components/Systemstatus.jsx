import React from 'react';
import './Systemstatus.css';

const SystemStatus = () => {
  return (
    <div className="status-card">
      <h2 className="status-title">System Status</h2>
      <div className="status-list">
        
   
        <div className="status-row">
          <span className="status-name">Database</span>
          <div className="status-badge">
            <span className="status-dot green"></span>
            Operational
          </div>
        </div>

 
        <div className="status-row">
          <span className="status-name">API Services</span>
          <div className="status-badge">
            <span className="status-dot green"></span>
            Operational
          </div>
        </div>


        <div className="status-row">
          <span className="status-name">Payment Gateway</span>
          <div className="status-badge">
            <span className="status-dot green"></span>
            Operational
          </div>
        </div>

      </div>
    </div>
  );
};

export default SystemStatus;