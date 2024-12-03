import AuthInputField from "../components/AuthInputField.jsx";
import AuthButton from "../components/AuthButton.jsx";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// Query para obtener los datos del usuario
const GET_USER_BY_ID = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      nombre
      apellido
      codigoUniversitario
      description
      edad
      sexo
      distrito
      carrera
    }
  }
`;

// Mutación para actualizar los datos del usuario
const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $edad: Int
    $password: String
    $username: String
    $nombre: String
    $apellido: String
    $description: String
    $carrera: String
    $sexo: String
    $distrito: String
  ) {
    updateUser(
      id: $id
      edad: $edad
      password: $password
      username: $username
      nombre: $nombre
      apellido: $apellido
      description: $description
      carrera: $carrera
      sexo: $sexo
      distrito: $distrito
    ) {
      id
      edad
      username
      nombre
      apellido
      description
      carrera
      sexo
      distrito
    }
  }
`;

const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [carrera, setCarrera] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [distrito, setDistrito] = useState("");
  const [description, setDescription] = useState("");
  const [error2, setError2] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = "674d6a55e395e6f5c9acea8e";
    setUserId(storedUserId);
  }, []);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId, // Evita ejecutar la consulta si userId no está disponible
  });

  useEffect(() => {
    if (data?.getUser) {
      const user = data.getUser;
      setEmail(user.email);
      setUsername(user.username);
      setNombre(user.nombre);
      setApellido(user.apellido);
      setDescription(user.description || "");
      setCarrera(user.carrera);
      setSexo(user.sexo);
      setDistrito(user.distrito);
      setEdad(user.edad ? user.edad.toString() : "");
    }
  }, [data]);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError2(null);

    try {
      const edadInt = parseInt(edad, 10);
      if (isNaN(edadInt)) {
        setError2("La edad debe ser un número válido.");
        return;
      }

      const { data } = await updateUser({
        variables: {
          id: userId,
          edad: edadInt,
          password: password || undefined, // Solo envía si el usuario quiere cambiarla
          username,
          nombre,
          apellido,
          description,
          carrera,
          sexo,
          distrito,
        },
      });

      console.log("Perfil actualizado con éxito:", data.updateUser);
      alert("Perfil actualizado con éxito");
      navigate("../");
    } catch (e) {
      console.error("Error al actualizar el perfil:", e.message);
      setError2("Error al actualizar el perfil: " + e.message);
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
              Editar Perfil
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <AuthInputField
                  label="Nombres"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <AuthInputField
                  label="Apellidos"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <AuthInputField label="Correo" type="email" value={email} disabled />
                <AuthInputField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <AuthInputField
                  label="Carrera"
                  type="text"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                />
                <AuthInputField
                  label="Edad"
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
                <div>
                  <label className="text-gray-800 text-sm mb-2 block font-bold">
                    Sexo
                  </label>
                  <select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    className="w-full"
                  >
                    <option value="" disabled>
                      Selecciona tu sexo
                    </option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <AuthInputField
                  label="Distrito"
                  type="text"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                />
                <AuthInputField
                  label="Descripción"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default EditProfile;