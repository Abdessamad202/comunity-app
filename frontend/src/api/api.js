
import apiClient from "./apiClient";
const userId = localStorage.getItem('user_id')
export const logIn = async (data) => {
  const response = await apiClient.post('http://localhost:8000/api/login', data);
  return response.data
}
export const register = async (data) => {
  const response = await apiClient.post(
    'http://localhost:8000/api/register/step-1',
    data,
  );
  return response.data
}

export const completeProfile = async (data) => {
  const response = await apiClient.post(`http://localhost:8000/api/register/step-3/${userId}`, data)
  return response.data
}
export const VerificationEmail = async (data) => {
  const response = await apiClient.post(`http://localhost:8000/api/register/step-2/${userId}`, data)
  return response.data
}
export const reSendCode = async () => {
  const response = await apiClient.post(`http://localhost:8000/api/register/resend-code/${userId}`, {})
  return response.data
}
export const logOut = async () => {
  const response = await apiClient.post("http://localhost:8000/api/logout", {})
  return response.data
}
export const getUser = async (profileId) => {
  const response = await apiClient.get(`http://localhost:8000/api/profile/${profileId}`)
  return response.data
}
