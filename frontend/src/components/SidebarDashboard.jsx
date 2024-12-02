const SidebarDashboard = ({ setActiveSection }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-lg font-bold border-b border-gray-700">
          DASHBOARD
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("overview")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Descripción General
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("content")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Organizaciones
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("volunteers")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Voluntariados
              </button>
            </li>
            <li></li>
            <button
              onClick={() => setActiveSection("activities")}
              className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
            >
              Actividades
            </button>
            <li>
              <button
                onClick={() => setActiveSection("logout")}
                className="block w-full text-left py-2 px-4 hover:bg-red-500 rounded transition"
              >
                Configuración
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SidebarDashboard;
