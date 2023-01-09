import api from "./api";
import TokenService from "./token.service";

const register = (full_name, username, password) => {
  return api.post("/auth/register", {
    full_name,
    username,
    password
  });
};

const login = (username, password) => {
  return api
    .post("/auth/login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setUser({
          user_id: response.data.user_id,
          full_name: response.data.full_name,
          refreshToken: response.data.refresh_token,
          accessToken: response.data.access_token,
        });
      }
      console.log(response.data)
      return response.data;
    });
};

const logout = (refreshToken) => {
  return api.post("/auth/logout", { refreshToken }).then((response) => { TokenService.removeUser(); console.log(response) })

};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
