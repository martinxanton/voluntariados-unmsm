import AuthInputField from "../components/AuthInputField.jsx";
import AuthButton from "../components/AuthButton.jsx";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_ORGANIZATION_MUTATION = gql`
  mutation createOrganization(
    $name: String!
    $email: String!
    $phone: String
    $address: String
    $adminId: ID!
  ) {
    createOrganization(
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

const CreateOrganisation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error2, setError2] = useState(null);
  const navigate = useNavigate();
  const [createOrganization] = useMutation(CREATE_ORGANIZATION_MUTATION);

  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (!token) {
      navigate("/login"); // Redirige al login si no hay usuario autenticado
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError2(null);

    try {
      const adminId = localStorage.getItem("userId"); // Obtener el ID del administrador
      if (!adminId) {
        setError2("Usuario no autenticado");
        return;
      }

      const { data } = await createOrganization({
        variables: {
          name,
          email,
          phone,
          address,
          adminId,
        },
      });

      console.log("Organización creada con éxito:", data.createOrganization);
      navigate("/profile-organisation"); // Cambia la ruta según tu sistema
    } catch (e) {
      setError2("Error al crear la organización: " + e.message);
    }
  };

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
              Crear Organización
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <AuthInputField
                  label="Nombre de la Organización"
                  type="text"
                  name="name"
                  placeholder="Mi Organización"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <AuthInputField
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  placeholder="organizacion@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <AuthInputField
                  label="Teléfono"
                  type="text"
                  name="phone"
                  placeholder="987654321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <AuthInputField
                  label="Dirección"
                  type="text"
                  name="address"
                  placeholder="Av. Universitaria 1234"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {error2 && <p className="text-red-500">{error2}</p>}

              <div className="!mt-10">
                <div className="flex justify-center">
                  <AuthButton
                    text="Crear Organización"
                    className="max-w-xs"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganisation;
