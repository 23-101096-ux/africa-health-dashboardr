import React from 'react';
import "./visitors.css"; 
import Sidebar from '../components/Sidebar';
import ExhibitorsList from '../components/Exhibitorslist';

const Exhibitors = () => {
    return (
        <div className="page-layout">
            <Sidebar currentPage="Exhibitors" />
            <div className="main-content">
                <div className="content-padding">
                    <div className="overview-header">
                        <h1>Exhibitor Onboarding</h1>
                    </div>

                    <ExhibitorsList />
                </div>
            </div>
        </div>
    );
}

export default Exhibitors;