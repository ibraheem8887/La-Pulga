import api from '../api'; 

export const fetchItems = async (item, filters = {}) => {
  try {
    const response = await api.get(`/${item}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching ${item === 'products' ? 'Products' : 'Categories'}:`, error);
    throw error;
  }
};

export const fetchItemById = async (item,id) => {
  try {
    const response = await api.get(`/${item}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fecting ${item}:`, error);
    throw error; 
  }
}; 

export const addItem = async (item,data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');
  
      const response = await api.post(`/${item}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`
        },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding ${item}:`, error);
     
        
      }
    };
  

    export const deleteItem = async (item,id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');
        
            const response = await api.delete( `/${item}/${id}`, {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
              },
              timeout: 5000,
            });
            return response.data;
          } catch (error) {
            console.error(`Error deleting ${item}:`, error);
           
              
            }
        };

        export const editItem = async (item,data,id) => {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User not authenticated');
        
            const response = await api.put(`/${item}/${id}`, data, {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
              },
              timeout: 5000,
            });
            return response.data;
          } catch (error) {
            console.error(`Error editing ${item}:`, error);
           
              
            }
          };
        
          export const patchItemSku = async (id, sku) => {
            try {
              
          
              const response = await api.patch(`/products/${id}/sku`, { sku:sku }, {
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                },
                timeout: 5000,
              });
          
              return response.data;
            } catch (error) {
              console.error(`Error patching SKU for products`, error);
              throw error;
            }
          };
          