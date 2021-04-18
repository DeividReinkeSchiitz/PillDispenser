import axios from "axios";

const serverUrl = "https://us-central1-pill-dispenser-72afb.cloudfunctions.net/app/";
const localUrl = "http://localhost:5001/pill-dispenser-72afb/us-central1/app";

const api = axios.create({
  baseURL: "http://192.168.2.109:2323/",
});

export default api;
