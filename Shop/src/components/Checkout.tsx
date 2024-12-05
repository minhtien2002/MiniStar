import React, { useState, useEffect } from 'react';
import { fetchCheckoutData } from './authUtils';
import { getUserId } from './authUtils'
import API_ENDPOINTS from "../apiConfig";

const Checkout = () => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const userId = getUserId();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Cập nhật state
  };

 useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        const data = await fetchCheckoutData(userId);
        setCheckoutData(data);
      } catch (error) {
        console.error('Failed to load checkout data:', error);
      }
    };

    loadCheckoutData();
  }, [userId]);
  const showAlert = () => {
    alert('Order Success... Press "OK" to return home   ');
  };
 if (!checkoutData) {
    return <div>Loading...</div>;
  }
 const handleCreateOrder = async () => {
    if (!selectedAddressId) {
      alert('Please select an address for delivery!');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.createOrder, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyerId: userId,
          addressId: selectedAddressId,
        }),
      });

      if (!response.ok) {
        console.log(userId);
        console.log(selectedAddressId);
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      alert('Order created successfully!');
      console.log('Order details:', data);

      // Optionally, redirect to order confirmation page or reset the cart
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 py-9">
      {/* Billing Details Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 pb-4">Billing Details</h2>
        <form className="space-y-4">
          <div className=" gap-4 pb-4">
            <div>
              <label className="block font-semibold">Full Name</label>
              <input disabled
                type="text"
                name="fullName"
                value=
                {checkoutData.fullName}
                
                className="w-full p-2 border border-gray-300 rounded"

              />
            </div>
          </div>
          <div className="grid grid-cols-2 pb-4 gap-4">
            <div>
              <label className="block font-semibold">Email</label>
              <input
              disabled
                type="email"
                name="email"
                value={checkoutData.email}
                
                className="w-full p-2 border border-gray-300 rounded"
               
              />
            </div>
            <div>
              <label className="block font-semibold">Phone Number</label>
              <input
              disabled
                type="text"
                name="phone"
                value={checkoutData.phoneNumber}
                
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="+880388**0899"
              />
            </div>
          </div> 
          <div className="pb-4">
            <label className="block font-semibold">Address*</label>
              <select
  name="Address"
  className="w-full p-2 border border-gray-300 rounded"
  onChange={(e) => setSelectedAddressId(e.target.value)} // Thêm onChange tại đây
>
  <option disabled selected hidden value="">
    Choose...
  </option>
  {checkoutData.addresses.map((address) => (
    <option value={address.addressId} key={address.addressId}>
      {address.street}, {address.city}, {address.state} ({address.addressType})
    </option>
  ))}
</select>
          </div> 
          <div className="grid grid-cols-3 gap-4">
            

            
            <div className="italic w-96 font-thin">
              **Fill in your information correctly
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="confirmInformatinon"
              id="confirmInformation"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="confirmInformation">Confirm information ?</label>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          
           {checkoutData.cartItems.map((item) => (
          <div className="flex justify-between">
            <div className=""key={item.cartItemId}>
              {item.productName}
              <span className="font-bold text-red-500"> x{item.quantity}</span>
            </div>
            <span>{(item.price*item.quantity).toFixed(3)}</span>
          </div>
            ))}
        </div>
        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-bold">Subtotal</span>
            <span className="font-bold">{(checkoutData.totalAmount).toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free Shipping</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{(checkoutData.totalAmount).toFixed(3)}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-6 space-y-4">
          <div>
            <input disabled
              type="radio"
              name="paymentMethod"
              id="bankTransfer"
              value="bankTransfer"
              
              className="mr-2"
            />
            <label htmlFor="bankTransfer">Direct Bank Transfer</label>
          </div>
          <div>
            <input checked 
              type="radio"
              name="paymentMethod"
              id="cashOnDelivery"
              value="cashOnDelivery"
              
              className="mr-2"
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
          <div>
            <input disabled
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="creditCard"
              
              className="mr-2"
            />
            <label htmlFor="creditCard">Credit/Debit Cards or Paypal</label>
          </div>
        </div>

        <a>
          <button
          onClick={handleCreateOrder}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded  hover:bg-green-700"
          >
            Place Order Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Checkout;
