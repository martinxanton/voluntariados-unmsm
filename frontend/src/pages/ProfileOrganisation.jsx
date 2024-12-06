import DetailsColumn from "../components/DetailsColumn";
import AuthButton from "../components/AuthButton";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

const GET_ORGANIZATION_BY_ID = gql`
  query getOrganizationById($id: ID!) {
    getOrganizationById(id: $id) {
      id
      name
      email
      phone
      address
      adminId {
        id
        username
        email
      }
    }
  }
`;

const ProfileOrganisation = () => {
	const { organizationId } = useParams();
  console.log(organizationId);

  const { loading, error, data } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: organizationId },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, email, phone, address, adminId } = data.getOrganizationById;

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col">
        {/* Cover Image */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Organization Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />

        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex flex-col items-center">
          {/* Organization Name */}
          <h1 className="text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif text-center mt-4">
            {name}
          </h1>

          {/* Organization Details */}
          <div className="w-full mt-6 flex flex-col justify-center gap-2">
            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
              <DetailsColumn
                details={[
                  { title: "Correo Electrónico", value: email },
                  { title: "Teléfono", value: phone || "No especificado" },
                ]}
              />
              <DetailsColumn
                details={[
                  { title: "Dirección", value: address || "No especificada" },
                  {
                    title: "Administrador",
                    value: `${adminId.username} (${adminId.email})`,
                  },
                ]}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <AuthButton
              text="Volver a mi perfil"
              className="max-w-xs"
              to={"/profile-user"}
            />
            <AuthButton
              text="Gestionar Voluntariados"
              className="max-w-xs"
              to={`/${organizationId}/management`}
            />
            <AuthButton
              text="Editar Organización"
              className="max-w-xs"
              to={`/${organizationId}/edit-organization`}
            />
          </div>
          
          <div>
            <br />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOrganisation;
