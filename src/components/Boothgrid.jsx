import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './BoothGrid.css';

import dd from "../assets/dddd.svg";
import add from "../assets/addd.svg";

const Boothgrid = ({ booths }) => {
    return (
        <div className="layout-container">
            <div className="header-row">
                <h1>Main Exhibition Hall</h1>
                <div className="header-buttons">

                    <button className="btn-save"> 
                        <img src={dd} alt="" /> Save Layout
                    </button>
                    <button className="btn-add">
                        <img src={add} alt="" /> Add Booth
                    </button>
                </div>
            </div>

      
            <div className="booth-grid">
            
                {Array.isArray(booths) && booths.length > 0 ? (
                    booths.map((booth) => (
                        <div key={booth.id} className="booth-card">
                            <div className="card-top">
                                <span className="booth-id">{booth.booth_number}</span>
                                <span className="booth-badge">{booth.size}</span>
                            </div>
                            <div className="card-content">
                                <h3>{booth.status}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No booths found in database.</p> 
                )}
            </div>


            <div className="legend">
                <div className="legend-item"><span className="dot green"></span> Assigned</div>
                <div className="legend-item"><span className="dot gray"></span> Available</div>
                <div className="legend-item"><span className="dot orange"></span> Premium</div>
            </div>
        </div>
    );
};

export default Boothgrid;