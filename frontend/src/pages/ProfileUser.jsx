const ProfileUser = () => {
  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
    <div className="flex flex-col">
      {/* Cover Image */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
        alt="User Cover"
        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
      />

      {/* Profile Image */}
      <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
        <img
          src="https://img.freepik.com/vector-premium/icono-usuario-avatar-perfil-usuario-icono-persona-imagen-perfil-silueta-neutral-genero-adecuado_697711-1132.jpg"
          alt="User Profile"
          className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
        />

        {/* FullName */}
        <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
          Carlos Mejia Caicedo
        </h1>
      </div>

      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        {/* Description */}
        <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
        Hola, mi nombre es Carlos Mejía, soy una persona apasionada por ayudar a los demás y contribuir al bienestar de mi comunidad. Desde siempre he sentido un profundo interés por involucrarme en actividades que generen un impacto positivo en la sociedad. Creo firmemente que, a través del voluntariado, no solo puedo aportar con mi tiempo y habilidades, sino también aprender de las experiencias y valores de las personas con las que trabaje.
        Me motiva especialmente la posibilidad de formar parte de un equipo comprometido, en el que podamos trabajar juntos hacia un objetivo común, enfrentando retos y creciendo tanto personal como profesionalmente. Además, considero que el voluntariado es una oportunidad única para retribuir a la sociedad y promover un entorno más solidario y justo.
        </p>

        {/* Details */}
        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
          <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            <DetailsColumn
              details={[
                { title: 'Nombre', value: 'Carlos' },
                { title: 'Apellidos', value: 'Mejia Caicedo' },
                { title: 'Número', value: '+51 955 649 849' },
                { title: 'Sexo', value: 'Masculino' },
              ]}
            />
            <DetailsColumn
              details={[
                { title: 'Facultad', value: 'Facultad de Ingeniería de Sistemas e Informática' },
                { title: 'Carrera', value: 'Ingeniería de Software' },
                { title: 'Correo', value: 'carlos.mejia6@unmsm.edu.pe' },
                { title: 'Ciclo', value: '10' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

const DetailsColumn = ({ details }) => (
<div className="w-full">
  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    {details.map((detail, index) => (
      <div
        key={index}
        className={`flex flex-col ${index === 0 ? 'pb-3' : 'py-3'}`}
      >
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
          {detail.title}
        </dt>
        <dd className="text-lg font-semibold">{detail.value}</dd>
      </div>
    ))}
  </dl>
</div>   
  );

export default ProfileUser;
