import { Route, Routes } from "react-router";
import { RegisterForm } from "../components/RegisterForm";
import { ProtectedRoute } from "../middlewares/ProtectedRoute";
import { StepsGuard } from "../middlewares/StepsGuards";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { VerificationForm } from "../components/VerificationForm";
import { ProfileCompletionForm } from "../components/ProfileCompletionForm";
import { Login } from "../pages/Login";
import RegisterLayout from "../layouts/RegisterLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected routes for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      {/* Step-based authentication (user must complete steps in order) */}
      <Route element={<RegisterLayout />}>
        <Route element={<StepsGuard />}>
        <Route path="/register" element={<RegisterForm />} />
          <Route path="/verify" element={<VerificationForm />} />
          <Route path="/profile" element={<ProfileCompletionForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRoutes };
