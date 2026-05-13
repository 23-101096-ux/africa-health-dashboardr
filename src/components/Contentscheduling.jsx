import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './ContentScheduling.css';

function ContentScheduling() {

    const [sessions, setSessions] = useState([]);
    const [today] = useState(new Date().toISOString().split('T')[0]); // today's date as YYYY-MM-DD

    // load sessions when component mounts
    useEffect(() => {
        getSessions();
    }, []);

    async function getSessions() {
        const result = await supabase
            .from('conference_sessions')
            .select('*')
            .order('session_date', { ascending: true });

        if (result.data) {
            setSessions(result.data);
        }
    }

    // check if booking button should show:
    // only show when session is today OR in the future (not past)
    // AND there are still spots available
    function canBook(session) {
        const sessionDate  = session.session_date;
        const spotsLeft    = (session.capacity || 0) - (session.registered_attendees || 0);
        const isNotPast    = sessionDate >= today;
        const hasSpotsLeft = spotsLeft > 0;

        return isNotPast && hasSpotsLeft;
    }

    // how many spots are left
    function spotsLeft(session) {
        return (session.capacity || 0) - (session.registered_attendees || 0);
    }

    // format time — remove seconds (09:00:00 → 09:00)
    function formatTime(time) {
        if (!time) return '—';
        return time.slice(0, 5);
    }

    // is this session happening today
    function isToday(sessionDate) {
        return sessionDate === today;
    }

    // is this session in the past
    function isPast(sessionDate) {
        return sessionDate < today;
    }

    return (
        <div className="cs-wrapper">

       
            <div className="cs-header">
                <h3 className="cs-title">Content Scheduling</h3>
                <p className="cs-subtitle">{sessions.length} sessions scheduled</p>
            </div>


            <div className="cs-list">
                {sessions.length === 0 && (
                    <p className="cs-empty">No sessions found.</p>
                )}

                {sessions.map(session => {
                    const bookable  = canBook(session);
                    const spots     = spotsLeft(session);
                    const today_tag = isToday(session.session_date);
                    const past_tag  = isPast(session.session_date);

                    return (
                        <div
                            key={session.id}
                            className={'cs-card ' + (past_tag ? 'cs-past' : today_tag ? 'cs-today' : 'cs-upcoming')}
                        >
                            {/* left: date box */}
                            <div className="cs-date-box">
                                <span className="cs-date-day">
                                    {session.session_date
                                        ? new Date(session.session_date).getDate()
                                        : '—'}
                                </span>
                                <span className="cs-date-month">
                                    {session.session_date
                                        ? new Date(session.session_date).toLocaleString('en', { month: 'short' }).toUpperCase()
                                        : ''}
                                </span>
                            </div>

                            {/* middle: session info */}
                            <div className="cs-info">
                                <div className="cs-info-top">
                                    <h4 className="cs-session-title">{session.title}</h4>
                                    {today_tag && <span className="cs-tag cs-tag-today">Today</span>}
                                    {past_tag  && <span className="cs-tag cs-tag-past">Past</span>}
                                </div>

                                <div className="cs-meta">
                                    <span>🕐 {formatTime(session.start_time)} – {formatTime(session.end_time)}</span>
                                    <span>📍 {session.hall_name || '—'}</span>
                                    <span>👤 {session.speaker_name || '—'}</span>
                                </div>

                                {/* capacity bar */}
                                <div className="cs-capacity-row">
                                    <div className="cs-capacity-bar-bg">
                                        <div
                                            className="cs-capacity-bar-fill"
                                            style={{
                                                width: session.capacity > 0
                                                    ? Math.min(100, (session.registered_attendees / session.capacity) * 100) + '%'
                                                    : '0%'
                                            }}
                                        />
                                    </div>
                                    <span className="cs-capacity-text">
                                        {session.registered_attendees || 0} / {session.capacity || 0} seats
                                    </span>
                                </div>
                            </div>

                            {/* right: book button — ONLY shows when bookable */}
                            <div className="cs-action">
                                {bookable ? (
                                    <button className="cs-book-btn">
                                        Book
                                        <span className="cs-spots">{spots} left</span>
                                    </button>
                                ) : past_tag ? (
                                    <span className="cs-ended-label">Ended</span>
                                ) : (
                                    <span className="cs-full-label">Full</span>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default ContentScheduling;