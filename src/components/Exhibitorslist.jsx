import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './ExhibitorsList.css';
import ExhibitorsSearchBar from './Exhibitorssearchbar';

import bbuild from "../assets/build.svg";
import poinn from "../assets/poinnn.svg";

const ExhibitorsList = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchExhibitors() {
            const { data } = await supabase
                .from('exhibitor')
                .select('*, booths(booth_number)');
            
            if (data) {
                setExhibitors(data);
            }
        }
        fetchExhibitors();
    }, []);

    async function handleStatusChange(id, newStatus) {
        await supabase.from('exhibitor').update({ status: newStatus }).eq('id', id);
        
        const updatedList = exhibitors.map((ex) => {
            if (ex.id === id) {
                return { ...ex, status: newStatus };
            } else {
                return ex;
            }
        });
        setExhibitors(updatedList);
    }

    const filteredExhibitors = exhibitors.filter((ex) => {
        const name = ex.exhibitor_name?.toLowerCase() || '';
        const email = ex.exhibitor_email?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return name.includes(search) || email.includes(search);
    });

    return (
        <div>
            {/* This adds the search bar and the "Add" button to the top of your list */}
            <ExhibitorsSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="el-list">
                {filteredExhibitors.length === 0 ? (
                    <div className="el-empty">No exhibitors found.</div>
                ) : (
                    filteredExhibitors.map((ex) => (
                        <div className="el-card" key={ex.id}>
                            <div className="el-icon">
                                <img src={bbuild} alt="icon" style={{ width: '24px' }} />
                            </div>

                            <div className="el-info">
                                <div className="el-top-row">
                                    <h3 className="el-name">{ex.exhibitor_name}</h3>
                                    <span className={`vt-status ${ex.status?.toLowerCase().replace(' ', '-')}`}>
                                        {ex.status}
                                    </span>
                                </div>
                                <p className="el-detail">{ex.exhibitor_email} • {ex.category || 'No Category'}</p>
                                
                                {ex.booths && (
                                    <p className="el-booth">
                                        <img src={poinn} alt="" style={{ width: '12px' }} /> {ex.booths.name}
                                    </p>
                                )}

                                <div className="el-actions">
                                    <button className="el-btn el-btn-view" onClick={() => alert('Viewing info for ' + ex.exhibitor_name)}>
                                        View Application
                                    </button>

                                    {ex.status !== 'Approved' && ex.status !== 'Rejected' && (
                                        <>
                                            <button 
                                                className="el-btn el-btn-approve" 
                                                onClick={() => handleStatusChange(ex.id, 'Approved')}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="el-btn el-btn-reject" 
                                                onClick={() => handleStatusChange(ex.id, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExhibitorsList;