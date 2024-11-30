import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constants";

const productService = {
    getAll: async (filter = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCT, { params: filter });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.PRODUCT}/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    create: async (productData) => {
        try {
            const response = await api.post(API_ENDPOINTS.PRODUCT, productData);
            console.log('product created:', response);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    update: async (id, productData) => {
        try {
            const response = await api.put(`${API_ENDPOINTS.PRODUCT}/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`${API_ENDPOINTS.PRODUCT}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    getCount: async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.PRODUCT}/get/count`);
            return response;
        } catch (error) {
            console.error('Error fetching product count:', error);
            throw error;
        }
    },

    getFeatured: async (count) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.PRODUCT}/get/featured/${count}`);
            return response;
        } catch (error) {
            console.error('Error fetching featured products:', error);
            throw error;
        }
    },

    updateGalleryImages: async (id, images) => {
        try {
            const formData = new FormData();
            images.forEach(image => formData.append('images', image));
            const response = await api.put(`/products/gallery-images/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating product gallery images:', error);
            throw error;
        }
    },
};

export default productService;
