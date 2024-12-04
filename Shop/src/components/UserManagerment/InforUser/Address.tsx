import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

export const Address = () => {
  
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Address Section */}
      <div className="w-3/4 bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Address</h2>
          <label className="flex items-center space-x-2">
            
          </label>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Address 01 */}
          <div className="border p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Address-01</h3>
            <p className="mb-1">
              <span className="font-semibold">Name:</span> Abdullah Al Mamun
            </p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> demoemail@gmail.com
            </p>
            <p className="mb-1">
              <span className="font-semibold">Phone:</span> 023 434 54354
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span> Haydarabad, Rord 34
            </p>
            <p className="mb-1">
              <span className="font-semibold">Zip:</span> 3454
            </p>
          </div>

          {/* Address 02 */}
          <div className="border p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Address-02</h3>
            <p className="mb-1">
              <span className="font-semibold">Name:</span> Sajjad
            </p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> demoemail@gmail.com
            </p>
            <p className="mb-1">
              <span className="font-semibold">Phone:</span> 023 434 54354
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span> Haydarabad, Rord 34
            </p>
            <p className="mb-1">
              <span className="font-semibold">Zip:</span> 3454
            </p>
          </div>
        </div>
        <Button className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add New Adress
      </Button>
      </div>
   
     
      <Drawer
        title="Create a new adress"
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
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PhoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your Phone' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please enter your Phone"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="Email"
                label="Email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input placeholder="Please enter your Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Adress"
                label="Adress"
                rules={[{ required: true, message: 'Please enter your Adress' }]}
              >
                <Input placeholder="Please enter your Adress" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    
    </>
  );
};
