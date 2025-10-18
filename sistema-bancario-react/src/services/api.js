import axios from "axios";

// Configurar a URL base da sua API
const api = axios.create({
  baseURL: "https://angular-api.xwhost.com.br/api/", // URL real da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
