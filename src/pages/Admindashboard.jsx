import React from 'react';
import "./Admindashboard.css";
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/Statscards';
import TotalRegistrations from '../components/Totalregistrations';

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
            <TotalRegistrations />

            </div>
          </div>
        </div>
    </> );
}
 
export default Admindashboard;