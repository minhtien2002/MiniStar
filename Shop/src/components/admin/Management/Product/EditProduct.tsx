import React, { useState, useEffect } from "react";
import MakeRequest from "../../../../share/Fetch/MakeRequest";
import API_ENDPOINTS from "../../../../apiConfig";
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
import { UploadOutlined } from "@ant-design/icons";
import CallApi from "../../../../share/Fetch/CallApi";

const pathUpdateProduct = API_ENDPOINTS.UpdateProduct;
const pathBrand = API_ENDPOINTS.getAllBrand;
const pathCategory = API_ENDPOINTS.getAllCategory;

interface ProductData {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  createAt: string;
  updateAt: string;
  isDeleted: boolean;
  categories: Categories;
  brands: Brands;
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

interface DetailProductProps {
  initialProduct: ProductData;
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

const EditProduct: React.FC<DetailProductProps> = ({ initialProduct }) => {
  const [product, setProduct] = useState<ProductData>(
    initialProduct as ProductData
  );
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = React.useState([] as Categories[]); // Khởi tạo state categories
  const [brands, setBrands] = React.useState([] as Brands[]); // Khởi tạo state brands

  useEffect(() => {
    setProduct(initialProduct as ProductData);
    // console.log("initialProduct", product);
  }, [initialProduct]);

  const handleApiCategory = (data: any) => {
    setCategories(data);
  };

  const handleApiBand = (data: any) => {
    setBrands(data);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const confirm = async () => {
    setProduct({ ...product });
    const item = {
      productId: product.productId,
      productName: product.productName,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      productImage: product.productImage,
      isDeleted: product.isDeleted,
      categoryId: product.categories.categoryId,
      brandId: product.brands.brandId,
    };
    // console.log("item edit", item);
    try {
      await MakeRequest(pathUpdateProduct, "PUT", item);
    } catch (error) {
      message.error("Update failure from backend");
    }
    message.success("Updated successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div>
        <button
          onClick={showDrawer}
          className="text-blue-600 hover:text-blue-900"
        >
          Edit
        </button>
      </div>
      {open && (
        <Drawer
          title="Edit product"
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
              <Button onClick={confirm} type="primary">
                Update
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
                  rules={[
                    { required: true, message: "Please enter user name" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Please enter user name"
                    defaultValue={product.productName}
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
                    defaultValue={product.price}
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
                    defaultValue={product.quantity}
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
                    defaultValue={product.categories.categoryId}  
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        categories: {
                          ...product.categories,
                          categoryId: e as number,
                        },
                      });
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
                    defaultValue={product.brands.brandId}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        brands: { ...product.brands, brandId: e as number },
                      });
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
                    name={product.productImage}
                    defaultFileList={[{ uid: "1", name: product.productImage }]}
                    {...props}
                    onChange={(e) => {
                      setProduct({ ...product, productImage: e.file.name });
                    }}
                    onRemove={() => {
                      setProduct({ ...product, productImage: "" });
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload image</Button>
                    <br />
                    {/* <span className="ant-upload-list-item-name text-red-600" title="404.png">404.png</span> */}
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
                    defaultChecked={product.isDeleted}
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
                    defaultValue={product.description}
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
      )}
    </>
  );
};

export default EditProduct;
