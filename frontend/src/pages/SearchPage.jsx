import { MaterialSymbol } from "react-material-symbols";
import CardIcon from "../components/CardIcon";
import CardVolunteering from "../components/CardVolunteering";
import Search from "../components/Search";

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
  },
  {
    photo: "https://example.com/photo2.jpg",
    title: "Voluntariado en Educación",
    organization: "EducaPeru",
    date: "15/02/2022",
    location: "Cusco",
    totalVac: 20,
    filledVac: 10,
  },
  {
    photo: "https://example.com/photo3.jpg",
    title: "Voluntariado Ambiental",
    organization: "GreenEarth",
    date: "10/03/2022",
    location: "Arequipa",
    totalVac: 15,
    filledVac: 7,
  },
  {
    photo: "https://example.com/photo4.jpg",
    title: "Voluntariado en Salud",
    organization: "HealthFirst",
    date: "25/04/2022",
    location: "Trujillo",
    totalVac: 12,
    filledVac: 6,
  },
];

const SearchPage = () => {
  return (
    <div className="bg-base-200 min-h-screen p-4 lg:p-6">
      <div className="flex flex-col">
        <div className="flex flex-col p-4">
          <h2 className="text-xl font-bold mb-4 p-4">Categorías</h2>
          <ul className="flex gap-5 justify-around overflow-auto">
            {CategoryList.map((category, index) => (
              <li key={index} className="mb-2">
                <CardIcon title={category.title} icon={category.icon} />  
              </li>
            ))}
            {/*CategoryList.map((category, index) => (
              <li key={index} className="mb-2">
                <CardIcon title={category.title} icon={category.icon} />
              </li>
            ))*/}
          </ul>
        </div>
        <div className="w-full p-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-4">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>
              <ul className="flex flex-col gap-2">
                <Search />
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
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-3/4 p-4">
              <h2 className="text-xl font-bold mb-4">
                Voluntariados Disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteeringList.map((volunteering, index) => (
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
