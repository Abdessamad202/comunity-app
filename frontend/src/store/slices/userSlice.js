import { createSlice } from "@reduxjs/toolkit";
import { loginFunction, registerStep1Function, registerStep2Function, registerStep3Function, logoutFunction } from "../reducers/userReducers";

const initialState = {
  id: localStorage.getItem("user_id") || null,
  profileId: localStorage.getItem("profile_id") || null,
  token: localStorage.getItem("token") || null,
  step: localStorage.getItem("step") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: loginFunction, // Use the login function without parentheses
    registerStep1: registerStep1Function, // Use the registerStep1 function without parentheses
    registerStep2: registerStep2Function, // Use the registerStep2 function without parentheses
    registerStep3: registerStep3Function, // Use the registerStep3 function without parentheses
    logout: logoutFunction, // Use the logout function directly
  },
});

export const { login, registerStep1, registerStep2, registerStep3, logout } = userSlice.actions;
export { userSlice };
