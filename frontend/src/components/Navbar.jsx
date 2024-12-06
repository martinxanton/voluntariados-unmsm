import ThemeController from "./ThemeController";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // obtener Token de localstorage

  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 w-full shadow-md">
      {/* Navbar start */}
      <div className="navbar-start md:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Navbar fullscreen */}
      <div className="navbar-start flex justify-center md:justify-start">
        <Link className="btn btn-ghost text-xl flex gap-4" to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg"
            alt="logo"
            className="w-8 h-auto"
          />
          GoSanMarcos
        </Link>
      </div>

      {userId ? (
        <div className="navbar-end gap-5">
          <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex">
            <li>
              <a onClick={toggleModal} className="cursor-pointer">
                Notificaciones
              </a>
            </li>
            <ThemeController />
          </ul>
          {isModalOpen && (
            <Notification
              closeModal={() => setIsModalOpen(false)}
              userId={userId}
            />
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/profile-user">Perfil</a>
              </li>
              <li>
                <a onClick={handleLogout}>Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-5">
          <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex">
            <ThemeController />
          </ul>
          <div className="navbar-end flex gap-5">
            <Link to="/register" className="btn btn-outline btn-primary flex-1">
              Registrarse
            </Link>
            <Link to="/login" className="btn btn-primary flex-1">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
