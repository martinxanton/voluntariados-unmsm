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
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profiler-user"
        element={
          <ProtectedRoute>
            <ProfileUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* Estos links son dinamicos pero se usaran con estas url para seguir diseñando las interfaces */}

      <Route path="/:id/details" element={
        <ProtectedRoute>
          <VolunteeringDetails />
        </ProtectedRoute>
      } />
      <Route path="/:id/register" element={
        <ProtectedRoute>
          <VolunteeringRegister />
        </ProtectedRoute>
      } />
      <Route path="/:id/tracking" element={
        <ProtectedRoute>
          <VolunteeringTracking />
        </ProtectedRoute>
      } />
      <Route
        path="/dashboard-volunteering"
        element={<DashboardVolunteering />}
      />
    </Routes>
  );
};

export default AppRoutes;
