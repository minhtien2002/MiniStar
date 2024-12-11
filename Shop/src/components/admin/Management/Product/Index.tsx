import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, message, Popconfirm, Select } from "antd";
import type { PopconfirmProps } from "antd";
import { AddProduct } from "./AddProduct";
import API_ENDPOINTS from "../../../../apiConfig";
import CallApi from "../../../../share/Fetch/CallApi";
import DeleteProduct from "./DeleteProduct";
import MakeRequest from "../../../../share/Fetch/MakeRequest";
import DetailProduct from "./DetailProduct";
import EditProduct from "./EditProduct";
import { ModalDrawer } from "./ModalDrawer";

const pathProduct = API_ENDPOINTS.getAllProduct;
const pathUpdateProduct = API_ENDPOINTS.UpdateProduct;
const pathBrand = API_ENDPOINTS.getAllBrand;
const pathCategory = API_ENDPOINTS.getAllCategory;
const pathProductByCategoryOrBrand = (categoryId?: number, brandId?: number) =>
  API_ENDPOINTS.getProductByCategoryOrBrand(categoryId, brandId);

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

interface CategoryOrBrand {
  categoryId?: number;
  brandId?: number;
}

export const Index = () => {
  const [products, setProducts] = useState([] as ProductData[]);
  const [p, setP] = useState<ProductData>();
  const [categories, setCategories] = React.useState([] as Categories[]); // Khởi tạo state categories
  const [brands, setBrands] = React.useState([] as Brands[]); // Khởi tạo state brands
  const [sort, setSort] = useState<CategoryOrBrand>();

  // Hàm nhận dữ liệu từ component con
  const handleApiProduct = (data: any) => {
    setProducts(data);
  };

  CallApi({ urlOfApi: pathProduct, onDataReceive: handleApiProduct });

  const cancel: PopconfirmProps["onCancel"] = () => {
    return false;
  };

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    if (p) {
      setP({ ...p });
    }
    if (!p) {
      return message.error("Product data is missing");
    }
    const item = {
      productId: p.productId,
      productName: p.productName,
      description: p.description,
      price: p.price,
      quantity: p.quantity,
      productImage: p.productImage,
      isDeleted: !p.isDeleted,
      categoryId: p.categories.categoryId,
      brandId: p.brands.brandId,
    };
    // console.log(item);
    try {
      var response = await MakeRequest(pathUpdateProduct, "PUT", item);
      console.log(response.message);
    } catch (error) {
      return message.error("Update failure from backend");
    }
    message.success("Updated successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleChecked = (product: ProductData) => {
    console.log(product);
    setP(product);
  };

  const handleApiCategory = (data: any) => {
    setCategories(data);
  };

  const handleApiBrand = (data: any) => {
    setBrands(data);
  };

  CallApi({ urlOfApi: pathCategory, onDataReceive: handleApiCategory });
  CallApi({ urlOfApi: pathBrand, onDataReceive: handleApiBrand });

  const handleApply = async () => {
    try {
      var response = await MakeRequest(
        pathProductByCategoryOrBrand(sort?.categoryId, sort?.brandId),
        "GET"
      );
      setProducts(response);
    } catch (error) {
      return message.error("Sort failure from backend");
    }
  };

  useEffect(() => {
    setProducts(products);
  }, [products]);

  //End data
  return (
    <div className="relative">
      <div className="container mx-auto p-4 overflow-x-hidden">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
          <div className="flex gap-4">
            <ModalDrawer title="Category" listCategory={categories} />
            <ModalDrawer title="Brand" listBrand={brands} />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <AddProduct />
          <div className="flex justify-between w-1/2 rounded-lg pl-9 items-center">
            <Form.Item className="cursor-pointer hover:text-blue-600 text-center w-48 m-0 p-0">
              <Select
                placeholder="Please select a Category"
                onChange={(e) => {
                  setSort({ ...sort, categoryId: e as number });
                }}
              >
                <Select.Option value={undefined}>
                  <span className="text-[#969696]">--Categories--</span>
                </Select.Option>
                {categories.map((items: any) => (
                  <Select.Option
                    key={items.categoryId}
                    value={items.categoryId}
                  >
                    {items.categoryName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <hr className="border-l-2 border-[#969696] w-[1px] h-[80%]" />
            <Form.Item className="cursor-pointer hover:text-blue-600 text-center w-48 m-0 p-0">
              <Select
                placeholder="Please select a Brand"
                onChange={(e) => {
                  setSort({ ...sort, brandId: e as number });
                }}
              >
                <Select.Option value={undefined}>
                  <span className="text-[#969696]">--Brands--</span>
                </Select.Option>
                {brands.map((items: any) => (
                  <Select.Option key={items.brandId} value={items.brandId}>
                    {items.brandName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" className="rounded" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Số Lượng
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>

              <th className=" px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Show/hide
              </th>

              <th className="px-4 py-3 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={"/src/assets/images/" + product.productImage}
                    alt={product.productName}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.brands.brandName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.categories.categoryName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Popconfirm
                    title="Your Confirm?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Checkbox
                      onChange={() => handleChecked(product)}
                      checked={product.isDeleted}
                    ></Checkbox>
                  </Popconfirm>
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium flex justify-center items-center gap-2">
                  <EditProduct initialProduct={product} />
                  <DeleteProduct data={product.productId} />
                  <DetailProduct product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
