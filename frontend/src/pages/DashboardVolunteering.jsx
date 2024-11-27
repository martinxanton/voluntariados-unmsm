import React, { useState } from "react"
import SidebarDashboard from "../components/SidebarDashboard";  
import AnalyticsChart from "../components/AnalyticsChart";
import CreateActivityModal from "../components/CreateActivityModal";

const DashboardVolunteering = () => {
    const [selectedProgram, setSelectedProgram] = React.useState("all");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const programs = [
        { id: "program1", name: "Programa 1" },
        { id: "program2", name: "Programa 2" },
    ];
    
    const volunteers = [
        { id: 1, name: "Juan Pérez", program: "Programa 1", email: "juan@example.com" },
        { id: 2, name: "Ana López", program: "Programa 2", email: "ana@example.com" },
        { id: 3, name: "Carlos Ruiz", program: "Programa 1", email: "carlos@example.com" },
    ];
    
    const filteredVolunteers =
        selectedProgram === "all"
            ? volunteers
            : volunteers.filter((vol) => vol.program === programs.find((p) => p.id === selectedProgram)?.name);
    
    const [activeSection, setActiveSection] = useState("overview");


    return (
        <div className="flex  h-screen bg-gray-100 ">
            <div >
                <SidebarDashboard setActiveSection={setActiveSection}/>
            </div>
            <main className="flex-1 p-6 overflow-auto">
                {activeSection === "overview" && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Bienvenido al dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Aquí podrá encontrar una descripción general rápida del estado y el análisis del sistema.
                        </p>

       
                        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Usuarios</h2>
                                <p className="mt-4 text-3xl font-bold">1,245</p>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Programas</h2>
                                <p className="mt-4 text-3xl font-bold">0</p>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Actividades</h2>
                                <p className="mt-4 text-3xl font-bold">0</p>
                            </div>
                        </div>


                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-stretch">

                            <div className=" flex-1 flex-col">
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="text-lg font-semibold">Participación de usuario</h3>
                                    <p className="mt-2 text-gray-500">85% de usuarios son activos</p>
                                        <AnalyticsChart />
                                </div>
                                <div className="p-4 bg-white rounded shadow mt-4">
                                    <h3 className="text-lg font-semibold">Ingreso</h3>
                                    <p className="mt-2 text-gray-500">$25,000 </p>
                                    </div>
                            </div> 
                            <div className="mt-6 bg-white rounded shadow flex-1 flex flex-col">
                                <h2 className="text-lg font-semibold p-4 border-b">Actividad Reciente</h2>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">Creado por el usuario</h3>
                                    <p className="mt-2 text-gray-500">Albert Perez creó una nueva cuenta</p>
                                </div>
                                <div className="p-4 border-t">
                                    <h3 className="text-lg font-semibold">Usuario eliminado</h3>
                                    <p className="mt-2 text-gray-500">Miguel Colunche eliminó su cuenta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "content" && (
                    <div className="bg-white  p-6 rounded-lg shadow-md">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={handleModalOpen}
                    >
                        Crear una actividad
                    </button>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
                        <select className="bg-gray-700 text-white py-2 px-3 rounded w-full sm:w-auto">
                        <option>Últimos 90 Días</option>
                        <option>Últimos 30 Días</option>
                        <option>Últimos 7 Días</option>
                        </select>
                        <select className="bg-gray-700 text-white py-2 px-3 rounded w-full sm:w-auto">
                        <option>Ordenar por: Fecha</option>
                        <option>Ordenar por: Popularidad</option>
                        </select>
                    </div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Contenido</h2>
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                    <img
                        src="https://via.placeholder.com/100" // Reemplaza esto con tu ilustración real
                        alt="No content icon"
                        className="mb-4"
                    />
                    <h3 className="text-lg font-semibold">Todavía no hay publicaciones</h3>
                    <p className="text-gray-400 text-center">
                        Cuando crees una publicación pública, podrás ver análisis de cómo está funcionando.
                    </p>
                    </div>
                    {isModalOpen && <CreateActivityModal onClose={handleModalClose} />}
                </div>
                )}
                {activeSection === "volunteers" && (
                    <div>
                        <h2 className="text-lg font-semibold p-4 border-b ">Voluntarios</h2>
                        <div className="p-4 bg-white rounded shadow">
                            <p className="mt-2 text-gray-500">Listado de voluntarios</p>

                            {/* Filtros */}
                            <div className="mt-4">
                                <label htmlFor="programFilter" className="block text-sm font-medium text-gray-700">
                                    Filtrar por programa:
                                </label>
                                <select
                                    id="programFilter"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={selectedProgram}
                                    onChange={(e) => setSelectedProgram(e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    {programs.map((program) => (
                                        <option key={program.id} value={program.id}>
                                            {program.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tabla */}
                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Programa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredVolunteers.map((volunteer) => (
                                            <tr key={volunteer.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{volunteer.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{volunteer.program}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{volunteer.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>           
    </div>
        
    );    
};


export default DashboardVolunteering;