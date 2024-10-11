
const AuthInputField = ({ label, type, name, placeholder, required }) => {
    return (
      <div>
        <label className="text-gray-800 text-sm mb-2 block font-bold">
          {label}
        </label>
        <div className="relative flex items-center">
          <input 
            name={name} 
            type={type} 
            required
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
            placeholder={placeholder} 
          />
        </div>
      </div>
    );
  };

export default AuthInputField;