import axios from "axios";

const request = axios.create({
  validateStatus: false,
  baseURL: "http://localhost:5000",
});

export default request;
