import { useNavigate } from 'react-router-dom';

const Button = ({ text, to, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Navegar a la página especificada
  };

  return (
    <button 
      type="button" 
      className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;