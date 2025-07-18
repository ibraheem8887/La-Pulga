import axios from 'axios';
import api from '../api';

export const login = async (data, navigate) => {
  try {
    const response = await api.post('/admin/login', data);

    const result = response.data;

    console.log("Login successful:", result);
    localStorage.setItem('token', result.token);

    navigate('/admin'); // redirect to admin dashboard
    return result;

  } catch (error) {
    console.error("Login error:", error);
    if (error.response) {
      alert(error.response.data.message || "Login failed");
    } else {
      alert("Something went wrong. Try again.");
    }
    return null;
  }
};
