import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/Roleselect";
import LoginForm from "./pages/Loginform";
import AccessDenied from "./pages/Accessdenied";
import Admindashboard from "./pages/Admindashboard";
import VisitorManagement from "./pages/visitors"; 
import CreateVisitor from "./pages/Createvisitor";
import EditVisitor from "./pages/editVisitors";

const Routess = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoleSelect />} />
                <Route path="/login/:role" element={<LoginForm />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="/Admindashboard" element={<Admindashboard />} />
                <Route path="/visitors" element={<VisitorManagement />} />
                <Route path="/Createvisitor" element={<CreateVisitor />} />
                <Route path="/editVisitor/:id" element={<EditVisitor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routess;





