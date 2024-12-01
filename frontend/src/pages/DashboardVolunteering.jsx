import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import SidebarDashboard from "../components/SidebarDashboard";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registrar los componentes de Chart.js necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Consultas GraphQL
const GET_VOLUNTEERS = gql`
  query {
    getVolunteers {
      id
      title
    }
  }
`;

const GET_USERS_BY_VOLUNTEER = gql`
  query getUsersByVolunteer($id: ID!) {
    getUsersByVolunteer(id: $id) {
      userId
      role
      approved
    }
  }
`;

const GET_ORGANIZATIONS = gql`
  query {
    getOrganizations {
      id
      name
    }
  }
`;

const GET_VOLUNTEERS_BY_ORGANIZATION = gql`
  query getVolunteersByOrganization($id: ID!) {
    getVolunteersByOrganization(id: $id) {
      id
      title
      location
    }
  }
`;

const DashboardVolunteering = () => {
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [volunteersByOrg, setVolunteersByOrg] = useState([]);

  const [volunteers] = useState([]);
  
  const [totals, setTotals] = useState({
    users: 0, // Usuarios aprobados
    disapprovedUsers: 0, // Usuarios desaprobados
    programs: 0, // Total de programas
  });
  const [activeSection, setActiveSection] = useState("overview");

  const {
    data: volunteersData,
    loading: loadingVolunteers,
    error: errorVolunteers,
  } = useQuery(GET_VOLUNTEERS);
  const {
    data: organizationsData,
    loading: loadingOrganizations,
    error: errorOrganizations,
  } = useQuery(GET_ORGANIZATIONS);
  const [
    fetchVolunteersByOrganization,
    {
      data: volunteersByOrgData,
      loading: loadingVolunteersByOrg,
      error: errorVolunteersByOrg,
    },
  ] = useLazyQuery(GET_VOLUNTEERS_BY_ORGANIZATION);

  const [getUsersByVolunteer] = useLazyQuery(GET_USERS_BY_VOLUNTEER);

  // Actualizar la lista de voluntarios por organización
  useEffect(() => {
    if (volunteersByOrgData?.getVolunteersByOrganization) {
      setVolunteersByOrg(volunteersByOrgData.getVolunteersByOrganization);
    }
  }, [volunteersByOrgData]);

  const handleOrganizationSelect = (organizationId) => {
    setSelectedOrganization(organizationId);
    fetchVolunteersByOrganization({ variables: { id: organizationId } });
  };

  if (loadingOrganizations) return "Cargando organizaciones...";
  if (errorOrganizations) return <pre>{errorOrganizations.message}</pre>;

  // Calcular usuarios aprobados y desaprobados
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (volunteersData) {
        let totalApproved = 0;
        let totalDisapproved = 0;

        // Procesar cada programa
        await Promise.all(
          volunteersData.getVolunteers.map(async (program) => {
            try {
              // Obtener todos los usuarios del programa
              const { data: usersData } = await getUsersByVolunteer({
                variables: { id: program.id },
              });

              if (usersData?.getUsersByVolunteer) {
                // Contar usuarios aprobados y desaprobados
                const approvedCount = usersData.getUsersByVolunteer.filter(
                  (user) => user.approved
                ).length;

                const disapprovedCount = usersData.getUsersByVolunteer.filter(
                  (user) => !user.approved
                ).length;

                // Sumar al total general
                totalApproved += approvedCount;
                totalDisapproved += disapprovedCount;
              }
            } catch (error) {
              console.error(
                `Error al obtener usuarios del programa ${program.title}:`,
                error
              );
            }
          })
        );

        // Actualizar estados
        setTotals({
          users: totalApproved,
          disapprovedUsers: totalDisapproved,
          programs: volunteersData.getVolunteers.length,
        });
      }
    };

    fetchAllUsers();
  }, [volunteersData, getUsersByVolunteer]);

  const barChartData = {
    labels: [
      "Usuarios Aprobados",
      "Usuarios Desaprobados",
      "Programas",
      "Organizaciones",
    ],
    datasets: [
      {
        label: "Totales",
        data: [
          totals.users,
          totals.disapprovedUsers,
          totals.programs,
          organizationsData?.getOrganizations.length || 0,
        ],
        backgroundColor: ["#4CAF50", "#FF5722", "#FF9800", "#3F51B5"],
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels: ["Usuarios Aprobados", "Usuarios Desaprobados"],
    datasets: [
      {
        data: [totals.users, totals.disapprovedUsers],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  // Opciones para mostrar porcentaje en el gráfico circular
  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  if (loadingVolunteers || loadingOrganizations) return "Cargando...";
  if (errorVolunteers || errorOrganizations)
    return <pre>{(errorVolunteers || errorOrganizations).message}</pre>;
  if (!volunteersData) return <div>No se encontraron programas</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarDashboard setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        {activeSection === "overview" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bienvenidos al dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Aquí podrá encontrar una descripción general rápida del estado y
              el análisis del sistema.
            </p>

            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow">
                <h2 className="text-xl font-semibold">Usuarios Aprobados</h2>
                <p className="mt-4 text-3xl font-bold">{totals.users}</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg shadow">
                <h2 className="text-xl font-semibold">Usuarios Desaprobados</h2>
                <p className="mt-4 text-3xl font-bold">
                  {totals.disapprovedUsers}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg shadow">
                <h2 className="text-xl font-semibold">Programas</h2>
                <p className="mt-4 text-3xl font-bold">{totals.programs}</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg shadow">
                <h2 className="text-xl font-semibold">Organizaciones</h2>
                <p className="mt-4 text-3xl font-bold">
                  {organizationsData?.getOrganizations.length || 0}
                </p>
              </div>
            </div>

            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Gráfico de Barras
                </h3>
                <Bar data={barChartData} options={{ responsive: true }} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Gráfico Circular</h3>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        )}

        {activeSection === "content" && (
          <div>
            <h2 className="text-2xl font-bold p-4 bg-blue-600 text-white rounded-t-lg">
              Voluntarios por Organización
            </h2>
            <div className="p-6 bg-white shadow-md rounded-b-lg">
              <p className="text-gray-600 mb-4 text-sm">
                Seleccione una organización para ver la lista de sus
                voluntarios.
              </p>

              {/* Filtro por organización */}
              <div className="mb-6">
                <label
                  htmlFor="organizationFilter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Organización:
                </label>
                <select
                  id="organizationFilter"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={selectedOrganization}
                  onChange={(e) => handleOrganizationSelect(e.target.value)}
                >
                  <option value="">Seleccione una organización</option>
                  {organizationsData?.getOrganizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tabla de Voluntarios */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-sm font-medium text-gray-700">
                        Título
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-700">
                        Ubicación
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {volunteersByOrg.map((volunteer) => (
                      <tr key={volunteer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{volunteer.title}</td>
                        <td className="px-6 py-4">{volunteer.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {loadingVolunteersByOrg && (
                <p className="mt-4 text-blue-500 text-sm">
                  Cargando voluntarios...
                </p>
              )}
              {errorVolunteersByOrg && (
                <p className="mt-4 text-red-500 text-sm">
                  Error al cargar voluntarios: {errorVolunteersByOrg.message}
                </p>
              )}
            </div>
          </div>
        )}
        {activeSection === "volunteers" && (
          <div>
            <h2 className="text-lg font-semibold p-4 border-b">Voluntarios</h2>
            <div className="p-4 bg-white rounded shadow">
              <p className="mt-2 text-gray-500">Listado de voluntarios</p>

              {/* Filtros */}
              <div className="mt-4">
                <label
                  htmlFor="programFilter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filtrar por programa:
                </label>
                <select
                  id="programFilter"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  <option value="all">Todos</option>
                  {volunteersData.getVolunteers.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tabla de Voluntarios */}
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
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.program}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.email}
                        </td>
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
