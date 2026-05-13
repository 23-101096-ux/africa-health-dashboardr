import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './Sessionslist.css';
import SessionsSearchBar from './Sessionssearchbar';

// Asset Imports
import edit from '../assets/edit.svg';
import deletee from '../assets/delete.svg';
import pp from '../assets/pp.svg';
import cc from '../assets/callender.svg';
import poinn from '../assets/poinnn.svg';
import clock from '../assets/clock.svg';

function SessionsList() {
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getSessions();
    }, []);

    async function getSessions() {
        const result = await supabase.from('conference_sessions').select('*');
        if (result.data) setSessions(result.data);
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this session?");
        if (confirmDelete) {
            await supabase.from('conference_sessions').delete().eq('id', id);
            setSessions(sessions.filter(s => s.id !== id));
        }
    }

    /**
     * Scheduling Logic: Checks if the event is today or in the future.
     * The "Book Session" button only appears if this returns true.
     */
    const isBookingAvailable = (sessionDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only dates
        const eventDate = new Date(sessionDate);
        return eventDate >= today;
    };

    const filtered = sessions.filter(s =>
        s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.speaker_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function getTag(title) {
        const t = title.toLowerCase();
        if (t.includes('keynote'))  return { label: 'Keynote',  cls: 'tag-keynote'  };
        if (t.includes('seminar'))  return { label: 'Seminar',  cls: 'tag-seminar'  };
        if (t.includes('workshop')) return { label: 'Workshop', cls: 'tag-workshop' };
        if (t.includes('panel'))    return { label: 'Panel',    cls: 'tag-panel'    };
        return { label: 'Session', cls: 'tag-default' };
    }

    return (
        <div className="sessions-list-wrapper">
            <SessionsSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="sl-list">
                {filtered.map(session => {
                    const tag = getTag(session.title || '');
                    const timeRange = `${session.start_time?.slice(0, 5)} - ${session.end_time?.slice(0, 5)}`;
                    const canBook = isBookingAvailable(session.session_date);

                    return (
                        <div className="sl-card" key={session.id}>
                            {/* Card Header */}
                            <div className="sl-top">
                                <h3 className="sl-title">{session.title}</h3>
                                <span className={`sl-tag ${tag.cls}`}>{tag.label}</span>
                            </div>

                            {/* Meta Information Row */}
                            <div className="sl-meta">
                                <span className="sl-meta-item">
                                    <img src={pp} alt="Speaker" /> {session.speaker_name}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={cc} alt="Date" /> {session.session_date}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={clock} alt="Time" /> {timeRange}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={poinn} alt="Location" /> {session.hall_name}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="sl-actions">
                                {canBook && (
                                    <button 
                                        className="sl-btn-book" 
                                        onClick={() => navigate('/sessionDetails')}
                                    >
                                        Book Session
                                    </button>
                                )}
                                
                                <button className="sl-btn-edit" onClick={() => navigate('/editSession/' + session.id)}>
                                    <img src={edit} alt="" /> Edit Details
                                </button>
                                
                                <button className="sl-btn-view">
                                    <img src={pp} alt="" /> View Attendees
                                </button>
                                
                                <button className="sl-btn-delete" onClick={() => handleDelete(session.id)}>
                                    <img src={deletee} alt="" /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SessionsList;