import React from 'react';
import './Floorquickactions.css';
import edit from '../assets/edit.svg';
import grid from '../assets/floorgrid.svg';

 
function FloorquickActions() {
    return (
        <div className="actions-card">
            <h3 className="actions-title">Quick Actions</h3>
 
            <button className="action-btn">
                <img src={grid} alt="" /> Export Floor Plan
            </button>
 
            <button className="action-btn">
                <img src={edit} alt="" /> Edit Hall Dimensions
            </button>
        </div>
    );
}
 
export default FloorquickActions;