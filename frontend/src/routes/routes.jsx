import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Search from "../pages/SearchPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProfileUser from "../pages/ProfileUser";
import EditProfile from "../pages/EditProfile";
import CreateOrganisation from "../pages/CreateOrganisation";
import ProfileOrganisation from "../pages/ProfileOrganisation";
import EditOrganisation from "../pages/EditOrganisation";
import VolunteeringDetails from "../pages/VolunteeringDetails";
import VolunteeringRegister from "../pages/VolunteeringRegister";
import VolunteeringTracking from "../pages/VolunteeringTracking";
import DashboardVolunteering from "../pages/DashboardVolunteering";
import VolunteeringManagement from "../pages/VolunteeringManagement";
import VolunteeringEdit from "../pages/VolunteeringEdit";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile-user"
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

      <Route
        path="/create-organization"
        element={
            <CreateOrganisation/>
        }
      />

      {/* Estos links son dinamicos pero se usaran con estas url para seguir diseñando las interfaces */}


      <Route
        path="/:organizationId/profile-organization"
        element={
            <ProfileOrganisation/>
        }
      />

      <Route
        path="/:organizationId/edit-organization"
        element={
            <EditOrganisation/>
        }
      />

      <Route path="/:id/details" element={
        <ProtectedRoute>
          <VolunteeringDetails />
        </ProtectedRoute>
      } />
      <Route path="/:organizationId/volunteer-register" element={
        <ProtectedRoute>
          <VolunteeringRegister />
        </ProtectedRoute>
      } />
      <Route path="/:organizationId/management" element={
        <ProtectedRoute>
          <VolunteeringManagement />
        </ProtectedRoute>
      } />
      <Route path="/:organizationId/volunteers/:volunteerId/edit" element={
        <ProtectedRoute>
          <VolunteeringEdit />
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
