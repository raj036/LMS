import axios from "axios";

export default axios.create({
  // baseURL: "https://il8rigour.com/",
  // baseURL: "http://il8rigour.com:8000/",
  baseURL: "https://d785-2405-201-37-21d9-b93e-5a4f-a902-c4bf.ngrok-free.app/",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
