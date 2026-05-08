import { useNavigate } from "react-router-dom";
import "./RoleSelect.css";
import logo from '../assets/image-1.svg';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="roleselect-wrapper">
      <div className="roleselect-content">

       
        <div className="roleselect-logo-area">
          <img src={logo} alt="" />
          <p className="roleselect-logo-text">Africa Health ExCon</p>
        </div>

      
        <h1 className="roleselect-heading">Login as:</h1>


        <div className="roleselect-btn-group">
          <button className="roleselect-btn" onClick={() => navigate("/login/admin")}>
            Admin
          </button>
          <button className="roleselect-btn" onClick={() => navigate("/login/exhibitor")}>
            Exhibition Owner
          </button>
        </div>

      </div>
    </div>
  );
}