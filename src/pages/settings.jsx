import React from 'react';
import "./settings.css";
import Sidebar from '../components/Sidebar';
import NavigationLinks from '../components/Navigationlinks';
import PopupBannerEditor from '../components/Popupbannereditor';
import MessagesInbox from '../components/Messagesinbox';
// import ContentScheduling from '../components/Contentscheduling';

const Settings = () => {
    return (
        <div className="page-layout">
            <Sidebar currentPage="settings" />

            <div className="main-content">
                <div className="content-padding">

                    <div className="overview-header">
                        <h1>Content & System Settings</h1>

                    </div>

   
                    <div className="settings-grid">
                        <NavigationLinks />
                        <PopupBannerEditor />
                        <MessagesInbox />
                        {/* <ContentScheduling /> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Settings;