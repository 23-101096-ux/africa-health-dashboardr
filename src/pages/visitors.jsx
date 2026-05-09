import React from 'react';
import "./visitors.css";
import Sidebar from '../components/Sidebar';
import VisitorsTable from '../components/Visitorstable';


const VisitorManagement = () => { 
    return (
        <div className="page-layout">
            <Sidebar currentPage="visitors" />
            <div className="main-content">
                <div className="content-padding">
                    <div className="overview-header">
                        <h1>Visitor Management</h1>
                    </div>
                    <VisitorsTable />
                </div>
            </div>
        </div>
    );
}

export default VisitorManagement;