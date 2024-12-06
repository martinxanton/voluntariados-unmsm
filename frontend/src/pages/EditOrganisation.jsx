import AuthInputField from "../components/AuthInputField.jsx";
import AuthButton from "../components/AuthButton.jsx";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

// Query para obtener los datos de la organización
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
      }
    }
  }
`;

// Mutación para actualizar los datos de la organización
const UPDATE_ORGANIZATION_MUTATION = gql`
  mutation updateOrganization(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $address: String
    $adminId: ID!
  ) {
    updateOrganization(
      id: $id
      name: $name
      email: $email
      phone: $phone
      address: $address
      adminId: $adminId
    ) {
      id
      name
      email
      phone
      address
    }
  }
`;

const EditOrganisation = () => {
  //const [organizationId, setOrganizationId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [adminId, setAdminId] = useState("");
  const [error2, setError2] = useState(null);
  const navigate = useNavigate();

	const { organizationId } = useParams();
  console.log(organizationId);
  
  /*
  useEffect(() => {
    const storedOrganizationId = "67527ef4b1e7c6ab6d928b12"; // ID de prueba
    setOrganizationId(storedOrganizationId);
  }, []);
  */
  const { loading, error, data } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: organizationId },
    skip: !organizationId, // Evita ejecutar la consulta si no hay ID
  });

  useEffect(() => {
    if (data?.getOrganizationById) {
      const organization = data.getOrganizationById;
      setName(organization.name);
      setEmail(organization.email);
      setPhone(organization.phone || "");
      setAddress(organization.address || "");
      setAdminId(organization.adminId.id);
    }
  }, [data]);

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError2(null);

    try {
      const { data } = await updateOrganization({
        variables: {
          id: organizationId,
          name,
          email,
          phone,
          address,
          adminId,
        },
      });

      console.log("Organización actualizada con éxito:", data.updateOrganization);
      alert("Organización actualizada con éxito");
      navigate("../");
    } catch (e) {
      console.error("Error al actualizar la organización:", e.message);
      setError2("Error al actualizar la organización: " + e.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-2">
        <div className="w-full max-w-[70%] mx-auto font-[sans-serif] p-6">
          <div className="p-8 rounded-3xl bg-white shadow-lg">
            <div className="flex justify-start items-center">
              <a href="javascript:void(0)">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg"
                  alt="logo"
                  className="w-12 h-auto"
                />
              </a>
              <h1 className="text-gray-800 text-3xl font-bold ml-3">
                GoSanMarcos
              </h1>
            </div>
            <h2 className="text-gray-800 text-center text-3xl font-bold py-5">
              Editar Organización
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <AuthInputField
                  label="Nombre de la Organización"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <AuthInputField label="Correo" type="email" value={email} disabled />
                <AuthInputField
                  label="Teléfono"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <AuthInputField
                  label="Dirección"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <p className="text-red-500">{error2}</p>

              <div className="mt-10">
                <AuthButton text="Guardar Cambios" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrganisation;
