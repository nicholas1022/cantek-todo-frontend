import axios from "axios";

console.log(import.meta.env.VITE_API_TODO_BASE_URL);
export default axios.create({
  baseURL: import.meta.env.VITE_API_TODO_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});