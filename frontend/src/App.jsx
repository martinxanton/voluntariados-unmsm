import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoute from "./routes/routes";

function App() {
  return (
    <>
      <div className="sticky">
        <Navbar />
      </div>
      <AppRoute />
      <Footer />
    </>
  );
}

export default App;
