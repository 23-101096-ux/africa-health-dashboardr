import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './Sessionslist.css';
import SessionsSearchBar from './Sessionssearchbar';


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
        setSessions(result.data);
    }
 
    async function handleDelete(id) {
        await supabase.from('conference_sessions').delete().eq('id', id);
        setSessions(sessions.filter(s => s.id !== id));
    }
 
    const filtered = sessions.filter(s =>
        s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.speaker_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    function getTag(title) {
        if (title.includes('keynote'))  return { label: 'Keynote',  cls: 'tag-keynote'  };
        if (title.includes('seminar'))  return { label: 'Seminar',  cls: 'tag-seminar'  };
        if (title.includes('workshop')) return { label: 'Workshop', cls: 'tag-workshop' };
        if (title.includes('panel'))    return { label: 'Panel',    cls: 'tag-panel'    };
        return { label: 'Session', cls: 'tag-default' };
    }
 
    return (
        <div>
            <SessionsSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
 
            <div className="sl-list">
                {filtered.map(session => {
                    const tag  = getTag(session.title?.toLowerCase() || '');
                    const time = session.start_time?.slice(0,5) + ' - ' + session.end_time?.slice(0,5);
 
                    return (
                        <div className="sl-card" key={session.id}>
 
                     
                            <div className="sl-top">
                                <h3 className="sl-title">{session.title}</h3>
                                <span className={'sl-tag ' + tag.cls}>{tag.label}</span>
                            </div>
 
                       
                            <div className="sl-meta">
                                <span className="sl-meta-item">
                                    <img src={pp} alt="" /> {session.speaker_name}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={cc} alt="" /> {session.session_date}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={clock} alt="" /> {time}
                                </span>
                                <span className="sl-meta-item">
                                    <img src={poinn} alt="" /> {session.hall_name}
                                </span>
                            </div>
 
                     
                            <div className="sl-actions">
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