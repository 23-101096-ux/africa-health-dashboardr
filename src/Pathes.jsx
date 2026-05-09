import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/Roleselect";
import LoginForm from "./pages/Loginform";
import AccessDenied from "./pages/Accessdenied";
import Admindashboard from "./pages/Admindashboard";
import VisitorMangment from "./pages/visitors";
import Exhibitors from "./pages/exhibitors"; 
import CreateExhibitor from "./pages/createexhibitor"; 

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/"                element={<RoleSelect />} />
                <Route path="/login/:role"     element={<LoginForm />} />
                <Route path="/access-denied"   element={<AccessDenied />} />
                <Route path="/Admindashboard"  element={<Admindashboard />} />
                <Route path="/Visitormanagement" element={<VisitorMangment />} />
                <Route path="/exhibitors" element={<Exhibitors />} />
                <Route path="/createexhibitor" element={<CreateExhibitor />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;





