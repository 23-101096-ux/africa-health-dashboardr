import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginForm.css";
import logo from '../assets/image-1.svg';
import lock from '../assets/lock.svg';
import open from '../assets/eye.svg';
import closed from '../assets/eye-closed.svg';
import Email from '../assets/email.svg';

const ADMIN_CREDENTIALS = {
  email: "yassernada46@gmail.com",
  password: "1234",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");


    if (role === "admin") {
      if (
        email === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {

        navigate("/dashboard");
      } else {

        navigate("/access-denied");
      }
    } else {

      navigate("/access-denied");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">

        <div className="login-logo-area">
          <img src={logo} alt="Africa Health ExCon Logo" />
          <p className="login-logo-text">Africa Health ExCon</p>
        </div>

        <div className="login-card">
          <h2 className="login-card-title">Secure Login</h2>

   
          <div className="login-input-group">
            <span className="login-input-icon">
                <img src={Email} alt="Email Icon" />
            </span>
            <input
              type="email"
              placeholder="admin@healthexcon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <label className="login-label">Password</label>
          <div className="login-input-group">
            <span className="login-input-icon">
              <img src={lock} alt="Lock Icon" />
            </span>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)} 
              className="login-eye-btn"
            >
   
              <img 
                src={showPass ? open : closed} 
                alt="Toggle visibility" 
              />
            </button>
          </div>

          <div className="login-row">
            <label className="login-check-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              &nbsp;Remember me
            </label>
            <span className="login-forgot">Forgot Password?</span>
          </div>

          {error && <p className="login-error" style={{ color: 'red' }}>{error}</p>}

          <button className="login-sign-in-btn" onClick={handleLogin}>
            Sign in to Dashboard
          </button>

          <p className="login-or-text">— Or continue with —</p>

          <div className="login-social-row">
            <button className="login-social-btn">Google</button>
            <button className="login-social-btn">Microsoft</button>
          </div>
        </div>

      </div>
    </div>
  );
}