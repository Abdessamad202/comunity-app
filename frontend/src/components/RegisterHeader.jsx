import PropTypes from "prop-types";
const RegisterHeader = ({ title, description }) => {
  return (
    <>
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
    </>
  );
};

// Define PropTypes for type checking
RegisterHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { RegisterHeader };
