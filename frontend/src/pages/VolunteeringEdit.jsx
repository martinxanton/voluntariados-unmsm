import { gql, useMutation, useQuery  } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UPDATE_VOLUNTEER = gql`
  mutation updateVolunteer(
    $id: ID!
    $title: String
    $date_start: String
    $date_end: String
    $location: String
    $totalVac: Int
    $category: String
    $tags: [String]
  ) {
    updateVolunteer(
      id: $id
      title: $title
      date_start: $date_start
      date_end: $date_end
      location: $location
      totalVac: $totalVac
      category: $category
      tags: $tags
    ) {
      id
      title
    }
  }
`;

const GET_VOLUNTEER_BY_ID = gql`
  query getVolunteerById($id: ID!) {
    getVolunteerById(id: $id) {
      id
      title
      date_start
      date_end
      location
      totalVac
      category
      tags
    }
  }
`;

const GENERATE_RECOMMENDATION = gql`
  mutation generateUserRecommendation($volunteeringId: ID!) {
    generateUserRecommendation(volunteeringId: $volunteeringId) {
      lines {
        user {
          id
        }
      }
    }
  }
`;

const CREATE_USER_NOTIFICATION = gql`
  mutation addNotification(
    $idUsuario: ID!
    $categoria: String!
    $mensaje: String!
  ) {
    addNotification(
      idUsuario: $idUsuario
      categoria: $categoria
      mensaje: $mensaje
    ) {
      id
    }
  }
`;

const CategoryList = [
  "Animales",
  "Arte y Cultura",
  "Cocina",
  "Adulto Mayor",
  "Deportes",
  "Educación",
  "Medio Ambiente",
  "Salud",
  "Tecnología",
  "Música",
  "Ciencia",
  "Viajes",
  "Comunidad",
  "Desarrollo Personal",
  "Ayuda Humanitaria",
];

const VolunteeringEdit = () => {
  const { organizationId, volunteerId } = useParams();
  const navigate = useNavigate();
  
  const { data, loading, error } = useQuery(GET_VOLUNTEER_BY_ID, {
    variables: { id: volunteerId },
    onCompleted: (data) => {
      const volunteer = data.getVolunteerById;

      setFormData({
        title: volunteer.title,
        date_start: new Date(parseInt(volunteer.date_start)).toISOString().split("T")[0],
        date_end: new Date(parseInt(volunteer.date_end)).toISOString().split("T")[0],
        location: volunteer.location,
        totalVac: volunteer.totalVac,
        category: volunteer.category,
        tags: volunteer.tags || [],
      });
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    date_start: "",
    date_end: "",
    location: "",
    totalVac: 0,
    category: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "totalVac" ? parseInt(value) : value,
    });
  };

  const handleTagsChange = (e) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const [generateRecommendation] = useMutation(GENERATE_RECOMMENDATION);
  const [addNotification] = useMutation(CREATE_USER_NOTIFICATION);

  const [updateVolunteer, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_VOLUNTEER);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.date_start || !formData.date_end) {
      alert("Por favor, selecciona ambas fechas.");
      return; 
    }
  
    try {
      const { data: volunteerData } = await updateVolunteer({
        variables: {
          id: volunteerId,
          title: formData.title,
          date_start: new Date(formData.date_start).toISOString(), 
          date_end: new Date(formData.date_end).toISOString(),     
          location: formData.location,
          totalVac: formData.totalVac,
          category: formData.category,
          tags: formData.tags,
        },
      });     

      const volunteeringId = volunteerData.updateVolunteer.id;

      const { data: recommendationData } = await generateRecommendation({
        variables: { volunteeringId },
      });

      const recommendedUsers = recommendationData.generateUserRecommendation.lines.map(
        (line) => line.user.id
      );

      const notifications = recommendedUsers.slice(0, 5).map((userId) => {
        return addNotification({
          variables: {
            idUsuario: userId,
            categoria: "Voluntariado",
            mensaje: `Se ha actualizado un voluntariado que puede interesarte: ${formData.title}`,
          },
        });
      });

      await Promise.all(notifications);

      alert("¡Voluntariado actualizado!");
      navigate(`/${organizationId}/management`, { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar el voluntariado.");
    }
  };
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[black] mb-6">Editar Voluntariado</h1>

      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="p-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título del voluntariado"
            value={formData.title}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Category */}
        <div className="p-2">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <option value="">Selecciona una categoría</option>
            {CategoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="p-2">
          <p>Total vacantes</p>
          <input
            type="number"
            name="totalVac"
            placeholder="Total de vacantes"
            value={formData.totalVac}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Tags */}
        <div className="p-2">
          <p>Etiquetas (separadas por comas)</p>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Etiquetas (separadas por comas)"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Location */}
        <div className="p-2">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Ubicación"
            value={formData.location}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>

        {/* Start and End Date */}
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
              value={formData.date_start}
              onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
            />
          </div>

          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"></path>
              </svg>
              <span className="ml-2">Día Fin</span>
            </span>
            <input
              type="date"
              id="end-date"
              name="end-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
              value={formData.date_end}
              onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
            />
          </div>
        </div>
        {/* Registration Button */}
        <div className="col-span-full mt-6 p-2">
          <button
            type="submit"
            className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
          >
            {updateLoading ? "Actualizando..." : "ACTUALIZAR VOLUNTARIADO"}
          </button>
        </div>
        {updateError && <p className="text-red-500 text-center">Error: {updateError.message}</p>}
      </form>
    </div>
  );
};

export default VolunteeringEdit;
