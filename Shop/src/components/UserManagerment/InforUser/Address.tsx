import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Form, Input, Space, Drawer, message, Select } from 'antd';
import API_ENDPOINTS from '../../../services/apiConfig';
import Cookies from 'js-cookie';



  // Hiển thị Drawer
export const Address = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const userId = Cookies.get("userId");
  const { Option } = Select;



  // Hiển thị Drawer
  const showDrawer = () => {
    setOpen(true);
  };

  // Đóng Drawer
  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  // Fetch danh sách địa chỉ từ API
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.getAddresses(userId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch addresses');
      
      const data = await response.json();
      setAddresses(data); // Cập nhật danh sách địa chỉ
    } catch (error) {
      message.error('Failed to load addresses');
    }
    setLoading(false);
  };

  // Thêm địa chỉ mới
  const handleAddAddress = async (values) => {
    setLoading(true);
    try {
      const addressData = {
        street: values.street,
        city: values.city,
        state: values.state,
        addressType: values.addressType,
      };

      const response = await fetch(`${API_ENDPOINTS.addAddress(userId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) throw new Error('Failed to add address');

      message.success('Address added successfully');
      onClose();
      fetchAddresses(); // Load lại danh sách địa chỉ sau khi thêm
    } catch (error) {
      message.error('Failed to add address');
    }
    setLoading(false);
  };

  // Xoá địa chỉ
  const handleDeleteAddress = async (addressId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.deleteAddress(addressId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete address');
      
      message.success('Address deleted successfully');
      fetchAddresses(); // Load lại danh sách địa chỉ sau khi xoá
    } catch (error) {
      message.error('Failed to delete address');
    }
    setLoading(false);
  };

  // useEffect để fetch địa chỉ khi component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <div className="w-3/4 bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Address</h2>
          <Button
            type="primary"
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"

            icon={<PlusOutlined />}
            onClick={showDrawer}
          >
            Add New Address
          </Button>
        </div>

        {/* Displaying the Address List */}
        <div className="grid grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.addressId} className="border p-4 bg-gray-50">
              <h3 className="text-lg font-bold mb-2">{`Address-${address.addressId}`}</h3>
              <p><span className="font-semibold">Street:</span> {address.street}</p>
              <p><span className="font-semibold">City:</span> {address.city}</p>
              <p><span className="font-semibold">State:</span> {address.state}</p>
              <p><span className="font-semibold">Type:</span> {address.addressType}</p>
              <Button
                type="danger"
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                onClick={() => handleDeleteAddress(address.addressId)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer for adding a new address */}
      <Drawer
        title="Create a new address"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => form.submit()}
              type="primary"
              loading={loading}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddAddress}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="street"
                label="Street"
                rules={[{ required: true, message: 'Please enter the street' }]}
              >
                <Input placeholder="Street" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter the city' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: 'Please enter the state' }]}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="addressType"
                label="Address Type"
                rules={[{ required: true, message: 'Please select address type' }]}
              >
                <Select>
                  <Select.Option value="home">Home</Select.Option>
                  <Select.Option value="company">Company</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};