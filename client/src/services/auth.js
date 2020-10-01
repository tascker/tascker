import axios from "axios";

const signup = (username, email, password, department) => {
  console.log("insignup");
  return axios
    .post("/api/auth/signup", { username, email, password, department })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = (username, password) => {
  return axios
    .post("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { signup, login, logout };
