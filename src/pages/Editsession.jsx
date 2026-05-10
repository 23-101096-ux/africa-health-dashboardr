import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import './Createsession.css'; 

const EditSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        speaker_name: '',
        speaker_title: '',
        session_date: '',
        start_time: '',
        end_time: '',
        hall_name: '',
        capacity: '',
        registered_attendees: '',
    });

    useEffect(() => {
        async function getSession() {
            const { data } = await supabase
                .from('conference_sessions')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setForm({
                    title: data.title || '',
                    speaker_name: data.speaker_name || '',
                    speaker_title: data.speaker_title || '',
                    session_date: data.session_date || '',
                    start_time: data.start_time?.slice(0, 5) || '',
                    end_time: data.end_time?.slice(0, 5) || '',
                    hall_name: data.hall_name || '',
                    capacity: data.capacity || '',
                    registered_attendees: data.registered_attendees || '',
                });
            }
        }
        getSession();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('conference_sessions')
            .update({
                title: form.title,
                speaker_name: form.speaker_name,
                speaker_title: form.speaker_title,
                session_date: form.session_date,
                start_time: form.start_time,
                end_time: form.end_time,
                hall_name: form.hall_name,
                capacity: parseInt(form.capacity) || 0,
                registered_attendees: parseInt(form.registered_attendees) || 0,
            })
            .eq('id', id);

        setLoading(false);

        if (error) {
            alert('Error: ' + error.message);
        } else {
            navigate('/sessions');
        }
    };

    return (
        <div className="cs-wrapper">
            <div className="cs-card">
                <div className="cs-header">
                    <h2>Edit Session</h2>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="cs-field">
                        <label className="cs-label">Session Title</label>
                        <input
                            className="cs-input"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="cs-row">
                        <div className="cs-field">
                            <label className="cs-label">Speaker Name</label>
                            <input
                                className="cs-input"
                                type="text"
                                name="speaker_name"
                                value={form.speaker_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cs-field">
                            <label className="cs-label">Date</label>
                            <input
                                className="cs-input"
                                type="date"
                                name="session_date"
                                value={form.session_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="cs-row">
                        <div className="cs-field">
                            <label className="cs-label">Start Time</label>
                            <input
                                className="cs-input"
                                type="time"
                                name="start_time"
                                value={form.start_time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="cs-field">
                            <label className="cs-label">End Time</label>
                            <input
                                className="cs-input"
                                type="time"
                                name="end_time"
                                value={form.end_time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="cs-row">
                        <div className="cs-field">
                            <label className="cs-label">Capacity</label>
                            <input
                                className="cs-input"
                                type="number"
                                name="capacity"
                                value={form.capacity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cs-field">
                            <label className="cs-label">Registered</label>
                            <input
                                className="cs-input"
                                type="number"
                                name="registered_attendees"
                                value={form.registered_attendees}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="cs-actions">
                        <button type="button" className="cs-cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="cs-submit-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSession;