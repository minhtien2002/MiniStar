import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Select, Row, Col, message } from 'antd';
import { UserSummary } from './UserSummary';

interface EditUserDrawerProps {
  visible: boolean;
  user: UserSummary | null;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserSummary) => void;
}

const EditUserDrawer: React.FC<EditUserDrawerProps> = ({
  visible,
  user,
  onClose,
  onUpdateUser,
}) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = { ...user, ...values };
      onUpdateUser(updatedUser); // Gửi dữ liệu cập nhật tới parent
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  if (!user) return null;  // Nếu không có user, không render gì

  return (
    <Drawer
      title="Edit User"
      visible={visible}
      onClose={onClose}
      width={720}
      footer={
        <Button type="primary" onClick={handleSave}>
          Update
        </Button>
      }
    >
      <Form form={form} layout="vertical" initialValues={user}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="FullName" label="Full Name" rules={[{ required: true }]}>
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
              <Select placeholder="Gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="Username" label="Username" rules={[{ required: true }]}>
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="PhoneNumber" label="Phone Number" rules={[{ required: true }]}>
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;
