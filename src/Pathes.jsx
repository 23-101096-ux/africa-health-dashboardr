import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/Roleselect";
import LoginForm from "./pages/Loginform";
import AccessDenied from "./pages/Accessdenied";
import Admindashboard from "./pages/Admindashboard";

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                element={<RoleSelect />} />
                <Route path="/login/:role"     element={<LoginForm />} />
                <Route path="/access-denied"   element={<AccessDenied />} />
                <Route path="/Admindashboard"   element={<Admindashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;