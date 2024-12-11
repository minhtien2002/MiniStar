import React, { FormEvent, useEffect, useState } from "react";
import API_ENDPOINTS from "../../../../services/apiConfig";

import {
  Drawer,
  theme,
  Modal,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Popconfirm,
  Select,
  Space,
  Switch,
  Upload,
  Col,
  DatePicker,
  InputNumber,
  InputNumberProps,
  Row,
  UploadProps,
} from "antd";
import { Cascader } from "antd";
import type {
  CascaderProps,
  CheckboxProps,
  GetProp,
  MenuProps,
  PopconfirmProps,
} from "antd";
import { create } from "domain";

interface OrderSummary {
  orderId: number;
  buyerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  totalMoney: number;
  createdAt: string;
  orderStatus: string;
}
export const IndexOrder = () => {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const confirm = (orderId) => async () => {
    try {
      // Gọi hàm handleDeleteOrder với orderId
      await handleDeleteOrder(orderId);

      // Hiển thị thông báo thành công
      message.success("Deleted successfully");

      // Reload lại trang sau khi xóa thành công
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error("Delete failure from backend");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.sumorder);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data: OrderSummary[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const cancel: PopconfirmProps["onCancel"] = () => {
    return false;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [layoutdetail, setLayoutDetail] = useState("hidden");
  const handleLayoutDetailOn = async (orderId: number) => {
    try {
      const response = await fetch(API_ENDPOINTS.getOrderDetails(orderId));
      if (!response.ok) throw new Error("Failed to fetch order details");
      const data = await response.json();
      setOrderDetails(data);
      setLayoutDetail("");
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  const handleLayoutDetailOff = () => {
    setLayoutDetail("hidden");
  };
  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.deleteOrder(orderId), {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      alert("Order deleted successfully.");
      // Remove the deleted order from the local state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete the order. Please try again.");
    }
  };
  return (
    <div className="relative">
      <div className="container mx-auto p-4 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-4">Danh sách Oder</h1>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID Order
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Tên Khách Hàng
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Delivery address
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Total Money
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Payment method
              </th>
              {/* <th className=" px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th> */}
              <th className="px-4 py-3 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.buyerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.deliveryAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.totalMoney.toLocaleString()} VND
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  order.PaymentMethod
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium flex justify-center items-center gap-2">
                  <Popconfirm
                    title="Delete Order?"
                    description="Are you sure to delete?"
                    onConfirm={confirm(order.orderId)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger className="border-none p-0 m-0 font-medium">
                      Delete
                    </Button>
                  </Popconfirm>
                  {/* End Delete user */}
                  {/* Detail user */}
                  <>
                    <div className="relative">
                      <button
                        onClick={() => {
                          handleLayoutDetailOn(order.orderId);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-0 m-0 "
                      >
                        Detail
                      </button>
                    </div>
                    <div className={layoutdetail}>
                      <div className="w-[60%] flex z-50  m-auto left-[15%] rounded-sm top-14 p-5 pt-16 absolute whitespace-normal">
                        <div>
                          {/* //Detailorder */}
                          <div className="block absolute w-full top-3 bg-gray-50">
                            <div className="flex p-10 border  border-gray-300 rounded-md ">
                              {/* Order Info */}
                              <div>
                                <div className="w-full pr-5">
                                  <button
                                    className="absolute right-4 top-3 cursor-pointer bg-red-400 py-2 px-3 rounded-2xl"
                                    onClick={handleLayoutDetailOff}
                                  >
                                    X
                                  </button>
                                  <p>
                                    <strong>Id đơn hàng:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.orderId
                                      : "Đang tải..."}{" "}
                                  </p>
                                  <p>
                                    <strong>Tên khách hàng:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.buyerName
                                      : "Đang tải..."}
                                  </p>
                                  <p>
                                    <strong>Phone Number:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.phoneNumber
                                      : "Đang tải..."}
                                  </p>
                                  <p>
                                    <strong>Địa chỉ nhận hàng:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.shippingAddress
                                      : "Đang tải..."}
                                  </p>
                                  <p>
                                    <strong>Tổng Tiền:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.totalAmount.toFixed(3)
                                      : "Đang tải..."}
                                  </p>
                                  <p>
                                    <strong>Phương thức thanh toán:</strong>{" "}
                                    {orderDetails
                                      ? orderDetails.paymentMethod
                                      : "Đang tải..."}
                                  </p>
                                </div>
                                <br />
                                <div>
                                  <Button
                                    className=""
                                    type="primary"
                                    onClick={showDrawer}
                                  >
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
                                          {orderDetails &&
                                          orderDetails.orderItems
                                            ? orderDetails.orderItems.map(
                                                (item, index) => (
                                                  <tr key={index}>
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
                                                )
                                              )
                                            : null}
                                        </tbody>
                                      </table>
                                    </Drawer>
                                  </div>
                                </div>
                              </div>

                              {/* Timeline */}
                              <div className="w-1/3 border-l-2 border-gray-300 pl-6">
                                {/* Status: Pending */}
                                <div
                                  className={`flex items-center mb-6 ${
                                    orderDetails?.orderStatus === "pending" ||
                                    orderDetails?.orderStatus === "completed" ||
                                    orderDetails?.orderStatus === "shipped"
                                      ? ""
                                      : "opacity-50"
                                  }`}
                                >
                                  <div className="ml-4">
                                    <p className="text-sm font-semibold">
                                      Pending
                                    </p>
                                    <p className="text-sm">
                                      {orderDetails
                                        ? new Date(
                                            orderDetails.createdAt
                                          ).toLocaleTimeString()
                                        : "Loading..."}{" "}
                                      Ngày{" "}
                                      {orderDetails
                                        ? new Date(
                                            orderDetails.createdAt
                                          ).toLocaleDateString()
                                        : "Loading..."}
                                    </p>
                                    <p className="text-sm">Status: Pending</p>
                                  </div>
                                </div>
                                <div
                                  className={`flex items-center mb-6 ${
                                    ["completed", "shipped"].includes(
                                      orderDetails?.orderStatus
                                    )
                                      ? ""
                                      : "opacity-50"
                                  }`}
                                >
                                  <div className="ml-4">
                                    <p className="text-sm font-semibold">
                                      Completed
                                    </p>
                                    <p className="text-sm">
                                      {orderDetails?.orderStatus ===
                                        "completed" ||
                                      orderDetails?.orderStatus === "shipped"
                                        ? orderDetails?.updatedAt
                                          ? `${new Date(
                                              orderDetails.updatedAt
                                            ).toLocaleTimeString()} Ngày ${new Date(
                                              orderDetails.updatedAt
                                            ).toLocaleDateString()}`
                                          : "Date not available"
                                        : "Date pending..."}
                                    </p>
                                    <p className="text-sm">
                                      Status:{" "}
                                      {orderDetails?.orderStatus ===
                                        "completed" ||
                                      orderDetails?.orderStatus === "shipped"
                                        ? "Completed"
                                        : "Not yet completed"}
                                    </p>
                                  </div>
                                </div>
                                {/* Status: Shipped */}
                                <div
                                  className={`flex items-center mb-6 ${
                                    orderDetails?.orderStatus === "shipped"
                                      ? ""
                                      : "opacity-50"
                                  }`}
                                >
                                  <div className="ml-4">
                                    <p className="text-sm font-semibold">
                                      Shipped
                                    </p>
                                    <p className="text-sm">
                                      {orderDetails?.orderStatus === "shipped"
                                        ? orderDetails?.updatedAt
                                          ? `${new Date(
                                              orderDetails.updatedAt
                                            ).toLocaleTimeString()} Ngày ${new Date(
                                              orderDetails.updatedAt
                                            ).toLocaleDateString()}`
                                          : "Date not available"
                                        : "Date pending..."}
                                    </p>
                                    <p className="text-sm">
                                      Status:{" "}
                                      {orderDetails?.orderStatus === "shipped"
                                        ? "Shipped"
                                        : "Not yet shipped"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* enddetail */}
                      </div>
                    </div>
                  </>
                  {/* end detail user */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
function pathDeleteProduct(data: any): string {
  throw new Error("Function not implemented.");
}
