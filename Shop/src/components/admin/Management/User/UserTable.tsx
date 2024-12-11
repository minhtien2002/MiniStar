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

interface UserSummary {
  UserId: number;
  FullName: string;
  Username: string;
  Email: string;
  RoleName: string;
  PhoneNumber: string;
  Gender: string;
}

export const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<UserSummary[]>([]);

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    try {
    } catch (error) {
      message.error("delete failure from backend");
    }
    message.success("Deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const [UserData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.getAllUsers);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
  const handleLayoutDetailOn = () => {
    setLayoutDetail("block");
  };

  const handleLayoutDetailOff = () => {
    setLayoutDetail("hidden");
    setUser(null); // Xóa dữ liệu user khi đóng popup
  };

  const fetchUserById = async (userId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.getUserById(userId)}`); // Sửa endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUser(data); // Lưu dữ liệu user vào state
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (userId: number) => {
    await fetchUserById(userId);
    handleLayoutDetailOn(); // Hiển thị popup sau khi có dữ liệu
  };

  const handleDeleteUser = async (userId: number) => {
    setLoading(true); // Hiển thị trạng thái tải
    try {
      const response = await fetch(`${API_ENDPOINTS.deleteUser(userId)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Cập nhật danh sách user sau khi xóa thành công
      setUsers((users) => users.filter((user) => user.UserId !== userId));
      fetchUsers();
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user");
    } finally {
      setLoading(false); // Tắt trạng thái tải
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-4 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-4">Danh sách User</h1>
        <div className="w-full flex justify-between">
          <div className="flex w-[25%] rounded-lg ">
            <Form.Item className="cursor-pointer float-right hover:text-blue-600 text-center w-48 m-0 mr-2">
              <Select
                placeholder="Please select a Gender"
                // onChange={(e) => {
                //   setProduct({ ...product, categoryId: e as number });
                // }}
              >
                <Select.Option key="" value="">
                  --None--
                </Select.Option>

                <Select.Option>Male</Select.Option>
                <Select.Option>Female</Select.Option>
                <Select.Option>Other</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" className="rounded">
              Apply
            </Button>
          </div>
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email (@gmail.com)
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>

              <th className=" px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>

              <th className="px-4 py-3 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {UserData.map((user) => (
              <tr key={user.UserId}>
                <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.roleName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.phoneNumber}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.roleName}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium flex flex-col justify-center items-center">
                  {/* <EditProduct initialProduct={product} />
                  <DeleteProduct data={product.productId} />
                  <DetailProduct product={product} /> */}
                  {/* edit user */}
                  <>
                    <div>
                      <button
                        onClick={showDrawer}
                        className="text-blue-600 hover:text-blue-900"
                      ></button>
                    </div>
                    {open && (
                      <Drawer
                        title="Edit User"
                        width={720}
                        onClose={onClose}
                        open={open}
                        styles={{
                          body: {
                            paddingBottom: 80,
                          },
                        }}
                        extra={
                          <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary">Update</Button>
                          </Space>
                        }
                      >
                        <Form layout="vertical" hideRequiredMark>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                name="fullname"
                                label="Full Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter full name",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  placeholder="Please enter user name"
                                  defaultValue={user.FullName}
                                  required
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                name="Gender"
                                label="Gender"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please plese Gender",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Please select your Gender"
                                  defaultValue={user.Gender}
                                >
                                  <option value="">Male</option>
                                  <option value="">Female</option>
                                  <option value="">Other</option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Form.Item
                                name="Role"
                                label="Role"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please set role",
                                  },
                                ]}
                              >
                                <Select defaultValue={user.Role}>
                                  <option value="">Staff</option>
                                  <option value="">Admin</option>
                                  <option value="">Other</option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                name="username"
                                label="User Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter user name",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  placeholder="Please enter user name"
                                  defaultValue={user.Username}
                                  required
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name="password"
                                label="Pass Word"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter password",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  placeholder="Please enter password"
                                  defaultValue={user.Password}
                                  required
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Email",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  placeholder="Please enter your Email"
                                  defaultValue={user.Email}
                                  required
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name="PhoneNumbber"
                                label="Phone Number"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter phone number",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  placeholder="Please enter phone number"
                                  defaultValue={user.PhoneNumber}
                                  required
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={24}>
                              <Form.Item
                                name="Adress"
                                label="Adress"
                                rules={[
                                  {
                                    required: true,
                                    message: "please enter url description",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  defaultValue={user.Adress}
                                  rows={4}
                                  placeholder="Please enter url description"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Drawer>
                    )}
                  </>
                  {/* end edit user */}
                  {/* Edit user  */}
                  <Popconfirm
                    title="Delete user?"
                    description="Are you sure you want to delete this user?"
                    onConfirm={() => handleDeleteUser(user.userId)} // Xử lý xóa khi xác nhận
                    onCancel={() => message.info("Delete action canceled")} // Tùy chọn xử lý khi hủy
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger className="border-none p-0 m-0 font-medium">
                      Delete
                    </Button>
                  </Popconfirm>
                  {/* End edit user */}
                  {/* Detail user */}
                  <>
                    <div className="relative">
                      <button
                        onClick={() => handleViewDetails(user.userId)}
                        className="text-blue-600 hover:text-blue-900 p-0 m-0 "
                      >
                        Detail
                      </button>
                    </div>
                    <div className={layoutdetail}>
                      <div className="flex  justify-center w-[40%] z-50  m-auto border rounded-sm bg-slate-200 top-14 left-[30%] p-5 pt-16 absolute whitespace-normal">
                        <button
                          className="absolute right-4 top-3 cursor-pointer bg-red-400 py-2 px-3 rounded-2xl"
                          onClick={handleLayoutDetailOff}
                        >
                          X
                        </button>
                        <div className="w-full pl-10 relative   ">
                          <p className="text-sm text-green-500 ">
                            UserID: {user.userId}
                          </p>
                          <div className="flex items-center space-x-3 my-2">
                            <span className="text-sm font-bold text-red-500">
                              Role: {user.roleName}
                            </span>
                          </div>
                          <h1 className="text-3xl font-bold my-2">
                            {user.fullName}
                          </h1>
                          {/* Availability */}
                          <div className="bg-green-50 w-[75%]  py-1 px-3 rounded-xl">
                            <p className="text-black font-medium my-2">
                              <span> User Name: </span>
                              <span className="font-bold text-green-500">
                                {user.username}
                              </span>
                              <br />
                              <span> Password: </span>
                              <span className="font-bold text-green-500">
                                *********
                              </span>
                            </p>
                          </div>

                          <p className="text-gray-600 my-3 ">
                            Email:{" "}
                            <span className="text-gray-800 font-medium">
                              {user.email}
                            </span>
                          </p>

                          {/* Quantity and Buttons */}
                          <div className="flex items-center space-x-3 mt-4"></div>

                          {/* Category and Tags */}
                          <div className="">
                            <p className="text-gray-600 pb-3">
                              Gender:{" "}
                              <span className="text-gray-800 font-medium">
                                {user.gender}
                              </span>
                            </p>
                            <p className="text-gray-600 pb-3">
                              Phone Number:{" "}
                              <span className="text-gray-800 font-medium">
                                {user.phoneNumber}
                              </span>
                            </p>

                            <p className="text-gray-600 pb-3">
                              Create time:
                              <span className="text-gray-800 font-medium">
                                {" "}
                                {user.createdAt}
                              </span>
                            </p>
                          </div>

                          {/* Report and Share */}
                          <div className="flex space-x-1 my-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#EA3323"
                            >
                              <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
                            </svg>
                            <a href="" className="text-red-600 text-sm">
                              Report This Item
                            </a>
                          </div>
                        </div>
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
