import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Nav from './nav';
import './sidebar.css';

import logo from '../assets/image-1.svg';
import dash from "../assets/over.svg";
import event from "../assets/profile.svg";
import booking from "../assets/exhibitors.svg";
import category from "../assets/map.svg";
import users from "../assets/con.svg";
import support from "../assets/setting.svg";
import burger from "../assets/burger.svg";
import logoutIcon from "../assets/logout.svg";



const Sidebar = ({ currentPage }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const closeSidebar = () => setMenuOpen(false);
    const toggleSidebar = () => setMenuOpen(prev => !prev);

    return (
        <>
   
            <button className="mobile-toggle" onClick={toggleSidebar}>
                <img src={burger} alt="menu" />
            </button>

          
            <div
                className={`sidebar-overlay ${menuOpen ? 'active' : ''}`}
                onClick={closeSidebar}
            />

            <div className={`sidebar ${menuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-top">
                    <img src={logo} alt="EventHub" />
                    <h1> Admin Platform </h1>
                </div>

                <div className="sidebar-mid">
                    <Nav
                        navtext="Overview"
                        iconImg={dash}
                        s={currentPage === "dash" ? "active-link" : "normal-link"}
                        path="/Admindashboard"
                    />
                    <Nav
                        navtext="Visitors"
                        iconImg={event}
                        s={currentPage === "visitors" ? "active-link" : "normal-link"}
                        path="/visitors" 
                    />
                    <Nav
                        navtext="Exhibitors"
                        iconImg={booking}
                        s={currentPage === "Exhibitors" ? "active-link" : "normal-link"}
                        path="/exhibitors"
                    />
                    <Nav
                        navtext="Floor Plan"
                        iconImg={category}
                        s={currentPage === "floor" ? "active-link" : "normal-link"}
                        path="/Floorplan"
                    />
                    <Nav
                        navtext="Conference"
                        iconImg={users}
                        s={currentPage === "sessions" ? "active-link" : "normal-link"}
                        path="/sessions"
                    />
                    <Nav
                        navtext="Settings"
                        iconImg={support}
                        s={currentPage === "settings" ? "active-link" : "normal-link"}
                        path="/settings"
                    />

                </div>

                <div className="sidebar-last">
                    <div className="logout-container" onClick={() => navigate('/login/admin')}>
                        <img src={logoutIcon} alt="logout" />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;