import React, { useState, useEffect } from "react";
import CallApi from "../share/CallApi"; 
import API_ENDPOINTS from "../apiConfig";
import { getUserId } from './authUtils';
import Cookies from 'js-cookie';
import { Button, message, Popconfirm } from "antd";





const Cart: React.FC = () => {
   const userId = getUserId();  
   const [cart, setCart] = useState<any>(null);
   const [loading, setLoading] = useState<boolean>(true);
   

const handleDataReceive = (data: any) => {
  setCart(data); 
  setLoading(false); 
};

if (!userId) {
  return <div>Please log in to view your cart.</div>;
}
const urlOfApi = API_ENDPOINTS.getCartByUserId(userId); // Sử dụng API config bạn đã tạo

useEffect(() => {
    const fetchCart = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.getCartByUserId(userId), {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });

            if (!response.ok) {
                message.error('Failed to fetch cart:', await response.text());
                setCart({ cartItems: [] }); // Nếu thất bại, đảm bảo `cartItems` là mảng rỗng
                return;
            }

            const data = await response.json();

            if (data && Array.isArray(data.cartItems)) {
                setCart(data);
            } else {
                message.error('Invalid cart data format:', data);
                setCart({ cartItems: [] });
            }
        } catch (error) {
            message.error('Error fetching cart:', error);
            setCart({ cartItems: [] });
        }
    };

    fetchCart();
}, [urlOfApi]); 
const updateQuantity = async (cartItemId: number, delta: number) => {
    try {
        const response = await fetch(API_ENDPOINTS.updateCartItemQuantity(cartItemId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({ delta }),
        });

        if (!response.ok) {
            message.error('Failed to update quantity:', await response.text());
            return;
        }

        // Cập nhật `cart.cartItems` sau khi thành công
        setCart((prevCart: any) => {
            if (!prevCart || !Array.isArray(prevCart.cartItems)) return prevCart;

            return {
                ...prevCart,
                cartItems: prevCart.cartItems.map((item: any) =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                ),
            };
        });

        message.success('Quantity updated successfully');
    } catch (error) {
        message.error('Error updating quantity:', error);
    }
};
const removeCartItem = async (cartItemId: number) => {
    try {
        const response = await fetch(API_ENDPOINTS.removeCartItem(userId, cartItemId),
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );

        if (!response.ok) {
            message.info('Removing cart item:', { userId, cartItemId });

            message.error('Failed to remove cart item:', await response.text());
            return;
        }

        // Cập nhật lại giỏ hàng sau khi xóa thành công
        setCart((prevCart: any) => {
            if (!prevCart || !Array.isArray(prevCart.cartItems)) return prevCart;

            return {
                ...prevCart,
                cartItems: prevCart.cartItems.filter(
                    (item: any) => item.cartItemId !== cartItemId
                ),
            };
        });

        message.info('Item removed successfully');
    } catch (error) {
        message.error('Error removing cart item:', error);
    }
};

const clearCart = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.clearCart(userId), {
      method: 'DELETE',
    });

    if (response.ok) {
      // Cập nhật trạng thái cart trong state sau khi clear
      setCart({ cartItems: [] }); // Hoặc cập nhật theo cấu trúc state của bạn
      message.info('Cart cleared successfully');
    } else {
      message.error('Failed to clear cart:', await response.text());
    }
  } catch (error) {
    message.error('Error clearing cart:', error);
  }
};
const handleCheckOut = async () => {
   message.error('Your cart have nothing');
};
  return (
  <div className="p-4 m-6">
    <table className="w-full text-left">
      <thead className="bg-gray-100 border border-solid rounded">
        <tr>
          <th className="p-3">Product</th>
          <th className="p-3">Price</th>
          <th className="p-3 w-4 float-left">Quantity</th>
          <th className="p-3">Total</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {cart && cart.cartItems.length > 0 ? (
          cart.cartItems.map((item: any) => (
            <tr
              key={item.cartItemId}
              className="border border-solid rounded h-20 hover:bg-[#f5faf5]"
            >
              <td className="py-4 px-8 flex items-center">
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  className="w-16 p-1 h-14 mr-4 shadow border border-solid rounded"
                />
                <span className="pl-1 font-semibold">{item.productName}</span>
              </td>
              <td className="p-3 font-semibold">${item.price.toFixed(2)}</td>
              <td className="p-2">
                <div className="flex items-center border border-solid rounded float-left">
                  <button
                    className="px-2 py-1"
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2 w-4 text-center">{item.quantity}</span>
                  <button
                    className="px-2 py-1"
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3 font-semibold w-40">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="p-6">
                <button
                  className="text-red-500"
                  onClick={() => removeCartItem(item.cartItemId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#EA3323"
                  >
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5-156T763-197q-54-54-127-85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center p-4">
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <div className="border border-solid w-full flex justify-end">
      <span className="font-bold m-4 px-7">
        Total Quantity: <span className="text-red-500">{cart && cart.cartItems.length}</span> Items
        <br />
        Total Amount: <span className="text-red-500">
          ${cart && cart.cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </span>
    </div>
    <div className="flex justify-between items-center mt-4">
     
     
      
    {cart && cart.cartItems && cart.cartItems.length > 0 ? (

      <button onClick={clearCart} className="text-red-500 px-4 py-2 bg-gray-300 rounded font-bold">
        Clear Cart
      </button> 
 ) : (
      <button onClick={handleCheckOut} className="text-red-500 px-4 py-2 bg-gray-300 rounded font-bold">
        Clear Cart
      </button>
      
      )}
 {cart && cart.cartItems && cart.cartItems.length > 0 ? (

      <div className="flex space-x-4">
        <a href="/Checkout" className="px-4 py-2 bg-green-500 text-white rounded">Proceed to Checkout</a>
      </div>
      ) : (
      <div className="flex space-x-4">
        <button onClick={handleCheckOut} className="px-4 py-2 bg-green-500 text-white rounded">Proceed to Checkout</button>
      </div>
       )}
    </div>
   
  </div>
);

};

export default Cart;
