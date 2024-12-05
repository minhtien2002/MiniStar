import React, { useState } from "react";
import EditProduct from "./EditProduct";

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
  product: ProductData;
}

const DetailProduct: React.FC<DetailProductProps> = ({ product }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div className="">
        <button
          onClick={handleOpen}
          className="text-blue-600 hover:text-blue-900 p-0 m-0"
        >Detail
        </button>
      </div>
      {open && (
        <div className="shadow-md bg-white w-2/3 p-4 absolute left-60 -top-14 z-20">
          <h1 className="font-bold text-3xl p-1">Chi Tiết Sản Phẩm</h1>
          <button
            onClick={handleClose}
            className="bg-black text-white absolute top-2 right-2 rounded-3xl px-4 py-2 float-right"
          >
            X
          </button>
          
            <div className="p-4 grid">
              <img
                className="flex justify-center  items-center relative left-60"
                src={product.productImage}
                alt=""
              />
              <label htmlFor="">ID Product: {product.productId}</label>
              <br />
              <label htmlFor="">Tên sản phẩm: {product.productName}</label>
              <br />
              <label htmlFor="">Số lượng tồn kho: {product.quantity}</label>
              <br />
              <label htmlFor="">Đơn Giá: ${product.price.toFixed(2)}</label>
              <br />
              <label htmlFor="">Thương hiệu: {product.brands.brandName}</label>
              <br />
              <label htmlFor="">
                Thể loại: {product.categories.categoryName}
              </label>
              <br />
              <label htmlFor="">Ngày tạo sản phẩm: {product.createAt}</label>
              <br />
              <label htmlFor="">
                Ngày chỉnh sửa gần nhất: {product.updateAt}
              </label>
              <br />
              <label htmlFor="">Mô tả sản phẩm: {product.description}</label>
            </div>
          
          
        </div>
      )}
    </>
  );
};

export default DetailProduct;
