import { Outlet, useLocation } from "react-router";
import { RegisterHeader } from "../components/RegisterHeader";
import { Steps } from "../components/Steps";
const RegisterLayout = () => {
  const location = useLocation(); // Get current route path

  // Define dynamic content based on the route
  let headerContent = null;
  switch (location.pathname) {
    case "/register":
      headerContent = (
        <RegisterHeader title="Create an account" description="Join us today!" />
      );
      break;
    case "/verify":
      headerContent = (
        <RegisterHeader title="Verify your email" description="Enter the verification code we sent to your email." />
      );
      break;
    case "/profile":
      headerContent = (
        <RegisterHeader title="Complete your profile" description="Tell us more about you" />
      );
      break;
    default:
      return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <Steps />
        {headerContent} {/* Dynamic Header based on Route */}
        <Outlet /> {/* Renders the matched route component */}
      </div>
    </div>
  );
};

export default RegisterLayout;
