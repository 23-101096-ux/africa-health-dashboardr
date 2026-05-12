import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './PopupBannerEditor.css';

import photo from '../assets/photo.svg';

function PopupBannerEditor() {

    const [imgUrl, setImgUrl] = useState('');
    const [cat, setCat] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState('');


    const [id, setId] = useState(null);
    const [msg, setMsg] = useState('');


    useEffect(() => {
        loadPopup();
    }, []);

    async function loadPopup() {
        const { data } = await supabase.from('pop_ads').select('*').single();
        
        if (data) {
            setId(data.id);
            setImgUrl(data.img_url);
            setCat(data.category);
            setTitle(data.title);
            setDesc(data.paragapgh);
            setMyDate(data.date);
            setMyTime(data.time);
        }
    }


    async function handleSave() {
        const { error } = await supabase.from('pop_ads').update({
            img_url: imgUrl,
            category: cat,
            title: title,
            paragapgh: desc,
            date: myDate,
            time: myTime
        }).eq('id', id);

        if (error) {
            setMsg("❌ Error saving!");
        } else {
            setMsg("✅ Saved Successfully!");
        }

     
        setTimeout(() => setMsg(''), 2000);
    }

    return (
        <div className="pbe-card">
            <div className="pbe-header">
                <h2><img src={photo} alt="" /> Popup Editor</h2>
            </div>

            <div className="pbe-section">
                <label>Image URL</label>
                <div className="pbe-image-box">
                    {imgUrl ? <img src={imgUrl} className="pbe-preview-img" alt="Preview" /> : <p>No Image Yet</p>}
                </div>
                <input 
                    type="text" 
                    value={imgUrl} 
                    onChange={(e) => setImgUrl(e.target.value)} 
                    placeholder="Paste link here" 
                />
            </div>

            <div className="pbe-row">
                <div className="pbe-field">
                    <label>Category</label>
                    <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} />
                </div>
                <div className="pbe-field">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </div>

            <div className="pbe-section">
                <label>Description</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows="3"></textarea>
            </div>

            <div className="pbe-row">
                <div className="pbe-field">
                    <label>Date</label>
                    <input type="date" value={myDate} onChange={(e) => setMyDate(e.target.value)} />
                </div>
                <div className="pbe-field">
                    <label>Time</label>
                    <input type="time" value={myTime} onChange={(e) => setMyTime(e.target.value)} />
                </div>
            </div>

            {msg && <p className="pbe-message">{msg}</p>}

            <button className="pbe-save-btn" onClick={handleSave}>
                Save Changes
            </button>
        </div>
    );
}

export default PopupBannerEditor;