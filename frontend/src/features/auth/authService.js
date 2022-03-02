import axios from "axios";

const API_URL = "/api/users";

//Register
const register = async (userData) => {
  //axios request /api/users
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  //return user data & token
  return response.data;
};

//Login
const login = async (userData) => {
  //axios request /api/users/login
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  //return user data & token

  return response.data;
};

//Logout user
const logout = () => localStorage.removeItem("user");

//
const authService = {
  register,
  login,
  logout,
};

export default authService;
