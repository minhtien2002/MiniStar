// apiConfig.ts

const API_BASE_URL = 'http://localhost:5179/api';

const API_ENDPOINTS = {
  getAllProduct: `${API_BASE_URL}/Product/GetAll`,
  getProductById: (id:number) => `${API_BASE_URL}/Product/GetById=${id}`,
  // getProductByCategory: (id:number) => `${API_BASE_URL}/Product/Category=${id}`,
  quantityAllProduct: `${API_BASE_URL}/Product/GetCount`, 
  login: `${API_BASE_URL}/User/login`,
  register: `${API_BASE_URL}/User/register`,
  getAllCategory: `${API_BASE_URL}/Category/GetAll`,
  getAllBrand: `${API_BASE_URL}/Brand/GetAll`,
  CreateProduct: `${API_BASE_URL}/Product/Create`,
  UpdateProduct: `${API_BASE_URL}/Product/Edit`,
  DeleteProduct: (id:number) => `${API_BASE_URL}/Product/DeleteById=${id}`,
};

export default API_ENDPOINTS;
