import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './MessagesInbox.css';

import deletee from '../assets/delete.svg';
import cc from '../assets/callender.svg';
import mess from '../assets/message.svg';

function MessagesInbox() {

    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null); 

    useEffect(() => {
        loadMessages();
    }, []);

    async function loadMessages() {
        const { data } = await supabase
            .from('messangs')
            .select('*')
            .order('created_at'); 

        if (data) {
            setMessages(data);
        }
    }

    async function deleteMessage(id) {
        await supabase.from('messangs').delete().eq('id', id);
        setSelected(null);
        loadMessages();
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        var date = new Date(dateString);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }

    return (
        <div className="inbox-card">

            
            <div className="inbox-header">
                <span className="inbox-icon"><img src={mess} alt="" /></span>
                <h2 className="inbox-title">Customer Messages</h2>
                <span className="inbox-count">{messages.length}</span>
            </div>

            <div className="inbox-body">

               
                <div className="inbox-list">
                    {messages.length === 0 && (
                        <p className="inbox-empty">No messages yet.</p>
                    )}

                    {messages.map(function(msg) {
                        return (
                            <div
                                key={msg.id}
                                className={`inbox-row ${selected && selected.id === msg.id ? 'inbox-row-active' : ''}`}
                                onClick={() => setSelected(msg)}
                            >
                               
                                <div className="inbox-avatar">
                                    {msg.user_name ? msg.user_name[0].toUpperCase() : '?'}
                                </div>

                                <div className="inbox-row-info">
                                    <div className="inbox-row-top">
                                        <span className="inbox-name">{msg.user_name}</span>
                                        <span className="inbox-date">{formatDate(msg.created_at)}</span>
                                    </div>
                                    <p className="inbox-preview">{msg.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

        
                <div className="inbox-detail">
                    {selected ? (
                        <>
                            <div className="detail-header">
                                <div className="detail-avatar">
                                    {selected.user_name ? selected.user_name[0].toUpperCase() : '?'}
                                </div>
                                <div className="detail-info">
                                    <p className="detail-name">{selected.user_name}</p>
                                    <p className="detail-email">{selected.user_email}</p>
                                </div>
                                <button
                                    className="detail-delete"
                                    onClick={() => deleteMessage(selected.id)}
                                    title="Delete message"
                                >
                                    <img src={deletee} alt="" />
                                </button>
                            </div>

                            <div className="detail-meta">
                                <span><img src={cc} alt="" /> {formatDate(selected.created_at)}</span>
                            </div>

                            <div className="detail-message">
                                <p>{selected.message}</p>
                            </div>
                        </>
                    ) : (
                        <div className="detail-empty">
                            <span className="detail-empty-icon"><img src={mess} alt="" /></span>
                            <p>Select a message to read it</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default MessagesInbox;