import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateVisitor.css';
import { supabase } from '../supabase';

const CreateVisitor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        visitor_name: '',
        visitor_email: '',
        visitor_number: '',
        specialty: '',
        status: 'Pending',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

       
        if (!form.visitor_name || !form.visitor_email) {
            setError('Name and email are required.');
            return;
        }

        setLoading(true);

        const { error: sbError } = await supabase.from('visitors').insert([
            {
                visitor_name: form.visitor_name,
                visitor_email: form.visitor_email,
                visitor_number: form.visitor_number,
                specialty: form.specialty,
                status: form.status,
            },
        ]);

        setLoading(false);

        if (sbError) {
            setError('Failed to add visitor: ' + sbError.message);
        } else {
            navigate('/visitors'); 
        }
    };

    return (
        <div className="cv-wrapper">
            <div className="cv-card">

                {/* Header */}
                <div className="cv-header">
                    <div>
                        <h2 className="cv-title">Add New Visitor</h2>
                        <p className="cv-subtitle">Fill in the details to register a new visitor</p>
                    </div>
                    <button className="cv-back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                </div>

                
                <form className="cv-form" onSubmit={handleSubmit}>

                    {error && <div className="cv-error">{error}</div>}

                    <div className="cv-row">
                        <div className="cv-field">
                            <label className="cv-label">Full Name *</label>
                            <input
                                className="cv-input"
                                type="text"
                                name="visitor_name"
                                placeholder="e.g. Dr. Ahmed Hassan"
                                value={form.visitor_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="cv-field">
                            <label className="cv-label">Email *</label>
                            <input
                                className="cv-input"
                                type="email"
                                name="visitor_email"
                                placeholder="e.g. a.hassan@hospital.ae"
                                value={form.visitor_email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="cv-row">
                        <div className="cv-field">
                            <label className="cv-label">Phone Number</label>
                            <input
                                className="cv-input"
                                type="text"
                                name="visitor_number"
                                placeholder="e.g. +971 50 123 4567"
                                value={form.visitor_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cv-field">
                            <label className="cv-label">Specialty</label>
                            <input
                                className="cv-input"
                                type="text"
                                name="specialty"
                                placeholder="e.g. Cardiology"
                                value={form.specialty}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="cv-row">
                        <div className="cv-field">
                            <label className="cv-label">Status</label>
                            <select
                                className="cv-input cv-select"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Verified">Verified</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="cv-actions">
                        <button
                            type="button"
                            className="cv-cancel-btn"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="cv-submit-btn" disabled={loading}>
                            {loading ? 'Adding...' : '+ Add Visitor'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateVisitor;