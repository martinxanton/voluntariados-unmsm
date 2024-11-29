import RequirementField from "../components/RequirementField";
import React, { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery  } from "@apollo/client";

const GET_VOLUNTEER_BY_ID = gql`
  query GetVolunteerById($id: ID!) {
    getVolunteerById(id: $id) {
      id
      title
      organization {
        id
      }
      date
      location
      totalVac
      category
      tags
      users {
        userId
      }
    }
  }
`;

const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($id: ID!) {
    getOrganizationById(id: $id) {
      name
    }
  }
`;

//const VolunteeringDetails = ({ id }) => {

const VolunteeringDetails = () => {
  const fixedId = "675101aa5f8b83e08e255502";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_VOLUNTEER_BY_ID, {
    variables: { id: fixedId },
  });

  const [getOrganizationById, { data: orgData, loading: orgLoading, error: orgError }] = useLazyQuery(GET_ORGANIZATION_BY_ID);

  useEffect(() => {
    if (data?.getVolunteerById?.organization?.id) {
      const orgId = data.getVolunteerById.organization.id;
      getOrganizationById({ variables: { id: orgId } });
    }
  }, [data, getOrganizationById]);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const volunteer = data.getVolunteerById;
  const organizationName = orgData?.getOrganizationById?.name || "Desconocido";
  const formattedDate = new Date(Number(volunteer.date)).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log(volunteer)

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
                  Información
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div>
                  <div className="flex items-center my-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                    <div>{formattedDate}</div>
                  </div>
                  <div className="flex items-center my-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    <div>¡Es Flexible! Nos acomodamos a tu horario.</div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="py-3 sm:order-none order-2">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Dirección
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div className="flex items-center my-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                    <div>{volunteer.location}</div>
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
              {/* About The Program */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Sobre el programa
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <p>
                  El Voluntariado RSU desde la PUCP busca responder a diversos desafíos de la sostenibilidad social y ambiental, aportando al logro de los Objetivos de Desarrollo Sostenible (ODS) de la Agenda 20230. Además, se trata de una experiencia formativa pues es una oportunidad para que nuestra comunidad universitaria pueda aprender, desde una experiencia solidaria, en contextos territorialmente situados y en vínculo con grupos, comunidades u organizaciones, acompañadas/os por docentes, personal administrativo o gestoras/es de organizaciones comprometidas/os con el enfoque.
                </p>
                <p>
                  Desde la RSU, el voluntariado busca el ejercicio de una ciudadanía activa que trabaje de la mano con la posibilidad de intervenir, plantear soluciones e involucrarse con la realidad de manera sostenida. Se espera que las y los voluntarios sean agentes de transformación social, a partir de sus intervenciones y contribuyan a generar impactos positivos en su entorno.
                </p>
              </div>

              {/* Requirements and indications */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Requisitos e Indicaciones
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                  <p>
                  Toda propuesta que forme parte del Programa de Voluntariado RSU desde la PUCP y que pueda ser gestionada por agrupaciones estudiantiles PUCP, unidades PUCP o por organizaciones externas, deberá garantizar un conjunto de condiciones básicas para su incorporación en el Programa:
                  </p>
                <div className="flex flex-col">
                  <RequirementField
                    title="RELACIÓN CON EL DESARROLLO HUMANO SOSTENIBLE"
                    description="Responder a una problemática acotada y que se aborde desde una mirada real y reflexiva; dialogando con los enfoques de género, sostenibilidad, interculturalidad y/o territorial."
                  />
                  <RequirementField
                    title="VÍNCULO HORIZONTAL"
                    description="Mantener un vínculo desde el respeto y diálogo participativo con el grupo humano con el que se trabaje, considerando la devolución de aprendizajes al cierre de la experiencia."
                  />
                  <RequirementField
                    title="CAPACITACIÓN"
                    description="Brindar sesiones de inducción y capacitación adecuadas sobre los objetivos, temporalidad, roles a asumir, beneficios, límites de participación y herramientas suficientes para desarrollar las actividades."
                  />
                  <RequirementField
                    title="ACOMPAÑAMIENTO"
                    description="Brindar acompañamiento que permita la reflexión y diálogo sobre la labor voluntaria: aprendizajes y retos a nivel personal-emocional, profesional y ciudadano; y atención de situaciones problemáticas o conflictivas."
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
                  onClick={handleToggleModal}
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

export default VolunteeringDetails;
