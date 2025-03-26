import axios from "axios";

export default axios.create({
  baseURL: "https://il8lc.com/",
  // baseURL: "http://il8rigour.com:8000/",
  // baseURL: "https://ilate.onrender.com/",
  // baseURL: "https://f106-2405-201-37-21d9-311d-7880-d42b-c558.ngrok-free.app/",
  // baseURL: "https://b38c-2405-201-37-21d9-e17b-a0ea-81d6-b1f3.ngrok-free.app/",
  // baseURL: "https://lms-5wr7.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});