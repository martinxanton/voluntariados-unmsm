import { MaterialSymbol } from "react-material-symbols";
import CardIcon from "../components/CardIcon";
import CardVolunteering from "../components/CardVolunteering";
import { useState } from "react";

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

const volunteeringList = [
  {
    photo:
      "https://juventudambiental.minam.gob.pe/wp-content/uploads/2022/03/SalvaPlayas1-1024x683.jpg",
    title: "Voluntariado Marino",
    organization: "OMAN",
    date: "01/01/2022",
    location: "Lima",
    totalVac: 10,
    filledVac: 5,
    category: "Medio Ambiente",
    tags: ["Marino", "Playas"],
  },
  {
    photo:
      "https://www.prisma.org.pe/wp-content/uploads/Voluntariado.Nota_.Portada.jpg",
    title: "Voluntariado en Educación",
    organization: "EducaPeru",
    date: "15/02/2022",
    location: "Cusco",
    totalVac: 20,
    filledVac: 10,
    category: "Educación",
    tags: ["Niños", "Colegios"],
  },
  {
    photo:
      "https://cdn.www.gob.pe/uploads/document/file/4502145/Voluntariado%20CIMA%20desarrollan%20actividades%20como%20la%20arborizaci%C3%B3n%2C%20reciclaje%2C%20el%20uso%20de%20energ%C3%ADas%20renovables%20y%20otros..jpg",
    title: "Voluntariado Ambiental",
    organization: "GreenEarth",
    date: "10/03/2022",
    location: "Arequipa",
    totalVac: 15,
    filledVac: 7,
    category: "Medio Ambiente",
    tags: ["Reciclaje", "Parques"],
  },
  {
    photo:
      "https://cdn.www.gob.pe/uploads/document/file/4401758/standard_Becaria%20Dayana%20Narciso%20en%20una%20de%20las%20actividades%20de%20su%20voluntariado%20Thani%20Kirus.png",
    title: "Voluntariado en Salud",
    organization: "HealthFirst",
    date: "25/04/2022",
    location: "Trujillo",
    totalVac: 12,
    filledVac: 6,
    category: "Salud",
    tags: ["Vacunación", "Consultas"],
  },
];

const SearchPage = () => {
  const [filteredVolunteering, setFilteredVolunteering] =
    useState(volunteeringList);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Funciones para capturar los valores del input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
  };

  const searchCategory = (category) => {
    console.log("filtro seleccionado ");
    console.log(category);
    const result = volunteeringList.filter((volunteering) => volunteering.category === category);
    setFilteredVolunteering(result);

  };
  // Filtrar los voluntariados en función de la búsqueda y ubicación
  const filterVolunteering = () => {
    let filtered = volunteeringList.filter((volunteering) => {
      const matchesSearch = volunteering.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSearch_2 = volunteering.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesLocation = volunteering.location
        .toLowerCase()
        .includes(locationQuery.toLowerCase());

      return matchesSearch && matchesLocation || matchesSearch_2 && matchesLocation;
    });
    setFilteredVolunteering(filtered);
  };

  return (
    <div className="bg-base-200 min-h-screen p-4 lg:p-6">
      <div className="flex flex-col">
        <div className="flex flex-col p-4">
          <h2 className="text-xl font-bold mb-4 p-4">Categorías</h2>
          <ul className="flex gap-5 justify-around overflow-auto">
            {CategoryList.map((category, index) => (
              <li key={index} className="mb-2">
                <CardIcon title={category.title} icon={category.icon} onClick={ () => searchCategory(category.title) } />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full p-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-4">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>
              <ul className="flex flex-col gap-2">
                <li className="mb-2">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Buscar"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </li>
                <li className="mb-2">
                  <label className="input input-bordered flex items-center gap-2">
                    <MaterialSymbol
                      icon="location_on"
                      size={20}
                      fill
                      grade={-25}
                    />
                    <input
                      type="text"
                      className="grow"
                      placeholder="Ubicación"
                      value={locationQuery}
                      onChange={handleLocationChange}
                    />
                  </label>
                </li>
                <button className="btn btn-primary" onClick={filterVolunteering}>
                  Buscar
                </button>
              </ul>
            </div>
            <div className="w-full md:w-3/4 p-4">
              <h2 className="text-xl font-bold mb-4">
                Voluntariados Disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVolunteering.map((volunteering, index) => (
                  <div key={index}>
                    <CardVolunteering
                      photo={volunteering.photo}
                      title={volunteering.title}
                      organization={volunteering.organization}
                      date={volunteering.date}
                      location={volunteering.location}
                      totalVac={volunteering.totalVac}
                      filledVac={volunteering.filledVac}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

