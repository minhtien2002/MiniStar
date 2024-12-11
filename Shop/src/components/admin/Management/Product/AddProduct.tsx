import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Dropdown,
 
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
import CallApi from "../../../../share/Fetch/CallApi";
import API_ENDPOINTS from "../../../../apiConfig";
import Product from "../../../../share/Product";
import MakeRequest from "../../../../share/Fetch/MakeRequest";



const pathBrand = API_ENDPOINTS.getAllBrand;
const pathCategory = API_ENDPOINTS.getAllCategory;
const pathCreateProduct = API_ENDPOINTS.CreateProduct;

interface ProductData {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  isDeleted: boolean;
  categoryId: number;
  brandId: number;
}

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

const InitialProduct: ProductData = {
  productId: 0,
  productName: "",
  description: "",
  price: 0,
  quantity: 0,
  productImage: "",
  isDeleted: false,
  categoryId: 0,
  brandId: 0,
};

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
  const [product, setProduct] = React.useState<ProductData>(
    InitialProduct as ProductData
  );

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

  const addProduct = async () => {
    setProduct({ ...product });
    console.log(product);
    try {
      await MakeRequest(pathCreateProduct, "POST", product);
    } catch (error) {
      return message.error("Create product fail");
    }
    // setOpen(false);
    message.success("Create product success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Button
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
          className="w-32"
        >
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
            <Button onClick={addProduct} type="primary">
              Create
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
                <Input
                  type="text"
                  placeholder="Please enter user name"
                  value={product.productName}
                  onChange={(e) => {
                    setProduct({ ...product, productName: e.target.value });
                  }}
                  required
                />
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
                  value={product.price}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  onChange={(value) => {
                    setProduct({
                      ...product,
                      price: value as unknown as number,
                    });
                  }}
                  required
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
                  defaultValue={0}
                  style={{ width: "100%" }}
                  min={1}
                  max={500}
                  value={product.quantity}
                  onChange={(value) => {
                    setProduct({
                      ...product,
                      quantity: value as unknown as number,
                    });
                  }}
                  required
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
                <Select
                  placeholder="Please select a Category"
                  onChange={(e) => {
                    setProduct({ ...product, categoryId: e as number });
                  }}
                >
                  {categories.map((items: any) => (
                    <Option key={items.categoryId} value={items.categoryId}>
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
                <Select
                  placeholder="Please choose a Brand"
                  onChange={(e) => {
                    setProduct({ ...product, brandId: e as number });
                  }}
                >
                  {brands.map((items: any) => (
                    <Option key={items.brandId} value={items.brandId}>
                      {items.brandName}
                    </Option>
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
                <Upload
                  {...props}
                  onChange={(e) => {
                    setProduct({ ...product, productImage: e.file.name });
                  }}
                  onRemove={() => {
                    setProduct({ ...product, productImage: "" });
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="show/hide"
                label="Show/Hide in website"
                // rules={[{ required: false, message: "Please enter isDelete" }]}
              >
                <Checkbox
                  onChange={(e) => {
                    setProduct({ ...product, isDeleted: e.target.checked });
                  }}
                >
                  Checkbox
                </Checkbox>
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
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
