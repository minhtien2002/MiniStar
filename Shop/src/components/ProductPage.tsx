import Product from "../share/Product";
import API_ENDPOINTS from "../apiConfig"; // Import API URL từ file cấu hình
import CallApi from "../share/CallApi";
import React from "react";
import { Breadcrumb, Slider } from "antd";

const pathProduct = API_ENDPOINTS.getAllProduct; // Lấy URL API từ file cấu hình
const pathQuantityAllProduct = API_ENDPOINTS.quantityAllProduct;
const pathCategory = API_ENDPOINTS.getAllCategory;
const pathBrand = API_ENDPOINTS.getAllBrand;

interface ProductData {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
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

const PageProduct: React.FC = () => {
  const [products, setProducts] = React.useState([] as ProductData[]); // Khởi tạo state data
  const [count, setCount] = React.useState(0); // Khởi tạo state count
  const [categories, setCategories] = React.useState([] as Categories[]); // Khởi tạo state categories
  const [brands, setBrands] = React.useState([] as Brands[]); // Khởi tạo state brands

  // Hàm nhận dữ liệu từ component con
  const handleApiProduct = (data: any) => {
    setProducts(data);
  };

  const handleApiCategory = (data: any) => {
    setCategories(data);
  };

  const handleApiBand = (data: any) => {
    setBrands(data);
  };

  const handleApiCountAllProduct = (data: any) => {
    setCount(data);
  };

  return (
    <div className="h-1/2 flex flex-col justify-between">
      <div className="mb-4">
        <Breadcrumb
          separator=">"
          className="text-gray-500 font-semibold text-lg"
          items={[
            {
              title: "Home",
            },
            {
              title: "Application Center",
              href: "",
            },
            {
              title: "Application List",
              href: "",
            },
            {
              title: "An Application",
            },
          ]}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/4 h-auto mr-5">
          <div className="px-6 py-4 flex gap-5 flex-col border shadow-lg">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">CATEGORIES</h3>
              <div className="">
                <ul className="flex flex-col gap-1 text-lg">
                  <CallApi
                    onDataReceive={handleApiCategory}
                    urlOfApi={pathCategory}
                  />
                  {categories.map((items: any) => (
                    <li className="flex gap-1">
                      <input
                        type="checkbox"
                        id={"category" + items.categoryId}
                        name="cate"
                        className="w-4"
                      />
                      <label htmlFor={"category" + items.categoryId}>
                        {items.categoryName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">PRICE RANGE</h3>
              <div className="">
                <div className="">
                  <div className="">
                    <Slider range defaultValue={[0, 100]} />
                    <span className="">Price: $40</span>
                    <span>-</span>
                    <span className="">$346</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">BRANDS</h3>
              <div className="">
                <ul className="flex flex-col gap-1 text-lg">
                  <CallApi onDataReceive={handleApiBand} urlOfApi={pathBrand} />
                  {brands.map((items: any) => (
                    <li className="flex gap-1">
                      <input
                        type="checkbox"
                        id={"brand" + items.brandId}
                        name="brands"
                        className="w-4"
                      />
                      <label htmlFor={"brand" + items.brandId}>
                        {items.brandName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full h-96 bg-[url(./src/assets/images/sidebar-img.png)] bg-contain bg-no-repeat text-white p-8 mt-6">
            <span className="text-xl">TRENDY</span>
            <h3 className="text-2xl font-bold">Best wireless Shoes</h3>
            <a href="" className="">
              Shop Now
            </a>
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="flex flex-row justify-between shadow py-5">
            <div className="result">
              <CallApi
                onDataReceive={handleApiCountAllProduct}
                urlOfApi={pathQuantityAllProduct}
              />
              <p>
                Showing <span>1-12 of {count != 0 && count} results</span>
              </p>
            </div>
            <div className="flex flex-row">
              <span className="">Sort by:</span>
              <div>
                <div className="flex flex-row">
                  <span className="default item-text">Default</span>
                  <span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 1L5 5L9 1" stroke="#9A9A9A"></path>
                    </svg>
                  </span>
                </div>
                <div className="slectbox-body hidden">
                  <div className="clickAway position-fixed"></div>
                  <ul className="country-options">
                    <li className="all-option">
                      <span className="option-text item-text">Vegetable</span>
                    </li>
                    <li className="all-option">
                      <span className="option-text item-text">Fruits</span>
                    </li>
                    <li className="all-option">
                      <span className="option-text item-text">Juice</span>
                    </li>
                    <li className="all-option">
                      <span className="option-text item-text">Meat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <CallApi
              onDataReceive={handleApiProduct}
              urlOfApi={pathProduct}
            />
            {products.map((product: any) => (
              <Product
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                price={product.price}
                productImage={product.productImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageProduct;
