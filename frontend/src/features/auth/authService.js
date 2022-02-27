import axios from "axios";

const API_URL = "/api/users";

//Register user
const register = async (userData) => {
  //
  const response = await axios.post(API_URL, userData);
  console.log(response);
  //if there is response.data
  if (response.data) {
    //save user data to local storage
    localStorage.setItem("user", JSON.stringify(response.data));

    //return user data
    return response.data;
  }
};

//Login user
const login = async (userData) => {
  //login request
  const response = await axios.post(`${API_URL}/login`, userData);

  console.log(`login response:${response}`);

  //if there is response.data
  if (response.data) {
    localStorage.getItem("user", JSON.stringify(response.data));

    //return user data
    return response.data;
  }
};

//Logout user
const logout = () => localStorage.removeItem("user");

//authService
const authService = {
  register,
  logout,
  login,
};

//export all functions in authService
export default authService;
