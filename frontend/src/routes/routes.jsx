import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
