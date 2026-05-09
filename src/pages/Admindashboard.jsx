import React from 'react';
import "./Admindashboard.css";
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/Statscards';
import TotalRegistrations from '../components/Totalregistrations';
import RecentActivity from '../components/Recentactivity';
import QuickActions from '../components/Quickactions';
import SystemStatus from '../components/Systemstatus';
import ExhibitorsByCategory from '../components/Exhibitorsbycategory';

const Admindashboard = () => {
    return ( <>
     <div className="page-layout">
          <Sidebar currentPage="dash" />
          <div className="main-content">
            <div className="content-padding">
            <div className="overview-header">
              <h1>Dashboard Overview</h1>
            </div>
            <div className="dashboard-grid">
 
        
            <div className="dashboard-left">
 
             
              <div className="charts-row">
                <TotalRegistrations />
                < ExhibitorsByCategory />
              </div>
 
              <div className="bottom-row">
                <RecentActivity />
                <div className="right-bottom-col">
                  <QuickActions />
                  <SystemStatus />
                </div>
              </div>
 
            </div>
 
             <StatsCards />
 
          </div>
 
        </div>
      </div>
    </div>
    </> );
}
 
export default Admindashboard;