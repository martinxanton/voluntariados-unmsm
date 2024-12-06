import ThemeController from "./ThemeController";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-material-symbols/outlined";
import { MaterialSymbol } from "react-material-symbols";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const GET_USER_NOTIFICATION = gql`
  query getNotificationsByUserId($idUsuario: ID!) {
    getNotificationsByUserId(idUsuario: $idUsuario) {
      id
      categoria
      mensaje
      fecha
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { data } = useQuery(GET_USER_NOTIFICATION, {
    variables: { idUsuario: userId },
  });
  
  useEffect(() => {
    if (data) {
      setNotificationsCount(data.getNotificationsByUserId.length);
    }
  }, [data]);

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
    //RELOAD PAGE
    window.location.reload();
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
              <Link to="/search">Buscar voluntariados</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Iniciar sesión</Link>
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
        <div className="lg:flex hidden pl-4">
          <ThemeController />
        </div>
      </div>
      {userId ? (
        <div className="navbar-end gap-6 flex items-center">
          <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex">
            <li>
              <Link to="/search">Buscar voluntariados</Link>
            </li>
          </ul>
          <div className="indicator">
            <span className="indicator-item badge badge-primary h-4 text-xs">
              {notificationsCount}
            </span>
            <MaterialSymbol
              icon="notifications"
              size={26}
              fill
              grade={-25}
              color="text-primary"
              onClick={toggleModal}
              className="cursor-pointer"
            />
            {isModalOpen && (
              <Notification
                closeModal={() => setIsModalOpen(false)}
                userId={userId}
              />
            )}
          </div>
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
                <Link to="/profile-user">Perfil</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-5">
          <div className="navbar-end flex gap-5">
            <Link
              to="/register"
              className="btn btn-outline btn-primary flex-1 hidden md:flex"
            >
              Registrarse
            </Link>
            <Link to="/login" className="btn btn-primary flex-1 hidden md:flex">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
