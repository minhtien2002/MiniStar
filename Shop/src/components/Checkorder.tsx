import React, { useState } from "react";

export const Checkorder = () => {
  const [isModalOpen, setIsModalOpen] = useState("hidden");
  const handleOnModal = () => {
    setIsModalOpen("block absolute w-full top-3 bg-gray-50");
  };
  const handleOffModal = () => {
    setIsModalOpen("hidden");
  };

  const orderInfo = {
    orderId: "123456789",
    customerName: "Hoàng Tuấn Anh",
    phoneNumber: "03366676757",
    address: "169 Đường số 15, Tân quy, Quận 7, TP. HCM",
    totalPrice: "$157",
    paymentMethod: "Cash On Delivery (COD)",
  };
  const timeline = [
    { time: "07:12", date: "12/10/2024", status: "Đặt hàng thành công" },
    { time: "17:12", date: "12/10/2024", status: "Đang giao hàng" },
    { time: "21:50", date: "13/10/2024", status: "Giao hàng thành công" },
  ];
  return (
    <div className=" bg-gray-50 w-10/12 m-auto relative ">
      <div className=" px-8 pt-5 flex  flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Track Your Order
        </h1>
        <p className="text-gray-500 mb-5">
          Enter your order tracking number and your secret id.
        </p>
      </div>

      <div className="  w-full mx-auto flex  px-8 pb-8">
        {/* Left Section: Title and Form */}
        <div className="w-full flex bg-white p-8 rounded-lg shadow-lg  ">
          <div className="w-2/3 ">
            <div className="mb-6">
              <label
                htmlFor="orderNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Order Tracking Number**
              </label>
              <input
                type="number"
                id="orderNumber"
                placeholder="Order Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Delivery Date*
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deliveryDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="absolute right-3 top-3"></div>
              </div>
            </div>

            <button onClick={handleOnModal} className="w-full p-6  bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold ">
              Track Now
            </button>
          </div>
          <div className=" flex justify-center items-center pb-5 ">
            <img
              src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/order.png"
              alt="Delivery Truck"
              className=" pl-10"
            />
          </div>
        </div>

        {/* Right Section: Image */}
      </div>
      {/* //Detailorder */}
      <div className={isModalOpen}>
     
        <div className="flex p-10 border  w-full  border-gray-300 rounded-md ">
          {/* Order Info */}
          <div className="w-2/3">
            <p>
              <strong>Id đơn hàng:</strong> {orderInfo.orderId}
            </p>
            <p>
              <strong>Tên khách hàng:</strong> {orderInfo.customerName}
            </p>
            <p>
              <strong>Phone Number:</strong> {orderInfo.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ nhận hàng:</strong> {orderInfo.address}
            </p>
            <p>
              <strong>Tổng Tiền:</strong> {orderInfo.totalPrice}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong> {orderInfo.paymentMethod}
            </p>
          </div>

          {/* Timeline */}
          <div className="w-1/2 border-l-2 border-gray-300 pl-6">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-center mb-6">
                <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                  <div
                    className={`w-3 h-3 ${
                      index === timeline.length - 1
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } rounded-full`}
                  ></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold">{event.time}</p>
                  <p className="text-sm">{event.date}</p>
                  <p className="text-sm">{event.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleOffModal}  className="w-full p-6  bg-red-500 hover:bg-red-400 text-white py-2 rounded-md font-semibold ">
              Close 
            </button>
      </div>
      {/* enddetail */}
    </div>
  );
};
