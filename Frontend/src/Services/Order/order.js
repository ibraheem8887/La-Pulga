import api from "../api";

export const addOrder = async (data) => {
    try {
        const response = await api.post('/orders', data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
     
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding Order`, error);
      }
    };
  