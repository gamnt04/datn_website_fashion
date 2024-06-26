import axios from "axios";
const instance = axios.create({
  // baseURL: import.meta.env.API_BASE_URL
  baseURL: "http://localhost:2004/api/v1"
});
export default instance;
