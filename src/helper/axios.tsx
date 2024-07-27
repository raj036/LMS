import axios from "axios";

export default axios.create({
  // baseURL: "https://il8rigour.com/",
  // baseURL: "http://il8rigour.com:8000/",
  // baseURL: "https://ilate.onrender.com/",
  baseURL: "https://0777-2405-201-37-21d9-6dad-a7af-5b01-7e09.ngrok-free.app/",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
