import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.109:2323/",
});

export default api;
