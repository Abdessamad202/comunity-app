import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

const StepsGuard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const step = localStorage.getItem("step");
  const userId = localStorage.getItem("user_id");
  const profile_id = localStorage.getItem("profile_id");
  useEffect(() => {
    if (!token || !step || !userId) {
      navigate("/register");
    }else if (step === "1"){
      navigate("/verify");
    }else if (step === "2"){
      navigate("/profile");
    }else {
      navigate("/home");
    }
  }, [token, step, userId, navigate, profile_id]); // Runs on changes

  return <Outlet />; // Allows rendering only if no redirection happens
};

export { StepsGuard };
