import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

import logo from '../assets/image-1.svg';
import pink from '../assets/pink-lock.svg';
import lock from '../assets/white-lock.svg';
import home from '../assets/home.svg';
import wird from '../assets/wird.svg';
import zarf from '../assets/zarf.svg';


export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="access-wrapper">
      <div className="access-content">

        
        <div className="access-logo-area">
          <img src={logo} alt="" />
          <p className="access-logo-text">Africa Health ExCon</p>
        </div>

      
        <div className="access-card">

          
          <div className="access-lock">
            <span className="access-lock-icon"><img src={pink} alt="" /></span>
          </div>


          <div className="access-badge"> <img src={wird} alt="" />Access Restricted</div>

          <h2 className="access-title">You Don't Have Access</h2>
          <p className="access-desc">
            This page is restricted to authorized Africa Health ExCon personnel only.
            Please contact your administrator if you believe you should have access to this resource.
          </p>

          
          <div className="access-action-row">
            <button className="access-sign-in-btn" onClick={() => navigate("/login/admin")}>
              <img src={lock} alt="" /> Sign In
            </button>
            <button className="access-home-btn" onClick={() => navigate("/")}>
              <img src={home} alt="" /> Back to Home
            </button>
          </div>

          
          <div className="access-help-box">
            <p className="access-help-title"><img src={zarf} alt="" /> Need Help?</p>
            <p className="access-help-text">Contact the admin team</p>
            <p className="access-help-email">admin@africahealthexcon.com</p>
          </div>

          <p className="access-footer">
            This is a secure area. All access attempts are logged and monitored.
          </p>

        </div>
      </div>
    </div>
  );
}