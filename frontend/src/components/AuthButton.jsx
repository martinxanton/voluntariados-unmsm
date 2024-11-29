import { useNavigate } from "react-router-dom";

const Button = ({ 
  text, 
  to, 
  className = "", 
  onClick, 
  type = "button" 
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) {
      navigate(to); 
    } else if (onClick) {
      onClick(e); 
    }
  };

  return (
    <button
      type={type}
      className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;