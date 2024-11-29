import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  message,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import CallApi from "../../../../share/CallApi";
import API_ENDPOINTS from "../../../../apiConfig";

const pathBrand = API_ENDPOINTS.getAllBrand;
const pathCategory = API_ENDPOINTS.getAllCategory;

interface Categories {
  categoryId: number;
  categoryName: string;
  createAt: Date;
  updateAt: Date;
  isDelete: boolean;
}

interface Brands {
  brandId: number;
  brandName: string;
  createAt: Date;
  updateAt: Date;
  isDelete: boolean;
}

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const { Option } = Select;

export const AddProduct: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = React.useState([] as Categories[]); // Khởi tạo state categories
  const [brands, setBrands] = React.useState([] as Brands[]); // Khởi tạo state brands

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleApiCategory = (data: any) => {
    setCategories(data);
  };

  const handleApiBand = (data: any) => {
    setBrands(data);
  };

  // const onChange: InputNumberProps["onChange"] = (value) => {
  //   console.log("changed", value);
  // };

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New Product
      </Button>
      <Drawer
        title="Create a new product"
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
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber<number>
                  defaultValue={0}
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  // onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <InputNumber<number>
                  defaultValue={100}
                  style={{ width: "100%" }}
                  min={1}
                  max={500}
                  // onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a Category" },
                ]}
              >
                <CallApi
                  onDataReceive={handleApiCategory}
                  urlOfApi={pathCategory}
                />
                <Select placeholder="Please select a Category">
                  {categories.map((items: any) => (
                    <Option value={items.categoryId}>
                      {items.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Brand"
                label="Brand"
                rules={[{ required: true, message: "Please choose a Brand" }]}
              >
                <CallApi onDataReceive={handleApiBand} urlOfApi={pathBrand} />
                <Select placeholder="Please choose a Brand">
                  {brands.map((items: any) => (
                    <Option value={items.brandId}>{items.brandName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Image"
                label="Image"
                
                rules={[
                  { required: true, message: "Please choose the Create" },
                ]}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />} >Upload image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="show/hide"
                label="Show/Hide in website"
                // rules={[{ required: false, message: "Please enter isDelete" }]}
              >
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
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
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
