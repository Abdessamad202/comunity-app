import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const profile_id = localStorage.getItem("profile_id");
  return token && profile_id ? <Outlet /> : <Navigate to="/login" />;
};

export  {ProtectedRoute};
