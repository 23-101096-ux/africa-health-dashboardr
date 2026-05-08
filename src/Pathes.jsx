import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/Roleselect";
import LoginForm from "./pages/Loginform";
import AccessDenied from "./pages/Accessdenied";

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                element={<RoleSelect />} />
                <Route path="/login/:role"     element={<LoginForm />} />
                <Route path="/access-denied"   element={<AccessDenied />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;