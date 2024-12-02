import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Search from "../pages/SearchPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProfileUser from "../pages/ProfileUser";
import EditProfile from "../pages/EditProfile";
import VolunteeringDetails from "../pages/VolunteeringDetails";
import VolunteeringRegister from "../pages/VolunteeringRegister";
import VolunteeringTracking from "../pages/VolunteeringTracking";
import DashboardVolunteering from "../pages/DashboardVolunteering";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profiler-user" element={<ProfileUser />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* Estos links son dinamicos pero se usaran con estas url para seguir diseñando las interfaces */}

      <Route path="/volunteering-details" element={<VolunteeringDetails />} />
      <Route path="/volunteering-register" element={<VolunteeringRegister />} />
      <Route path="/volunteering-tracking" element={<VolunteeringTracking />} />
      <Route path="/dashboard-volunteering" element={<DashboardVolunteering/>} />
    </Routes>
  );
};

export default AppRoutes;
