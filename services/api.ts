import axios from "axios";

const localUrl = "http://192.168.2.109:2323/";
const firebaseUrl = "https://us-central1-pills-dispenser-613f5.cloudfunctions.net/app";

const api = axios.create({
  baseURL: firebaseUrl,
});


export default api;
