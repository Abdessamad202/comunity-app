
import { useSelector } from "react-redux";
import { getStepColor } from "../utils/getStepColor";

const Steps = () => {

  // Function to determine step color
  const actualStep = useSelector((state) => state.user.step);

  return (
    <div className="text-center mb-8">
      <div className="flex justify-around items-center steps">
        {/* Step 1 - Register */}
        <div className="flex flex-col items-center space-y-2 step">
          <div className={`w-8 h-8 rounded-full ${getStepColor(1,actualStep, "/register")} text-white flex items-center justify-center`}>
            <span>1</span>
          </div>
          <p className="text-xs text-gray-600">Register</p>
        </div>

        {/* Step 2 - Verify Email */}
        <div className="flex flex-col items-center space-y-2 step">
          <div className={`w-8 h-8 rounded-full ${getStepColor(2,actualStep, "/verify")} text-white flex items-center justify-center`}>
            <span>2</span>
          </div>
          <p className="text-xs text-gray-600">Verify Email</p>
        </div>

        {/* Step 3 - Complete Profile */}
        <div className="flex flex-col items-center space-y-2 step">
          <div className={`w-8 h-8 rounded-full ${getStepColor(3,actualStep, "/profile")} text-white flex items-center justify-center`}>
            <span>3</span>
          </div>
          <p className="text-xs text-gray-600">Complete Profile</p>
        </div>
      </div>
    </div>
  );
};

export { Steps };
