const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <div className="flex justify-start items-center"> 
              <a href="javascript:void(0)">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/UNMSM_coatofarms_seal.svg" alt="logo" className='w-10 h-auto' />
              </a>
              <h1 className="text-gray-800 text-2xl font-bold ml-2">
                GoSanMarcos
              </h1>
            </div>
            <h2 className="text-gray-800 text-center text-2xl font-bold py-4">
              Inicio de Sesión
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block font-bold">
                  Correo
                </label>
                <div className="relative flex items-center">
                  <input name="username" type="text" required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="ejemplo@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block font-bold">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required 
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="**********"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Mantenerme conectado
                  </label>
                </div>

                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Olvidé mi contraseña
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Ingresar
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                ¿No tienes cuenta?
                <a href="javascript:void(0);" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
