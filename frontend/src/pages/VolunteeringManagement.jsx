import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const GET_VOLUNTEERS_BY_ORGANIZATION = gql`
  query GetVolunteersByOrganization($id: ID!) {
    getVolunteersByOrganization(id: $id) {
      id
      title
      category
      date_create
			date_start
			date_end
    }
  }
`;

const DELETE_VOLUNTEER = gql`
  mutation DeleteVolunteer($id: ID!, $organization: ID!) {
    deleteVolunteer(id: $id, organization: $organization) {
      id
    }
  }
`;

const VolunteeringManagement = () => {
	const { organizationId } = useParams();
	const navigate = useNavigate();
  
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [volunteerToDelete, setVolunteerToDelete] = useState(null);
	const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

	const location = useLocation();
	useEffect(() => {
		if (location.state?.refresh) {
			refetch();
		}
	}, [location.state?.refresh]);

  const { loading, error, data, refetch } = useQuery(GET_VOLUNTEERS_BY_ORGANIZATION,{
		variables: {id: organizationId}
	});
	const [deleteVolunteer] = useMutation(DELETE_VOLUNTEER);

	const handleCreate = () => {
		navigate(`/${organizationId}/volunteer-register`, { state: { refresh: true } });
	}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const volunteers = data.getVolunteersByOrganization;

	const handleDeleteClick = (id) => {
		setVolunteerToDelete(id); 
		handleToggleModal();
	};
	
	const handleConfirmDelete = async () => {
		try {
			await deleteVolunteer({
				variables: {
					id: volunteerToDelete,
					organization: organizationId,
				},
			});
			refetch();
			handleToggleModal();
			alert("Voluntariado eliminado correctamente.");
		} catch (err) {
			console.error("Error al eliminar:", err.message);
			alert("Hubo un error al eliminar el voluntariado.");
		}
	};
	
  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex items-center">
        <h1 className="text-3xl">Mis Voluntariados Creados</h1>
				<button
					onClick={() => navigate(`/${organizationId}/profile-organization`)}
					className="ml-auto text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 mx-3"
					>
					Volver al Perfil Organizador
				</button>
				<button
					onClick={() => navigate("/dashboard-volunteering")}
					className="ml-end text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
					>
					Ver Dashboards
				</button>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
							<th className="text-left p-3 px-5">#</th>
              <th className="text-left p-3 px-5">Titulo</th>
              <th className="text-left p-3 px-5">Categoría</th>
              <th className="text-left p-3 px-5">Día Creado</th>
              <th className="text-left p-3 px-5">Día Inicio</th>
              <th className="text-left p-3 px-5">Día Fin</th>
							<th className="p-3 px-5 flex justify-end">
								
								<button
									onClick={handleCreate}
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Crear Voluntariado 
                </button>
							</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer, index) => (
              <tr key={volunteer.id} className="border-b hover:bg-orange-100">
								<td className="p-3 px-5">{index + 1}</td>
                <td className="p-3 px-5">{volunteer.title}</td>
                <td className="p-3 px-5">{volunteer.category}</td>
                <td className="p-3 px-5">{new Date(parseInt(volunteer.date_create)).toLocaleDateString("es-ES", {timeZone: "UTC", })}</td>
                <td className="p-3 px-5">{new Date(parseInt(volunteer.date_start)).toLocaleDateString("es-ES", {timeZone: "UTC", })}</td>
                <td className="p-3 px-5">{new Date(parseInt(volunteer.date_end)).toLocaleDateString("es-ES", {timeZone: "UTC", })}</td>
								<td className="p-3 px-5 flex justify-end">
                  <button
										onClick={() => navigate(`/${organizationId}/volunteers/${volunteer.id}/edit`)}
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(volunteer.id)}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

			{/* Modal */}
			{isModalOpen && (
				<div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
					<div className="relative p-4 w-full max-w-md max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* Close button */}
							<button
								onClick={handleToggleModal}
								type="button"
								className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Cerrar modal</span>
							</button>

							{/* Modal Content */}
							<div className="p-4 md:p-5 text-center">
								<svg
									className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
									¿Estás seguro que quieres eliminar este voluntariado?
								</h3>
								<button
									onClick={handleConfirmDelete}
									type="button"
									className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
								>
									Sí, estoy seguro
								</button>
								<button
									onClick={handleToggleModal}
									type="button"
									className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									No, cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}


    </div>
  );
};
  
export default VolunteeringManagement;
  