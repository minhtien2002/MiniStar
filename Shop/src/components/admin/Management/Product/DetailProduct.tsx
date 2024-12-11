import React, { useState } from "react";

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
      <div className="relative">
        <button
          onClick={() => {
            handleOpen();
          }}
          className="text-blue-600 hover:text-blue-900 p-0 m-0"
        >
          Detail
        </button>
      </div>
      {open && (
        <div className="flex  justify-center w-2/3 z-50  m-auto border rounded-sm bg-slate-200 top-14 left-[15%] p-5 pt-16 absolute whitespace-normal">
          <button
            className="absolute right-4 top-3 cursor-pointer bg-red-400 py-2 px-3 rounded-2xl"
            onClick={handleClose}
          >
            X
          </button>
          {/* Image and Discount */}
          <div className="w-1/2 ">
            <div className="relative ">
              <img
                src={"/src/assets/images/" + product.productImage}
                alt="Eggplant"
                className="w-full rounded-md shadow h-96"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-black px-5 py-7 rounded-full text-xs font-bold">
                -50%
              </div>
            </div>
            <div className="flex w-72 justify-between py-4">
              <span className="font-light">Share This:</span>
              <a href="" className="text-green-500 hover:underline">
                FaceBook
              </a>
              <a href="" className="text-green-500 hover:underline">
                YouTube
              </a>
              <a href="" className="text-green-500 hover:underline">
                Spotify
              </a>
            </div>

            {/* Small images */}
          </div>
          {/* Product Info */}

          <div className="w-1/2 pl-10 relative   ">
            <p className="text-sm text-green-500 ">
              ProductID: {product.productId}
            </p>
            <h1 className="text-3xl font-bold my-2">{product.productName}</h1>
            {/* Price */}
            <div className="flex items-center space-x-3 my-2">
              <span className="text-sm font-semibold text-gray-500 line-through">
                ${(product.price * 2).toFixed(2)}
              </span>

              <span className="text-2xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-600 my-3 ">{product.description}</p>

            {/* Availability */}
            <div className="bg-green-50 w-auto float-left py-1 px-2 rounded-xl">
              <p className="text-black font-medium my-2">
                <span> Availability: </span>
                <span className="font-bold text-green-500">
                  {product.quantity} Products Available
                </span>
              </p>
            </div>
            <br />
            <br />

            {/* Quantity and Buttons */}
            <div className="flex items-center space-x-3 mt-4"></div>

            {/* Category and Tags */}
            <div className="">
              <p className="text-gray-600 pb-3">
                Category:
                <span className="text-gray-800 font-medium">
                  {" "}
                  {product.categories.categoryName}
                </span>
              </p>
              <p className="text-gray-600 pb-3">
                Brand:
                <span className="text-gray-800 font-medium">
                  {" "}
                  {product.brands.brandName}
                </span>
              </p>
              <p className="text-gray-600 pb-3">
                Create time:
                <span className="text-gray-800 font-medium">
                  {" "}
                  {product.createAt}
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
      )}
    </>
  );
};

export default DetailProduct;
