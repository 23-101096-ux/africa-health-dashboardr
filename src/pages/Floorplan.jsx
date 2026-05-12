import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Sidebar from '../components/Sidebar';


 
import './Floorplan.css';                       
import FloorquickActions from '../components/Floorquickactions';
import FlooroccupancyStats from '../components/Occupancystats';
import Boothgrid from '../components/Boothgrid';

function FloorPlan() {
    const [booths, setBooths] = useState([]);

    useEffect(function() {
        getBooths();
    }, []);

    async function getBooths() {
        const result = await supabase.from('booths').select('*');
        if (result.data) {
            setBooths(result.data);
        }
    }

    return (
        <div className="page-layout">
            <Sidebar currentPage="floor" />

            <div className="main-content">
                <div className="content-padding">
                    <div className="overview-header">
                        <h1>Floor Plan Editor</h1>
                    </div>

                    <div className="fp-body">
                        
                        <div className="fp-left">
                            <Boothgrid booths={booths} />
                        </div>

                        
                        <div className="fp-right">
                            <FlooroccupancyStats booths={booths} />
                            <FloorquickActions />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FloorPlan;