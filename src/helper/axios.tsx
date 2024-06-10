import axios from "axios";

export default axios.create({
  // baseURL: "https://il8rigour.com/",
  // baseURL: "http://il8rigour.com:8000/",
  baseURL: "https://ad1d-2405-201-37-21d9-c152-4821-34be-b50.ngrok-free.app/",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
