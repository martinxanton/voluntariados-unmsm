import RequirementField from "../components/RequirementField";
import DetailsColumn from "../components/DetailsColumn";
import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery, useLazyQuery  } from "@apollo/client";

const ADD_USER_TO_VOLUNTEER = gql`
  mutation AddUserToVolunteer(
    $volunteerId: ID!
    $userId: ID!
    $role: String!
    $approved: Boolean!
  ) {
    addUserToVolunteer(
      volunteerId: $volunteerId
      userId: $userId
      role: $role
      approved: $approved
    ) {
      id
      users {
        userId{
          id
        }
        role
        approved
      }
    }
  }
`;

const GET_VOLUNTEER_BY_ID = gql`
  query GetVolunteerById($id: ID!) {
    getVolunteerById(id: $id) {
      id
      title
      organization {
        id
      }
      date_create
      date_start
      date_end
      location
      totalVac
      category
      tags
    }
  }
`;

const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($id: ID!) {
    getOrganizationById(id: $id) {
      name
      email
      phone
      address
    }
  }
`;

const VolunteeringDetails = ({ id }) => {
  const volunteerId = String(id);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const cleanedUserId = JSON.parse(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_VOLUNTEER_BY_ID, {
    variables: { id: volunteerId },
  });

  const [getOrganizationById, { data: orgData, loading: orgLoading, error: orgError }] = useLazyQuery(GET_ORGANIZATION_BY_ID);

  const [addUserToVolunteer, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_USER_TO_VOLUNTEER);

  useEffect(() => {
    if (data?.getVolunteerById?.organization?.id) {
      const orgId = data.getVolunteerById.organization.id;
      getOrganizationById({ variables: { id: orgId } });
    }
  }, [data, getOrganizationById]);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleJoinVolunteer = async () => {
    if (!userId) {
      alert("No se ha encontrado el ID del usuario. Por favor, inicia sesión nuevamente.");
      return;
    }
    try {
      await addUserToVolunteer({
        variables: {
          volunteerId: volunteerId,
          userId: cleanedUserId,
          role: "voluntario",
          approved: true,
        },
      });
      alert("¡Te has unido al voluntariado exitosamente!");
      handleToggleModal();
    } catch (err) {
      console.error(err);
      alert("Hubo un error al unirse al voluntariado.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const volunteer = data.getVolunteerById;

  const organizationName = orgData?.getOrganizationById?.name || "Desconocido";
  const organizationEmail = orgData?.getOrganizationById?.email || "Desconocido";
  const organizationPhone = orgData?.getOrganizationById?.phone || "Desconocido";
  const organizationAddress = orgData?.getOrganizationById?.address || "Desconocido";
  
  const { title, location, totalVac, category, tags} = volunteer;


  const formattedTags =
  tags?.tag && tags?.tag > 0
    ? tags?.tag.join(", ")
    : "No especificado";
  
    const formattedDateCreate = new Date(Number(volunteer.date_create)).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDateStart = new Date(Number(volunteer.date_start)).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDateEnd = new Date(Number(volunteer.date_end)).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-100 p-4">
      <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
        {/* Banner - Tittle */}
        <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full bg-blue-300">
          <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSklYCKeacQhUuDhS_YiHQJpfRSjzv7I3gJw&s"
              alt="Logo"
            />
          </div>
          <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
              {volunteer.title}
            </p>
            <p className="text-heading">{organizationName}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="py-5 px-12">
          <div className="flex flex-col sm:flex-row sm:mt-10">
            <div className="flex flex-col sm:w-1/3">
              {/* Join */}
              <div className="py-3 sm:order-none order-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Información de la Organización
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div>
                  <div className="flex items-center my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <div> {organizationName}</div>
                  </div>
                  <div className="flex items-center my-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><div> {organizationEmail}</div>
                  </div>
                  <div className="flex items-center my-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <div> {organizationPhone}</div>
                  </div>
                  <div className="flex items-center my-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg><div> {organizationAddress}</div>
                  </div>
                </div>
              </div>

              {/* Join Program */}
              <div className="py-3 sm:order-none order-1 flex justify-center">
                <button onClick={handleToggleModal} 
                  className="w-2/3 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button">
                  Únete
                </button>
              </div>
            </div>

            <div className="flex flex-col pr-12 sm:w-2/3 order-first sm:order-none sm:-mt-10">
              <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                  <DetailsColumn
                    details={[
                      { title: 'Dia Inicio', value: formattedDateStart},
                      { title: 'Ubicación', value: volunteer.location},
                      { title: 'Tags', value: formattedTags},
                    ]}
                  />
                  <DetailsColumn
                    details={[
                      { title: 'Día Fin', value: formattedDateEnd},
                      { title: 'Categoria', value: volunteer.category},
                      { title: 'Vacantes', value: volunteer.totalVac},
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Modal */}
      {isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Close button */}
              <button onClick={handleToggleModal} type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3"
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
                <span className="sr-only">Close modal</span>
              </button>

              {/* Contenido del modal */}
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
                  ¿Estas seguro que quieres unirte?
                </h3>
                <button
                  onClick={handleJoinVolunteer}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  disabled={mutationLoading}
                >
                  {mutationLoading ? "Uniéndote..." : "Sí, estoy seguro"}
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

export default VolunteeringDetails;
