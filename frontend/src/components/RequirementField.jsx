
const RequirementField = ({ title, description }) => {
    return (
      <div className="flex flex-col mt-2">
        <p className="font-bold text-black-700">{title}</p>
        <p className="text-sm mt-2 mb-1">{description}</p>
      </div>
    );
  };
  
  export default RequirementField;
  