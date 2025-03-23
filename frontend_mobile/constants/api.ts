// constants/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-setetesharapandesktop.up.railway.app", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;