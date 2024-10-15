import { MaterialSymbol } from "react-material-symbols";
import PropTypes from "prop-types";

const CardVolunteering = ({
  photo = "https://via.placeholder.com/300",
  title,
  organization,
  date,
  location,
  totalVac,
  filledVac,
}) => {
  const availableVac = totalVac - filledVac;

  return (
    <div className="card bg-base-100 h-full shadow-md">
      <figure className="h-44 lg:h-40">
        <img src={photo} alt="Shoes" className="object-cover h-full w-full" />
      </figure>
      <div className="card-body p-5">
        <h1 className="text-xl font-medium">{title}</h1>
        <h2 className="text-sm font-bold">{organization}</h2>
        <div className="flex gap-2 items-center">
          <MaterialSymbol
            icon="calendar_month"
            size={20}
            fill
            grade={-25}
            color="text-neutral-500"
          />
          <p>{date}</p>
        </div>
        <div className="flex gap-2 items-center">
          <MaterialSymbol
            icon="location_on"
            size={20}
            fill
            grade={-25}
            color="text-neutral-500"
          />
          <p>{location}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-medium">Vacantes disponibles: </p>
          <p>{availableVac}</p>
        </div>
        <div className="card-actions justify-around flex pt-2 mt-auto">
          <button className="btn btn-primary flex-1">Únete</button>
          <button className="btn btn-outline btn-primary flex-1">
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

CardVolunteering.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  totalVac: PropTypes.number.isRequired,
  filledVac: PropTypes.number.isRequired,
};


export default CardVolunteering;
