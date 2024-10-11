// apiConfig.ts

const API_BASE_URL = 'http://localhost:5034/api';

const API_ENDPOINTS = {
  getAllProduct: `${API_BASE_URL}/Product/AllProduct`,
  getProductById: (id:number) => `${API_BASE_URL}/Product/Product=${id}`,
  getProductByCategory: (id:number) => `${API_BASE_URL}/Product/Category=${id}`,
};

export default API_ENDPOINTS;
