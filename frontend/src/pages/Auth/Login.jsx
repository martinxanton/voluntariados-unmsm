import AuthInputField from "../../components/AuthInputField.jsx";
import AuthButton from "../../components/AuthButton.jsx";
import AuthLinkText from "../../components/AuthLinkText.jsx";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token) {
      navigate("/search");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      console.log("Login successful");

      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("userId", JSON.stringify(data.loginUser.user.id));
      
      navigate("../search");
    } catch (e) {
      console.error("Login failed:", e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            {/* Header */}
            <div className="flex justify-start items-center">
              <a href="javascript:void(0)">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg"
                  alt="logo"
                  className="w-10 h-auto"
                />
              </a>
              <h1 className="text-gray-800 text-2xl font-bold ml-2">GoSanMarcos</h1>
            </div>
            <h2 className="text-gray-800 text-center text-2xl font-bold py-4">Inicio de Sesión</h2>

            {/* Forms */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <AuthInputField
                label="Correo"
                type="text"
                name="email"
                id="email"
                placeholder="ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <AuthInputField
                label="Contraseña"
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Checkbox y link */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Mantenerme conectado
                  </label>
                </div>

                <div className="text-sm">
                  <AuthLinkText href="javascript:void(0);" text="Olvidé mi contraseña" />
                </div>
              </div>

              {/* Sign In */}
              <div className="!mt-8">
                <AuthButton 
                  text={loading ? "Cargando..." : "Ingresar"} 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading} 
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

              {/* Register Link */}
              <p className="text-gray-800 text-sm !mt-8 text-center">
                ¿No tienes cuenta?
                <AuthLinkText href="/register" text="Registrate" className="ml-1 whitespace-nowrap" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;