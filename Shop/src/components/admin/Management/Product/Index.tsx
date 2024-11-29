import React, { useState } from "react";
import { Input } from "antd";
import { Cascader } from "antd";
import type { CascaderProps, GetProp } from "antd";
import Product from "../../../../share/Product";
import { AddProduct } from "./AddProduct";
import API_ENDPOINTS from "../../../../apiConfig";
import CallApi from "../../../../share/CallApi";

const pathProduct = API_ENDPOINTS.getAllProduct;

interface ProductData {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  createAt: Date;
  updateAt: Date;
  isDelete: boolean;
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

export const Index = () => {
  const [products, setProducts] = useState([] as ProductData[]);
  // detail
  const [Detaildisplay, setDisplayDetail] = useState("hidden");
  const handleDisplayBlockDetail = () => {
    setDisplayDetail("shadow-md bg-white w-2/3 p-4 absolute left-60 -top-14 z-20")
  }
  // add
  const [Adddisplay, setDisplayAdd] = useState("hidden");
  const handleDisplayBlockAdd = () => {
    setDisplayAdd("bg-slate-400 p-4 absolute top-4 left-48 block");
  };
  // edit
  const [Editdisplay, setDisplayEdit] = useState("hidden");
  const handleDisplayBlockEdit = () => {
    setDisplayEdit("bg-slate-400 p-4 absolute top-4 left-48 block z-30");
  };

  const handleDisplayHidden = () => {
    setDisplayEdit("hidden"),
      setDisplayAdd("hidden");
      setDisplayDetail("hidden")
  };
  const ShowConfirmDeleteAll = () => {
    let result = confirm(
      "Bạn sẽ xóa toàn bộ sản phẩm của mình. Hành động này không thể hoàn tác. Tiếp tục xóa."
    );
    if (result == true) {
      // Nếu người dùng nhấn OK
      alert("Tất cả sản phẩm đã được xóa!");
    } else {
      // Nếu người dùng nhấn Cancel
      alert("Đã hủy xóa.");
    }
  }; //data ảo

  // Hàm nhận dữ liệu từ component con
  const handleApiProduct = (data: any) => {
    setProducts(data);
  };

  type DefaultOptionType = GetProp<CascaderProps, "options">[number];

  interface Option {
    value: string;
    label: string;
    children?: Option[];
    disabled?: boolean;
  }

  const { Search } = Input;
  const options: Option[] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
            {
              value: "xiasha",
              label: "Xia Sha",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua men",
            },
          ],
        },
      ],
    },
  ];

  const onChange: CascaderProps<Option>["onChange"] = (
    value,
    selectedOptions
  ) => {
    console.log(value, selectedOptions);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  //End data
  return (
    <div className="relative">
      <form action="">
        <div>
          <>
            <br />
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
            />
          </>
          {/* <Input placeholder="Basic usage" /> */}
          <Cascader
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{ filter }}
            onSearch={(value) => console.log(value)}
          />
        </div>
      </form>
      
      {/* EDIT */}
      {/* {products.map((product) => (
        <div className={Editdisplay}>
          <h1 className="font-bold text-3xl p-1">Chỉnh sửa Sản Phẩm</h1>
          <button
            onClick={handleDisplayHidden}
            className="bg-black text-white absolute top-2 right-2 rounded-3xl px-4 py-2 float-right"
        >
            X
          </button>
          <form className="justify-center grid grid-cols-2 ">
            <div className="flex flex-col m-3">
              <label htmlFor="nameproduct" className="text-[#797979] mb-1">
                Name Product*
              </label>
              <input
                defaultValue={product.name}
                type="text"
                id="nameproduct"
                name="nameproduct"
                placeholder="Name Product"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="Quantity" className="text-[#797979] mb-1">
                Quantity*
              </label>
              <input
                defaultValue={product.quantity}
                type="number"
                id="Quantity"
                name="Quantity"
                placeholder="Quantity Product"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="Price" className="text-[#797979] mb-1">
                Price*
              </label>
              <input
                defaultValue={product.price}
                type="number"
                id="Price"
                name="Price"
                placeholder="Price Product"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="Description" className="text-[#797979] mb-1">
                Description
              </label>
              <input
                defaultValue={product.description}
                type="text"
                id="Description"
                name="Description"
                placeholder="Description Product"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="Brand" className="text-[#797979] mb-1">
                Brand*
              </label>
              <input
                defaultValue={product.brand}
                type="text"
                id="Brand"
                name="Brand"
                placeholder="Brand"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="Category" className="text-[#797979] mb-1">
                Category*
              </label>
              <input
                defaultValue={product.category}
                type="text"
                id="Category"
                name="Category"
                placeholder="Category"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <label htmlFor="datecreate" className="text-[#797979] mb-1">
                Time Create*
              </label>
              <input
                type="date"
                id="datecreate"
                name="datecreate"
                placeholder="Time Create"
                className="w-[400px] px-5 py-3 border-solid border border-[#d6d6d6] rounded-md focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col m-3">
              <input
                className="w-[400px] py-7 focus-visible:outline-none"
                type="file"
              />
            </div>
          </form>
          <div className="grid grid-cols-1 w-full">
            <input
              type="submit"
              value="Update"
              className="py-3 mb-5 text-white bg-blue-600 hover:bg-blue-500 rounded-md font-medium cursor-pointer"
            />
          </div>
        </div>
      ))} */}

      {/* Detail */}
      {/* {products.map((product) => (
        <div className={Detaildisplay}>
          <h1 className="font-bold text-3xl p-1">Chi Tiết Sản Phẩm</h1>
          <button
            onClick={handleDisplayHidden}
            className="bg-black text-white absolute top-2 right-2 rounded-3xl px-4 py-2 float-right"
        >
            X
          </button>
          <div className="p-4 grid">
            <img className="flex justify-center  items-center relative left-60" src={product.productImage} alt="" />
            <label htmlFor="">ID Product: {product.productId}</label>
            <br />
            <label  htmlFor="">Tên sản phẩm: {product.productName}</label>
            <br />
            <label htmlFor="">Số lượng tồn kho: {product.quantity}</label>
            <br />
            <label htmlFor="">Đơn Giá: ${product.price.toFixed(2)}</label>
            <br />
            <label htmlFor="">Thương hiệu: {product.brands.brandName}</label>
            <br />
            <label htmlFor="">Thể loại: {product.categories.categoryName}</label>
            <br />
            <label htmlFor="">Ngày tạo/chỉnh sửa sản phẩm: {product.createdAt}</label>
            <br />
            <label htmlFor="">Mô tả sản phẩm: {product.description}</label>
          </div>
          <div className="grid grid-cols-1 w-full">
            <input
              type="submit"
              onClick={handleDisplayBlockEdit}
              value="Edit Product"
              className="py-3 mb-5 text-white bg-blue-600 hover:bg-blue-500 rounded-md font-medium cursor-pointer"
            />
          </div>
        </div>
      ))} */}

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
        <AddProduct />
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th
                className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
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

              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Show/hide
              </th>

              <th className="px-4 py-3 bg-gray-100 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <CallApi onDataReceive={handleApiProduct} urlOfApi={pathProduct} />
            {products.map((product) => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.brands.brandName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.categories.categoryName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input type="checkbox" className="w-4 h-4" name="" id="" />
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={handleDisplayBlockEdit}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 ml-2">
                    Delete
                  </button>
                  <button onClick={handleDisplayBlockDetail} className=" hover:text-red-900 ml-2">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
