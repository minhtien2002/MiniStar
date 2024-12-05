import { Button, Drawer } from "antd";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  API_ENDPOINTS  from '../apiConfig';

export const Checkorder = () => {
  const [open, setOpen] = useState(false);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

   useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getOrderDetails(orderId));
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-50 w-10/12 m-auto relative pb-60">
     <div>
    
     <div className="  w-full mx-auto flex  px-8 pb-8">
        {/* Left Section: Title and Form */}
        <div className="w-full flex bg-white p-8 rounded-lg shadow-lg  ">

        </div>

        {/* Right Section: Image */}
      </div>
      {/* //Detailorder */}
      <div className="block absolute w-full top-3 bg-gray-50">
        <div className="flex p-10 border  w-full  border-gray-300 rounded-md ">
          {/* Order Info */}
          <div>
            <div className="w-2/3">
              <p>
                <strong>Id đơn hàng:</strong> {orderDetails.orderId}              </p>
              <p>
                <strong>Tên khách hàng:</strong> {orderDetails.buyerName}
              </p>
              <p>
                <strong>Phone Number:</strong> {orderDetails.phoneNumber}
              </p>
              <p>
                <strong>Địa chỉ nhận hàng:</strong> {orderDetails.shippingAddress}
              </p>
              <p>
                <strong>Tổng Tiền:</strong> {orderDetails.totalAmount.toFixed(3)}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{" "}
                {orderDetails.paymentMethod}
              </p>
            </div>
            <br />{" "}
            <div>
              <Button className="" type="primary" onClick={showDrawer}>
                Xem đơn hàng đã đặt
              </Button>
              <div>
                <Drawer
                  width={600}
                  title="Đơn hàng đã đặt"
                  onClose={onClose}
                  open={open}
                >
                  <table className="min-w-full mt-4">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Tên sản phẩm
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Số Lượng
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Đơn Giá
                        </th>
                      </tr>
                    </thead>
<tbody className="bg-white divide-y divide-gray-200">
{orderDetails.orderItems.map((item, index) => (
                      <tr  key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.price.toFixed(3)}
                        </td>
                      </tr>
                       ))}
                    </tbody>

                  </table>
                </Drawer>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="w-1/2 border-l-2 border-gray-300 pl-6">
           {/* Status: Pending */}
  <div className={`flex items-center mb-6 ${orderDetails.orderStatus === "pending" || orderDetails.orderStatus === "completed" || orderDetails.orderStatus === "shipped" ? '' : 'opacity-50'}`}>
    <div className="ml-4">
      <p className="text-sm font-semibold">Pending</p>
      <p className="text-sm">{new Date(orderDetails.createdAt).toLocaleTimeString()} Ngày {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
      <p className="text-sm">Status: Pending</p>
    </div>
  </div>
                <div className={`flex items-center mb-6 ${["completed", "shipped"].includes(orderDetails.orderStatus) ? '' : 'opacity-50'}`}>
    <div className="ml-4">
      <p className="text-sm font-semibold">Completed</p>
      <p className="text-sm">
        {orderDetails.orderStatus === "completed" || orderDetails.orderStatus === "shipped" 
          ? (orderDetails.updatedAt 
              ? `${new Date(orderDetails.updatedAt).toLocaleTimeString()} Ngày ${new Date(orderDetails.updatedAt).toLocaleDateString()}`
              : "Date not available") 
          : "Date pending..."}
      </p>
      <p className="text-sm">Status: {orderDetails.orderStatus === "completed" || orderDetails.orderStatus === "shipped" ? "Completed" : "Not yet completed"}</p>
    </div>
  </div>
                 {/* Status: Shipped */}
  <div className={`flex items-center mb-6 ${orderDetails.orderStatus === "shipped" ? '' : 'opacity-50'}`}>
    <div className="ml-4">
      <p className="text-sm font-semibold">Shipped</p>
      <p className="text-sm">
        {orderDetails.orderStatus === "shipped" 
          ? (orderDetails.updatedAt 
              ? `${new Date(orderDetails.updatedAt).toLocaleTimeString()} Ngày ${new Date(orderDetails.updatedAt).toLocaleDateString()}`
              : "Date not available") 
          : "Date pending..."}
      </p>
      <p className="text-sm">Status: {orderDetails.orderStatus === "shipped" ? "Shipped" : "Not yet shipped"}</p>
    </div>
  </div>

           
          </div>
          <div className=" flex justify-center items-center pb-5 border-l-0 ">
            <img
              src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/order.png"
              alt="Delivery Truck"
              className=" pl-10"
            />
          </div>
        </div>
      </div>
     </div>
      
      {/* enddetail */}
    </div>
  );
};
