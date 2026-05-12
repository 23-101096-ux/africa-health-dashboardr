import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './NavigationLinks.css';

import dd from "../assets/Icon.svg";
import add from "../assets/addd.svg";
import deletee from '../assets/delete.svg';

function NavigationLinks() {

    const [myLinks, setMyLinks] = useState([]);
    const [name, setName] = useState('');
    const [linkUrl, setLinkUrl] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const { data } = await supabase
            .from('nav_links')
            .select('*')
            .order('order_index', { ascending: true });

        if (data) {
            setMyLinks(data);
        }
    }

    async function handleAdd() {
       
        if (name === '' || linkUrl === '') {
            alert("Please fill in both fields!");
            return;
        }


        const { error } = await supabase.from('nav_links').insert({
            label: name,
            url: linkUrl,
            order_index: myLinks.length + 1,
            is_active: true
        });

      
        if (error) {
            console.log("Insert error:", error.message);
            alert("Could not add link: " + error.message);
            return;
        }

      
        setName('');
        setLinkUrl('');
        loadData();
    }

    async function handleDelete(id) {
        const { error } = await supabase
            .from('nav_links')
            .delete()
            .eq('id', id);

        if (error) {
            console.log("Delete error:", error.message);
            return;
        }

        loadData();
    }

    return (
        <div className="nav-container">
            <h2><img src={dd} alt="" /> My Navigation Links</h2>

            <div className="link-list">
                {myLinks.map((item) => (
                    <div key={item.id} className="link-item">
                        <div>
                            <strong>{item.label}</strong>
                            <p>{item.url}</p>
                        </div>
                        <button onClick={() => handleDelete(item.id)}>
                            <img src={deletee} alt="delete" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="add-box">
                <h3>Add a New Link</h3>
                <input
                    type="text"
                    placeholder="Name (e.g. Home)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL (e.g. /home)"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                />
                <button onClick={handleAdd}>
                    <img src={add} alt="" /> Add Link
                </button>
            </div>
        </div>
    );
}

export default NavigationLinks;