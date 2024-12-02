import CardInfo from "../components/CardInfo";
import CarouselTestimonial from "../components/CarouselTestimonial";
import { useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import CardStat from "../components/CardStat";
import CardIcon from "../components/CardIcon";

const CategoryList = [
  {
    title: "Animales",
    icon: "pets",
  },
  {
    title: "Arte y Cultura",
    icon: "palette",
  },
  {
    title: "Cocina",
    icon: "restaurant",
  },
  {
    title: "Adulto Mayor",
    icon: "elderly",
  },
  {
    title: "Deportes",
    icon: "sports",
  },
  {
    title: "Educación",
    icon: "school",
  },
  {
    title: "Medio Ambiente",
    icon: "eco",
  },
  {
    title: "Salud",
    icon: "volunteer_activism",
  },
  {
    title: "Otros",
    icon: "more_horiz",
  },
];

const GET_USERS = gql`
  query {
    getUsers {
      id
      nombre
      apellido
      carrera
      scores {
        score
      }
    }
  }
`;

const LandingPage = () => {
  const [allScores, setAllScores] = useState([]);

  // Ejecutar la consulta de manera automática con useQuery
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (data) {
      const allScoresArray = data.getUsers.flatMap((user) =>
        user.scores.map((score) => ({
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          carrera: user.carrera,
          score: score.score,
        }))
      );
      const sortedScores = allScoresArray.sort((a, b) => b.score - a.score); // Ordenar los puntajes de mayor a menor
      setAllScores(sortedScores.slice(0, 10));
    }
  }, [data]); // Cuando la // Cuando la data cambie, actualizar allScores

  if (loading) return <p>Cargando...</p>;

  if (error) return <div>Error al cargar los datos: {error.message}</div>;

  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="src/assets/Banner.png" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="src/assets/Banner1.png" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="src/assets/Banner.png" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="src/assets/Banner1.png" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      <div className="bg-base-200 min-h-60-screen flex justify-center pt-12 ">
        <div className="text-center">
          <div className="max-w-8xl mb-3">
            <h1 className="text-4xl font-bold">¿Cómo quieres ayudar?</h1>
            <div className="p-3 bg-gray-100 rounded-lg shadow-md">
              <div className="m-4 pb-5">
                <button className="btn btn-primary w-80 text-xl">
                  QUIERO SER VOLUNTARIO
                </button>
              </div>
              <div>
                <h1 className="text-xl font-bold mb-4 p-4">
                  Elige la causa ideal para ti
                </h1>
              </div>
              <div className="flex flex-col p-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-5 justify-around ">
                  {CategoryList.map((category, index) => (
                    <li key={index} className="mb-2 w-full">
                      <CardIcon title={category.title} icon={category.icon} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-base-200 min-h-56-screen py-36  flex justify-center ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="src/assets/imageVolunteer.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="py-8 mx-16">
            <h1 className="text-5xl font-bold">Únete !</h1>
            <p className="py-6 text-2xl">
              La comunidad solidaria universitaria más grande del Perú. A través
              de voluntarios de diversas areas, se busca ayudar a las personas
              que más lo necesitan.
            </p>
          </div>
        </div>
      </div>

      <div className="my-36">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold">
            ¿Qué beneficios brinda la plataforma?
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-12 my-6">
          {/* Card 1 */}
          <CardInfo
            title="Sencilla y Amigable"
            description="La plataforma es fácil de usar, rápida e intuitiva."
            imagePath="src/assets/beneficio1.svg"
          />
          {/* Card 2 */}
          <CardInfo
            title="Confiable"
            description="Los programas no tienen fines de lucro."
            imagePath="src/assets/beneficio2.svg"
          />

          {/* Card 3 */}
          <CardInfo
            title="Diversidad de causas"
            description="Tienes a tu disposición proyectos para participar."
            imagePath="src/assets/beneficio3.svg"
          />

          {/* Card 4 */}
          <CardInfo
            title="Continuidad"
            description="Damos seguimiento del proyecto para umentar la transparencia."
            imagePath="src/assets/beneficio4.svg"
          />
        </div>
      </div>

      <div className="hero bg-base-200 min-h-60-screen pt-5 pb-20">
        <div className="hero-content text-center">
          <div className="max-w-3xl mx-auto">
            {/* Imagen justo encima del texto */}
            <img
              src="src/assets/novedad.svg"
              alt="Imagen destacada"
              className="mx-auto mb-4 w-40 h-40"
            />
            <h1 className="text-4xl font-bold">
              Encuentra el programa de voluntariado ideal para ti con nuestro
              sistema de recomendación personalizado que se adapta a tus
              intereses y habilidades
            </h1>

            <p className="py-10 text-lg">
              Empieza a hacer una diferencia significativa en proyectos que
              están alineados con tus valores y que se ajustan a tu
              disponibilidad y competencias. ¡Regístrate ahora y encuentra tu
              próximo reto con solo un clic!
            </p>
            <button className="btn btn-primary w-64 text-xl">
              Ver Programas
            </button>
          </div>
        </div>
      </div>

      <div className="my-20">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold">Testimonios</h1>
        </div>
        <div>
          <CarouselTestimonial />
        </div>
      </div>

      <div className="bg-base-200 min-h-56-screen py-36  flex justify-center ">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold">Puntajes Generales</h1>

          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Ranking</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Apellido</th>
                  <th className="border border-gray-300 px-4 py-2">Carrera</th>
                  <th className="border border-gray-300 px-4 py-2">Puntaje</th>
                </tr>
              </thead>
              <tbody>
                {allScores.map((score, index) => (
                  <tr
                    key={score.id}
                    className={
                      index === 0
                        ? "bg-yellow-200"
                        : index === 1
                        ? "bg-gray-200"
                        : index === 2
                        ? "bg-amber-100"
                        : ""
                    }
                  >
                    <td className="border border-gray-300 px-4 py-2 font-bold text-center">
                      {index === 0
                        ? "Top 1"
                        : index === 1
                        ? "Top 2"
                        : index === 2
                        ? "Top 3"
                        : `${index + 1}`}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {score.nombre}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {score.apellido}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {score.carrera}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {score.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pb-10">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold">Voluntariado en cifras</h1>
        </div>
        <div className=" flex justify-around">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-12 my-6">
            <CardStat title="Voluntarios registrados" value="+1.2K" />
            <CardStat title="Programas de voluntariado" value="+150" />
            <CardStat title="Horas de voluntariado" value="+1.2K" />
            <CardStat title="Personas beneficiadas" value="+2k" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
