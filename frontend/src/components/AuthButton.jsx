
const AuthButton = ({ text, type = "button", className }) => {
    return (
      <button 
        type={type} 
        className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${className}`}
      >
        {text}
      </button>
    );
  };

export default AuthButton;