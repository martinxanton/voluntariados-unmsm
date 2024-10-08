import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Search from "../pages/Search";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProfileUser from "../pages/ProfileUser";
import VolunteeringDetails from "../pages/VolunteeringDetails";
import VolunteeringRegister from "../pages/VolunteeringRegister";
import VolunteeringTracking from "../pages/VolunteeringTracking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profiler-user" element={<ProfileUser />} />

      {/* Estos links son dinamicos pero se usaran con estas url para seguir diseñando las interfaces */}

      <Route path="/volunteering-details" element={<VolunteeringDetails />} />
      <Route path="/volunteering-register" element={<VolunteeringRegister />} />
      <Route path="/volunteering-tracking" element={<VolunteeringTracking />} />
    </Routes>
  );
};

export default AppRoutes;
