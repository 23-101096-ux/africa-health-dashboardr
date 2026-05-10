import React from 'react';
import "./visitors.css"; 
import Sidebar from '../components/Sidebar';
import SessionsList from '../components/Sessionslist';

const Sessions = () => {
    return ( <>
     <div className="page-layout">
            <Sidebar currentPage="sessions" />
            <div className="main-content">
                <div className="content-padding">
                    <div className="overview-header">
                        <h1>Conference Scheduling</h1>
                    </div>
                    <SessionsList />

                </div>
            </div>
        </div>
    </> );
}
 
export default Sessions;
