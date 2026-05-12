import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/Roleselect";
import LoginForm from "./pages/Loginform";
import AccessDenied from "./pages/Accessdenied";
import Admindashboard from "./pages/Admindashboard";
import VisitorMangment from "./pages/visitors";
import Exhibitors from "./pages/exhibitors"; 
import CreateExhibitor from "./pages/createexhibitor"; 
import Sessions from "./pages/sessions";
import CreateSession from "./pages/createSession";
import EditVisitor from "./pages/editVisitors";
import EditSession from "./pages/Editsession";
import FloorPlan from "./pages/Floorplan";
import Settings from "./pages/settings";

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/"                element={<RoleSelect />} />
                <Route path="/login/:role"     element={<LoginForm />} />
                <Route path="/access-denied"   element={<AccessDenied />} />
                <Route path="/Admindashboard"  element={<Admindashboard />} />
                <Route path="/visitors" element={<VisitorMangment />} />
                <Route path="/editVisitor/:id" element={<EditVisitor />} />
                <Route path="/exhibitors" element={<Exhibitors />} />
                <Route path="/createexhibitor" element={<CreateExhibitor />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/createSession" element={<CreateSession />} />
                <Route path="/Editsession/:id" element={<EditSession />} />
                <Route path="/Floorplan" element={<FloorPlan />} />
                <Route path="/settings" element={<Settings />} />
                
                
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;





