const VolunteeringRegister = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[black] mb-6">Crear Voluntariado</h1>

      <form className="grid grid-cols-1 gap-6">
        {/* Title */}
        <div className="p-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título del voluntariado"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Category */}
        <div className="p-2">
          <select
            id="category"
            name="category"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <option value="">Selecciona una categoría</option>
            <option>Adulto Mayor</option>
            <option>Animales</option>
            <option>Educación</option>
            <option>Medio Ambiente</option>
          </select>
        </div>

        {/* Description and Image Upload */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Event Description"
              className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
              <div className="text-center">
                <div className="mb-2">
                  <button
                    type="button"
                    className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4"
                  >
                    Haz clic para subir
                  </button>
                </div>
                <p className="text-gray-500">o arrastra la imagen aquí</p>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
              </div>
            </label>
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
            />
          </div>
        </div>

        {/* Location */}
        <div className="p-2">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Ubicación"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Time */}
        <div className="p-2">
          <input
            type="text"
            id="time"
            name="time"
            placeholder="Horario"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Start Date and Time */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"></path>
              </svg>
              <span className="ml-2">Día Inicio</span>
            </span>
            <input
              type="date"
              id="start-date"
              name="start-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
          </div>

          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <label for="time" className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              Hora de Inicio
            </label>
            <input type="time" name="time" id="start-time"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2" />
          </div>
        </div>

        {/* End Date and Time */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"></path>
              </svg>
              <span className="ml-2">Día Inicio</span>
            </span>
            <input
              type="date"
              id="start-date"
              name="start-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
          </div>

          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <label for="time" className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              Hora de Fin
            </label>
            <input type="time" name="time" id="end-time"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2" />
          </div>
        </div>

        {/* Registration Button */}
        <div className="col-span-full mt-6 p-2">
          <button
            type="submit"
            className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
          >
            CREAR VOLUNTARIADO
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteeringRegister;
