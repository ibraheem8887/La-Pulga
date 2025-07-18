import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        'Content-Type':'Application/json'
    }
})
api.interceptors.response.use(
    response => response,
    error => { 
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // or use navigate()
      }
      return Promise.reject(error);
    }
  );
  
export default api;