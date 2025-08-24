import axios from "axios";
import Cookies from "js-cookie";

const server = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${ Cookies.get("veg-token") || null}`,
  },
});

export const setToken = (token) => {
  if (token) {
    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete server.defaults.headers.common["Authorization"];
  }
};

export default server;
