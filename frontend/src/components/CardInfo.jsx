export default function CardInfo({ title, description, imagePath }) {
    return (
      <>
        {/*<!-- Component: Card with image --> */}
        <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
          {/* <!-- Image --> */}
          <figure className="p-6 pb-0">
            <img
              src={imagePath} // Utiliza la ruta de la imagen pasada como prop
              alt={title} // Asegúrate de que el atributo alt tenga un valor descriptivo
              className="w-12 h-12 mx-auto" // Ajusta las clases según sea necesario
            />
          </figure>
          {/* <!-- Body--> */}
          <div className="p-6">
            <h3 className="mb-4 text-xl font-medium text-slate-700">{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        {/*<!-- End Card with image --> */}
      </>
    );
  }
  