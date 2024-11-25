// apiConfig.ts

const API_BASE_URL = 'http://localhost:5179/api';

const API_ENDPOINTS = {
  getAllProduct: `${API_BASE_URL}/Product/GetAll`,
  getProductById: (id:number) => `${API_BASE_URL}/Product/GetById=${id}`,
  // getProductByCategory: (id:number) => `${API_BASE_URL}/Product/Category=${id}`,
  quantityAllProduct: `${API_BASE_URL}/Product/GetCount`, 
  login: `${API_BASE_URL}/User/login`,
  register: `${API_BASE_URL}/User/register`,
};

export default API_ENDPOINTS;
