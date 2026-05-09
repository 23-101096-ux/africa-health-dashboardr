import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './CreateExhibitor.css';

const CreateExhibitor = () => {
    const navigate = useNavigate();

  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [boothId, setBoothId] = useState('');
    const [status, setStatus] = useState('Pending Review');
    

    const [loading, setLoading] = useState(false);
    const [boothsList, setBoothsList] = useState([]);


    useEffect(() => {
        async function getBooths() {
            const { data } = await supabase.from('booths').select('id, name');
            if (data) {
                setBoothsList(data);
            }
        }
        getBooths();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

       
        const { error } = await supabase.from('exhibitor').insert([
            {
                exhibitor_name: name,
                exhibitor_email: email,
                category: category,
                location: location,
                booths_id: boothId ? parseInt(boothId) : null,
                status: status,
            },
        ]);

        setLoading(false);

        if (error) {
            alert('Error: ' + error.message);
        } else {
            navigate('/exhibitors');
        }
    }

    return (
        <div className="ce-wrapper">
            <div className="ce-card">
                <div className="ce-header">
                    <div>
                        <h2 className="ce-title">Add New Exhibitor</h2>
                        <p className="ce-subtitle">Fill in the details to register a new exhibitor</p>
                    </div>
                    <button className="ce-back-btn" onClick={() => navigate(-1)}>← Back</button>
                </div>

                <form className="ce-form" onSubmit={handleSubmit}>
                    <div className="ce-row">
                        <div className="ce-field">
                            <label className="ce-label">Exhibitor Name</label>
                            <input
                                className="ce-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="ce-field">
                            <label className="ce-label">Email</label>
                            <input
                                className="ce-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="ce-row">
                        <div className="ce-field">
                            <label className="ce-label">Category</label>
                            <input
                                className="ce-input"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="ce-field">
                            <label className="ce-label">Location</label>
                            <input
                                className="ce-input"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ce-row">
                        <div className="ce-field">
                            <label className="ce-label">Assign Booth</label>
                            <select
                                className="ce-input ce-select"
                                value={boothId}
                                onChange={(e) => setBoothId(e.target.value)}
                            >
                                <option value="">— No booth assigned —</option>
                                {boothsList.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="ce-field">
                            <label className="ce-label">Status</label>
                            <select
                                className="ce-input ce-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending Review">Pending Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="ce-actions">
                        <button type="button" className="ce-cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="ce-submit-btn" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Exhibitor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExhibitor;