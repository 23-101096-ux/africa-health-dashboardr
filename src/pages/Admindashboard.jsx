import React from 'react';
import "./Admindashboard.css";
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/Statscards';

const Admindashboard = () => {
    return ( <>
     <div className="page-layout">
          <Sidebar currentPage="dash" />
          <div className="main-content">
            <div className="content-padding">
            <div className="overview-header">
              <h1>Dashboard Overview</h1>
            </div>
            <StatsCards />
            
            </div>
          </div>
        </div>
    </> );
}
 
export default Admindashboard;