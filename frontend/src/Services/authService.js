import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constants";
import { jwtDecode } from "jwt-decode";

const authService = {
    register: async (userData) => {
        try {
            const response = await api.post(API_ENDPOINTS.REGISTER, userData);
           const { token } = response;
           if (!token) {
            throw new Error('Token not found in response');
          }
    
          localStorage.setItem('token', token);
          const decoded = jwtDecode(token);
          return { ...response, user: decoded };
        
    
        } catch (error) {
          throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
            console.log('Login response:', response);

            const { token } = response;

           
      if (!token) {
        throw new Error('Token not found in response');
      }

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      console.log('Decoded user:', decoded);
      return { ...response, user: decoded };
    } catch (error) {
      throw error;
    }
    },

    logout: async () => {
        try {
            await api.post(API_ENDPOINTS.LOGOUT);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error logging out', error);
            throw error;
        }
    },
    
   
};

export default authService;
