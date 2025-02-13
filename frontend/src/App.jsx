import { Route, Routes } from "react-router"
import { RegisterForm } from "./components/Auth/RegisterForm"
import { VerificationForm } from "./components/Auth/VerificationForm"
import { LoginForm } from "./components/Auth/LoginForm"
import {  ProfileCompletionForm } from "./components/Auth/Profile"

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/verify" element={<VerificationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profile" element={<ProfileCompletionForm />} />
    </Routes>
  )
}

export default App