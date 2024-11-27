const CreateActivityModal  = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-bold mb-4">Crear Actividad</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Título de la Actividad</label>
              <input
                type="text"
                placeholder="Ej. Taller de Programación"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Programa</label>
              <select className="w-full p-2 rounded bg-gray-700 text-white">
                <option>Seleccionar un programa</option>
                <option>Programa 1</option>
                <option>Programa 2</option>
                <option>Programa 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Descripción</label>
              <textarea
                placeholder="Añade una descripción..."
                className="w-full p-2 rounded bg-gray-700 text-white"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreateActivityModal ;
  