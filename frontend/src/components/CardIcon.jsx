import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/outlined";
import PropTypes from "prop-types";
const CardIcon = ({ title, icon }) => {
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
        className="inline-flex items-center justify-center p-5 text-gray-700 bg-base-100 rounded-lg cursor-pointer peer-checked:bg-secondary hover:text-white peer-checked:text-white hover:bg-secondary w-28 h-full text-center shadow-md"
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
  id: PropTypes.number.isRequired,
};

export default CardIcon;
