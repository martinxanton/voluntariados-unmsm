import AuthInputField from "../../components/AuthInputField.jsx";
import AuthButton from "../../components/AuthButton.jsx";
import AuthLinkText from "../../components/AuthLinkText.jsx";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation registerUser($email: String!, $password: String!, $codigoUniversitario: String!, $username: String!, $nombre: String!, $apellido: String!) {
    registerUser(email: $email, password: $password, codigoUniversitario: $codigoUniversitario, username: $username, nombre: $nombre, apellido: $apellido) {
      id
      email
      username
      codigoUniversitario
      nombre
      apellido
    }
  }
`;

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [codigoUniversitario, setCodigoUniversitario] = useState("");
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_MUTATION);
  const [error2, setError2] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError2(null);
    try {
      if (password !== repassword) {
        console.error("Passwords do not match");
        setError2("Las contraseñas no coinciden");
        return;
      }
  
      const { data } = await registerUser({ 
        variables: { 
          email, 
          password, 
          codigoUniversitario, 
          username, 
          nombre: nombre, 
          apellido 
        } 
      });
  
      console.log("Registro exitoso");
      console.log(data.registerUser);
      navigate("../");
    } catch (e) {
      console.error("Error en el registro:", e.message);
      setError2("Error en el registro: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-2">
    <div className="w-full max-w-[70%] mx-auto font-[sans-serif] p-6"> 
      <div className="p-8 rounded-3xl bg-white shadow-lg"> 
            <div className="flex justify-start items-center">
              <a href="javascript:void(0)">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg" alt="logo" className="w-12 h-auto" />
              </a>
              <h1 className="text-gray-800 text-3xl font-bold ml-3">
                GoSanMarcos
              </h1>
            </div>
            <h2 className="text-gray-800 text-center text-3xl font-bold py-5">
              Registrar cuenta
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <AuthInputField label="Nombres" type="text" name="name" placeholder="Carlos Antonio"
                value = {nombre}
                onChange={(e) => setNombre(e.target.value)}
                />

                <AuthInputField label="Apellidos" type="text" name="name" placeholder="Mejia Mejia"
                value = {apellido}
                onChange={(e) => setApellido(e.target.value)}
                />

                <AuthInputField label="Correo" type="text" name="email" placeholder="carlos.mejia6@unmsm.edu.pe"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInputField label="Código de estudiante" type="text" name="name" placeholder="20200258"
                value={codigoUniversitario}
                onChange={(e) => setCodigoUniversitario(e.target.value)}
                />
                <AuthInputField label="Contraseña" type="password" name="password" placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInputField label="Confirma contraseña" type="password" name="cpassword" placeholder="**********"
                value = {repassword}
                onChange={(e) => setRepassword(e.target.value)}
                />

                <AuthInputField label="Username" type="text" name="name" placeholder="Darkras"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                />

              </div>
              <p>{error2}</p>

              <div className="!mt-10">
              <div className="flex justify-center">
                <AuthButton text="Crear cuenta" className="max-w-xs" type="submit"/>
              </div>
              </div>
              <p className="text-gray-800 text-base !mt-8 text-center">
                ¿Ya tienes cuenta?
                <AuthLinkText text="Iniciar sesión" href="/login"/>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;