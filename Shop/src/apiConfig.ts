// apiConfig.ts

const API_BASE_URL = 'http://localhost:5179/api';

const API_ENDPOINTS = {
  getAllProduct: `${API_BASE_URL}/Product/GetAll`,
  getProductById: (id:number) => `${API_BASE_URL}/Product/GetById=${id}`,
  // getProductByCategory: (id:number) => `${API_BASE_URL}/Product/Category=${id}`,
  quantityAllProduct: `${API_BASE_URL}/Product/GetCount`, 
  login: `${API_BASE_URL}/User/login`,
  register: `${API_BASE_URL}/User/register`,
  getCartByUserId: (userId: number) => `${API_BASE_URL}/cart/${userId}`,
  updateCartItemQuantity: (cartItemId: number) => `${API_BASE_URL}/CartItem/${cartItemId}/quantity`,
  removeCartItem: (userId: number, cartItemId: number) =>`${API_BASE_URL}/cart/remove/${userId}/${cartItemId}`,
  clearCart: (userId: number) => `${API_BASE_URL}/Cart/clear/${userId}`,
  addToCart: (userId: number, productId: number, quantity: number) => `${API_BASE_URL}/Cart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`,
  createOrder: `${API_BASE_URL}/Order`,
  getOrdersByBuyerId: (buyerId) => `${API_BASE_URL}/Order/orders/${buyerId}`,
  getOrderDetails: (orderId) => `${API_BASE_URL}/Order/${orderId}`,
  checkout: (userId: number) => `${API_BASE_URL}/Order/checkout/${userId}`,




};

export default API_ENDPOINTS;
