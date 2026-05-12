import React from 'react';
import './OccupancyStats.css';

function FlooroccupancyStats({ booths }) {
   
    let total = booths.length;
    let assigned = 0;
    let available = 0;

   
    booths.forEach(booth => {
        if (booth.status === 'Assigned') {
            assigned = assigned + 1;
        } else {
            available = available + 1;
        }
    });

  
    let rate = 0;
    if (total > 0) {
        rate = Math.round((assigned / total) * 100);
    }

    return (
        <div className="stats-box">
            <h3 className="title">Occupancy Stats</h3>

            <div className="row">
                <span>Total Booths</span>
                <span className="value">{total}</span>
            </div>

            <div className="row">
                <span>Assigned</span>
                <span className="value green">{assigned}</span>
            </div>

            <div className="row">
                <span>Available</span>
                <span className="value">{available}</span>
            </div>

            <div className="row underline-none">
                <span>Occupancy Rate</span>
                <span className="value orange">{rate}%</span>
            </div>
        </div>
    );
}

export default FlooroccupancyStats;