import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Visitorssearchbar.css';

import search from "../assets/search.svg";
import bbuild from "../assets/build.svg";

const ExhibitorsSearchBar = ({ searchTerm, onSearchChange }) => {
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <div className="search-box">
                <span className="search-icon"><img src={search} alt="" /></span>
                <input
                    type="text"
                    className="input"
                    placeholder="Search exhibitors by name, category, or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <button className="add-btn" onClick={() => navigate('/createExhibitor')}>
                <span><img src={bbuild} alt="" /></span>
                Add Exhibitor
            </button>
        </div>
    );
};

export default ExhibitorsSearchBar;