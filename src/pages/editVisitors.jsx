import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './CreateVisitor.css'; 

const EditVisitor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getVisitor() {
            const { data } = await supabase
                .from('visitors')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setName(data.visitor_name);
                setEmail(data.visitor_email);
                setPhone(data.visitor_number);
                setSpecialty(data.specialty);
                setStatus(data.status);
            }
        }
        getVisitor();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('visitors')
            .update({
                visitor_name: name,
                visitor_email: email,
                visitor_number: phone,
                specialty: specialty,
                status: status,
            })
            .eq('id', id);

        setLoading(false);

        if (error) {
            alert('Error updating: ' + error.message);
        } else {
            navigate('/visitors'); 
        }
    }

    return (
        <div className="cv-wrapper">
            <div className="cv-card">
                <div className="cv-header">
                    <div>
                        <h2 className="cv-title">Edit Visitor</h2>
                        <p className="cv-subtitle">Update the details for this registration</p>
                    </div>
                    <button className="cv-back-btn" onClick={() => navigate(-1)}>← Back</button>
                </div>

                <form className="cv-form" onSubmit={handleUpdate}>
                    <div className="cv-row">
                        <div className="cv-field">
                            <label className="cv-label">Full Name</label>
                            <input
                                className="cv-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cv-field">
                            <label className="cv-label">Email</label>
                            <input
                                className="cv-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="cv-field">
                            <label className="cv-label">Specialty</label>
                            <input
                                className="cv-input"
                                type="text"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="cv-row">
                        <div className="cv-field">
                            <label className="cv-label">Status</label>
                            <select
                                className="cv-input cv-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Verified">Verified</option>
                            </select>
                        </div>
                    </div>

                    <div className="cv-actions">
                        <button type="button" className="cv-cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button type="submit" className="cv-submit-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Update Visitor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVisitor;