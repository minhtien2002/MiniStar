import React, { useState } from "react";

const Cart: React.FC = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Fresh Red Tomatoes",
      price: 10,
      quantity: 1,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-3.webp",
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      price: 5,
      quantity: 1,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-1.webp",
    },
    {
      id: 3,
      name: "Fresh Watermelon",
      price: 30,
      quantity: 1,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-1.webp",
    },
    {
      id: 4,
      name: "Hot Spicy Steak",
      price: 20,
      quantity: 1,
      image:
        "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-1.webp",
    },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 m-6">
      <table className="w-full text-left">
        <thead className="bg-gray-100 border border-solid rounded">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            <th className="p-3 w-4 float-left">Quantity</th>
            <th className="p-3 ">Total</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr
              key={item.id}
              className=" border border-solid rounded h-20 hover:bg-[#f5faf5]"
            >
              <td className="py-4 px-8 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 p-1 h-14 mr-4 shadow border border-solid rounded "
                />
                <span className="pl-1 font-semibold">{item.name}</span>
              </td>
              <td className="p-3 font-semibold">${item.price.toFixed(2)}</td>
              <td className="p-2 ">
                <div className="flex items-center border border-solid rounded float-left">
                  <button
                    className="px-2 py-1"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2 w-4 text-center">{item.quantity}</span>
                  <button
                    className="px-2 py-1 "
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3  font-semibold w-40">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="p-6 ">
                <button
                  className="text-red-500   "
                  onClick={() => removeItem(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#EA3323"
                  >
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border border-solid  w-full   flex justify-end ">
        <span></span>
        <span className="font-bold m-4 px-7">Total Quantity: <span className="text-red-500">5</span> Item
          <br />Total Amouse: <span className="text-red-500">$10.00</span>
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-red-500 px-4 py-2 bg-gray-300 rounded font-bold">Clear Cart</button>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-300 rounded">Update Cart</button>
          <a href="checkout" className="px-4 py-2 bg-green-500 text-white rounded">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
