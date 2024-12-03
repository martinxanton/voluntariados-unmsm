import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoute from "./routes/routes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/dashboard-volunteering";

  return (
    <>
      {!hideNavbarFooter && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <AppRoute />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
