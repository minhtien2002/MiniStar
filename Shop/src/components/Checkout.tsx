
import React, { useState } from 'react';

const Checkout = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Cập nhật state
  };

  const showAlert = () => {
    alert('Order Success... Press "OK" to return home   ');
  };

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    // confirmInformatinon: false,
    paymentMethod: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 py-9">
      {/* Billing Details Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Billing Details</h2>
        <form className="space-y-4">
          <div className=" gap-4">
            <div>
              <label className="block font-semibold">Full Name*</label>
              <input 
                type="text" 
                name="firstName"
                value={form.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Full Name"
              />
            </div>
            
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Email*</label>
              <input 
                type="email" 
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="user@gmail.com"
              />
            </div>
            <div>
              <label className="block font-semibold">Phone*</label>
              <input 
                type="text" 
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="+880388**0899"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Address*</label>
            <input 
              type="text" 
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Enter your Address"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold">City*</label>
            <select 
              name="city"
              value={form.city}
              
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose...</option>
              <option value="HCM">Hồ Chí Minh City</option>
              <option value="HN">Hà Nội</option>
              <option value="DN">Đà Nẵng</option>
              {/* Add more countries */}
            </select>
          </div>
          
          
            <div>
              <label className="block font-semibold">District*</label>
              {/* <input 
                type="text" 
                name="district"
                value={form.district}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Gò Vấp"
              /> */}
              <select 
              name="city"
              value={form.city}
              
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose...</option>
              <option value="">Đống Đa</option>
              <option value="">Cầu Giấy</option>
              <option value="">Mỹ Đình</option>
              <option value="">Gò Vấp</option>
              <option value="">Thủ Đức</option>
              {/* Add more  District*/}
            </select>
            </div>
            <div>
              <label className="block font-semibold">Ward*</label>
              {/* <input 
                type="text" 
                name="ward"
                value={form.ward}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Tân Hưng"
              /> */}
              <select 
              name="ward"
              value={form.ward}
              
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose...</option>
              <option value="">P. Tân Hưng</option>
              <option value="">Phường 13</option>
              <option value="">P. Nguyễn Thái Bình</option>
              {/* Add more  District*/}
            </select>
            </div>
            <div className='italic w-96 font-thin' >**Fill in your information correctly</div>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="confirmInformation"
              id='confirmInformation'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor='confirmInformation'>Confirm information ?</label>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className=''>Apple Watch <span className='font-bold text-red-500'>x1</span></div> 
            <span>$38</span>
          </div>
          <div className="flex justify-between">
            <div className=''>Beats Wireless <span className='font-bold text-red-500'>x1</span> </div> 
            <span>$48</span>
          </div>
          <div className="flex justify-between">
            <div className=''>Samsung Galaxy S10 <span className='font-bold text-red-500'>x2</span></div> 
            <span>$279</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className='font-bold'>Subtotal</span>
            <span className='font-bold'>$365</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free Shipping</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>$365</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-6 space-y-4">
          <div>
            <input 
              type="radio" 
              name="paymentMethod"
              id='bankTransfer'
              value="bankTransfer"
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor='bankTransfer'>Direct Bank Transfer</label>
          </div>
          <div>
            <input 
              type="radio" 
              name="paymentMethod" 
              id='cashOnDelivery'
              value="cashOnDelivery"
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor='cashOnDelivery'>Cash on Delivery</label>
          </div>
          <div>
            <input 
              type="radio" 
              name="paymentMethod" 
              id='creditCard'
              value="creditCard"
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor='creditCard'>Credit/Debit Cards or Paypal</label>
          </div>
        </div>

        <a  href="/"><button onClick={showAlert} disabled={!isChecked} className="mt-6 w-full bg-green-500 text-white py-2 rounded  hover:bg-green-700">Place Order Now</button></a>
      </div>
    </div>
  );
};

export default Checkout;

