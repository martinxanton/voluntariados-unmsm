import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/outlined";
import PropTypes from "prop-types";
const CardIcon = ({ title, icon, onClick }) => {
  const handleClick = (e) => {
    // Llama a la función que se pasó como prop
    if (onClick) {
      onClick(e); // Pasa el evento al padre
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id={`react-${icon}`}
        value=""
        className="hidden peer"
        required=""
      />
      <label
        htmlFor={`react-${icon}`}
        onClick={handleClick}
        className="inline-flex items-center justify-center p-5 text-primary peer-checked:border-2 bg-base-100 rounded-lg cursor-pointer peer-checked:border-primary hover:bg-base-200 w-28 h-full text-center shadow-md select-none"
      >
        <div className="flex flex-col items-center justify-around h-full">
          {/*  <!-- Icon --> */}
          <MaterialSymbol
            icon={icon}
            size={40}
            fill
            grade={-25}
            color="text-neutral-500"
          />
          {/*  <!-- Body--> */}
          <div>
            <h3 className="text-md font-medium">{title}</h3>
          </div>
        </div>
      </label>
      {/*<!-- End Card with icon --> */}
    </>
  );
};
CardIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CardIcon;
