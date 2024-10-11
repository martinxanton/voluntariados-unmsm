import AuthInputField from "../../components/AuthInputField.jsx";
import AuthButton from "../../components/AuthButton.jsx";
import AuthLinkText from "../../components/AuthLinkText.jsx";

const Register = () => {
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

            <form>
              <div className="grid sm:grid-cols-2 gap-8">
                <AuthInputField label="Nombres" type="text" name="name" placeholder="Carlos Antonio"/>
                <AuthInputField label="Apellidos" type="text" name="lname" placeholder="Mejia Caicedo"/>
                <AuthInputField label="Correo" type="text" name="email" placeholder="carlos.mejia6@unmsm.edu.pe"/>
                <AuthInputField label="Código de estudiante" type="number" name="number" placeholder="20200258"/>
                <AuthInputField label="Contraseña" type="password" name="password" placeholder="**********"/>
                <AuthInputField label="Confirma contraseña" type="password" name="cpassword" placeholder="**********"/>
              </div>

              <div className="!mt-10">
              <div className="flex justify-center">
                <AuthButton text="Crear cuenta" className="max-w-xs"/>
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