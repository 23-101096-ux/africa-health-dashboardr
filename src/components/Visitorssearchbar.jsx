import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Visitorssearchbar.css';

import search from "../assets/search.svg";
import addP from "../assets/addperson.svg";

const VisitorsSearchBar = ({ searchTerm, onSearchChange }) => {
    const navigate = useNavigate();

    return (
        <div className="vsb-wrapper">
            <div className="vsb-search-box">
                <span className="vsb-search-icon"><img src={search} alt="" /></span>
                <input
                    type="text"
                    className="vsb-input"
                    placeholder="Search visitors by name, specialty, or email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <button className="vsb-add-btn" onClick={() => navigate('/createVisitor')}>
                <span className="vsb-add-icon"><img src={addP} alt="" /></span>
                Add Visitor
            </button>
        </div>
    );
};

export default VisitorsSearchBar;