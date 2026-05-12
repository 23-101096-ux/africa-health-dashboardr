// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabase';
// import './ExhibitorsList.css';
// import ExhibitorsSearchBar from './Exhibitorssearchbar';
// import bbuild from "../assets/build.svg";
// import poinn from "../assets/poinnn.svg";
// import open from '../assets/eye.svg';

// const ExhibitorsList = () => {

//     const [exhibitors, setExhibitors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

  
//     useEffect(() => {
//         getExhibitors();
//     }, []);

//     async function getExhibitors() {
//         const result = await supabase
//             .from('exhibitor')
//             .select('*, booths(booth_number)');
//         if (result.data) {
//             setExhibitors(result.data);
//         }
//     }


//     async function handleStatusChange(id, newStatus) {
//         await supabase.from('exhibitor').update({ status: newStatus }).eq('id', id);
//         setExhibitors(exhibitors.map(ex =>
//             ex.id === id ? { ...ex, status: newStatus } : ex
//         ));
//     }

  
//     const filtered = exhibitors.filter(ex => {
//         const name  = ex.exhibitor_name?.toLowerCase()  || '';
//         const email = ex.exhibitor_email?.toLowerCase() || '';
//         const term  = searchTerm.toLowerCase();
//         return name.includes(term) || email.includes(term);
//     });

  
//     function getStatus(status) {
//         if (status === 'Approved') return { cls: 'approved', label: '✅ Approved'       };
//         if (status === 'Rejected') return { cls: 'rejected', label: '⊘ Rejected'        };
//         return                            { cls: 'pending',  label: '⏳ Pending Review'  };
//     }

//     return (
//         <div>
//             <ExhibitorsSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

//             <div className="el-list">

//                 {filtered.length === 0 && (
//                     <div className="el-empty">No exhibitors found.</div>
//                 )}

//                 {filtered.map(ex => {
//                     const status   = getStatus(ex.status);
//                     const isPending = ex.status !== 'Approved' && ex.status !== 'Rejected';
//                     const appliedDate = ex.created_at
//                         ? new Date(ex.created_at).toLocaleDateString('en-CA')
//                         : 'N/A';

//                     return (
//                         <div className="el-card" key={ex.id}>

                   
//                             <div className="el-icon">
//                                 <img src={bbuild} alt="icon" style={{ width: '24px' }} />
//                             </div>

                         
//                             <div className="el-info">

                             
//                                 <div className="el-top-row">
//                                     {ex.exhibitor_name && (
//                                         <h3 className="el-name">{ex.exhibitor_name}</h3>
//                                     )}
//                                     <span className={'el-status ' + status.cls}>
//                                         {status.label}
//                                     </span>
//                                 </div>

                                
//                                 <p className="el-detail">Category: {ex.category || '—'}</p>
//                                 <p className="el-detail">Email: {ex.exhibitor_email || '—'}</p>
//                                 <p className="el-detail">Applied: {appliedDate}</p>

                                
//                                 {ex.booths?.booth_number && (
//                                     <p className="el-booth">
//                                         <img src={poinn} alt="" style={{ width: '12px', marginRight: '4px' }} />
//                                         Booth {ex.booths.booth_number}
//                                     </p>
//                                 )}

                               
//                                 <div className="el-actions">
//                                     <button className="el-btn el-btn-view">
//                                         <img src={open} alt="" /> View Application
//                                     </button>

                  
//                                     {isPending && (
//                                         <>
//                                             <button
//                                                 className="el-btn el-btn-approve"
//                                                 onClick={() => handleStatusChange(ex.id, 'Approved')}
//                                             >
//                                                  Approve
//                                             </button>
//                                             <button
//                                                 className="el-btn el-btn-reject"
//                                                 onClick={() => handleStatusChange(ex.id, 'Rejected')}
//                                             >
//                                                  Reject
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>

//                             </div>
//                         </div>
//                     );
//                 })}

//             </div>
//         </div>
//     );
// };

// export default ExhibitorsList;
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import './ExhibitorsList.css';
import ExhibitorsSearchBar from './Exhibitorssearchbar';
import bbuild from "../assets/build.svg";
import poinn from "../assets/poinnn.svg";
import open from '../assets/eye.svg';

function ExhibitorsList() {
    const [exhibitors, setExhibitors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getExhibitors();
    }, []);

    async function getExhibitors() {
        const { data } = await supabase
            .from('exhibitor')
            .select('*, booths(booth_number)');
        
        if (data) {
            setExhibitors(data);
        }
    }

    async function handleStatusChange(id, newStatus) {
        await supabase.from('exhibitor').update({ status: newStatus }).eq('id', id);
        getExhibitors();
    }

    const filtered = exhibitors.filter((ex) => {
        return ex.exhibitor_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <ExhibitorsSearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
            />

            <div className="el-list">
                {filtered.map((ex) => {
           
                    let statusClass = 'pending';
                    let statusLabel = ' Pending Review';

                    if (ex.status === 'Approved') {
                        statusClass = 'approved';
                        statusLabel = ' Approved';
                    } else if (ex.status === 'Rejected') {
                        statusClass = 'rejected';
                        statusLabel = ' Rejected';
                    }

                    return (
                        <div key={ex.id} className="el-card">
                            <div className="el-icon">
                                <img src={bbuild} alt="icon" style={{ width: '24px' }} />
                            </div>
                            
                            <div className="el-info">
                                <div className="el-top-row">
                                    <h3 className="el-name">{ex.exhibitor_name}</h3>
                                    <span className={`el-status ${statusClass}`}>
                                        {statusLabel}
                                    </span>
                                </div>

                                <p className="el-detail">Category: {ex.category}</p>
                                <p className="el-detail">Email: {ex.exhibitor_email}</p>
                                
                                {ex.booths && (
                                    <p className="el-booth">
                                        <img src={poinn} alt="" style={{ width: '14px', marginRight: '6px' }} /> 
                                        Booth: {ex.booths.booth_number}
                                    </p>
                                )}
                                
                                <p className="el-detail">Applied: {ex.created_at}</p>

                                <div className="el-actions">
                                    <button className="el-btn-view">
                                        <img src={open} alt="" style={{ width: '16px' }} /> View Application
                                    </button>
                                    
                                    {ex.status !== 'Approved' && ex.status !== 'Rejected' && (
                                        <>
                                            <button 
                                                className="el-btn-approve" 
                                                onClick={() => handleStatusChange(ex.id, 'Approved')}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="el-btn-reject" 
                                                onClick={() => handleStatusChange(ex.id, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExhibitorsList;