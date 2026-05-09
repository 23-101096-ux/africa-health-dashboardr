import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './Visitorstable.css';

import edit from '../assets/edit.svg';
import deletee from '../assets/delete.svg';
import veriff from '../assets/verified.svg';
import VisitorsSearchBar from './Visitorssearchbar';

const VisitorsTable = () => {
    const [visitors, setVisitors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVisitors() {
            const { data } = await supabase.from('visitors').select('*');
            if (data) { setVisitors(data); }
        }
        fetchVisitors();
    }, []);

    const handleDelete = async (id) => {
        await supabase.from('visitors').delete().eq('id', id);
        const updatedList = visitors.filter(v => v.id !== id);
        setVisitors(updatedList);
    };

    const filteredVisitors = visitors.filter((v) => {
        const name = v.visitor_name?.toLowerCase() || '';
        const email = v.visitor_email?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    return (
        <div>
            <VisitorsSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="vt-card">
                <div className="vt-header">
                    <h3 className="vt-title">All Visitors</h3>
                    <p className="vt-subtitle">View and manage visitor registrations</p>
                </div>
                <div className="vt-wrapper">
                    <table className="vt-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Specialty</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVisitors.map((visitor) => (
                                <tr key={visitor.id}>
                                    <td>{visitor.visitor_name}</td>
                                    <td>{visitor.specialty}</td>
                                    <td>
                                        <div>{visitor.visitor_email}</div>
                                        <div style={{ fontSize: '12px', color: 'gray' }}>{visitor.visitor_number}</div>
                                    </td>
                                    <td>
                                        <span className={`vt-status ${visitor.status?.toLowerCase()}`}>
                                            {visitor.status === 'Verified' && (
                                                <img src={veriff} alt="" style={{ width: '14px', marginRight: '5px' }} />
                                            )}
                                            {visitor.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="vt-actions">
                                          
                                            <button className="vt-btn-icon" onClick={() => navigate('/editVisitor/' + visitor.id)}>
                                                <img src={edit} alt="edit" />
                                            </button>

                                            <button className="vt-btn-icon" onClick={() => handleDelete(visitor.id)}>
                                                <img src={deletee} alt="delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VisitorsTable;