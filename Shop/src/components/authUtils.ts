// authUtils.ts
import Cookies from 'js-cookie';

// Hàm lấy userId từ cookie
export const getUserId = (): string | null => {
  const userId = Cookies.get('userId');  // Lấy userId từ cookie
  if (!userId) {
    throw new Error('UserId is not available in cookies');
  }
  return userId;
};
const addToCart = async (productId: number, quantity: number) => {
  try {
    const userId = getUserId(); // Lấy userId từ token hoặc context
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    const url = API_ENDPOINTS.addToCart(userId, productId, quantity);

    const response = await fetch(url, {
      method: 'POST',
    });

    if (response.ok) {
      console.log("Product added to cart successfully");
    } else {
      const error = await response.text();
      console.error("Failed to add product to cart:", error);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
const fetchOrders = async () => {
    try {
        const userId = getUserId(); // Lấy userId từ token
        if (!userId) {
            console.error("User not logged in");
            return;
        }

        const response = await fetch(API_ENDPOINTS.getOrdersByBuyerId(userId), {
            method: 'GET',
        });

        if (response.ok) {
            const orders = await response.json();
            console.log("Fetched orders:", orders);
            setOrders(orders); // Giả sử có state `setOrders`
        } else {
            const error = await response.text();
            console.error("Failed to fetch orders:", error);
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};




