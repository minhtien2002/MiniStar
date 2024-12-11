import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  message,
  Select,
  Slider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import API_ENDPOINTS from "../../services/apiConfig";
import MakeRequest from "../../services/Fetch/MakeRequest";
import PaginationComponent from "./PaginationComponent";

const pathProduct = API_ENDPOINTS.getAllProduct; // Lấy URL API từ file cấu hình
const pathQuantityAllProduct = API_ENDPOINTS.quantityAllProduct;
const pathCategory = API_ENDPOINTS.getAllCategory;
const pathBrand = API_ENDPOINTS.getAllBrand;
const pathProductWithSort = (sort: string) =>
  API_ENDPOINTS.getProductWithSort(sort);
const pathProductFilterByCategoryOrBrand =
  API_ENDPOINTS.productFilterByCategoryOrBrand;

interface ProductData {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
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

const PageProduct: React.FC = () => {
  const [products, setProducts] = React.useState([] as ProductData[]); // Khởi tạo state data
  const [count, setCount] = React.useState(0); // Khởi tạo state count
  const [categories, setCategories] = React.useState([] as Categories[]); // Khởi tạo state categories
  const [brands, setBrands] = React.useState([] as Brands[]); // Khởi tạo state brands
  const [yourChoice, setYourChoice] = React.useState([] as Array<string>);
  const [filterCategory, setFilterCategory] = React.useState(
    [] as ProductData[]
  );
  const [filterBrand, setFilterBrand] = React.useState([] as ProductData[]);
  const [rangePrice, setRangePrice] = useState<[number, number]>([0, 1000]);
  const [flag, setFlag] = useState(true);
  let dataTemple = useRef([] as ProductData[]);

  useEffect(() => {
    handleApiProduct();
    handleApiCategory();
    handleApiBand();
    handleApiCountAllProduct();
    setFlag(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (yourChoice.length > 0) {
        MakeRequest(
          pathProductFilterByCategoryOrBrand,
          "POST",
          yourChoice
        ).then((res) => {
          setProducts(res);
        });
      }
      if (yourChoice.length === 0) {
        handleApiProduct();
      }
    }, 300);
  }, [yourChoice, filterBrand, filterCategory]);

  const handleApiProduct = () => {
    MakeRequest(pathProduct, "GET").then((res) => {
      setProducts(res);
    });
  };

  const handleApiCategory = () => {
    MakeRequest(pathCategory, "GET").then((res) => {
      setCategories(res);
    });
  };

  const handleApiBand = () => {
    MakeRequest(pathBrand, "GET").then((res) => {
      setBrands(res);
    });
  };

  const handleApiCountAllProduct = () => {
    MakeRequest(pathQuantityAllProduct, "GET").then((res) => {
      setCount(res);
    });
  };

  const onSortAscendingOrDecreasing = (value: string) => {
    try {
      MakeRequest(pathProductWithSort(value), "GET").then((res) => {
        setProducts(res);
      });
    } catch (error) {
      message.error(String(error));
    }
  };

  // filter by category or brand
  const handleCheckbox = (id: string) => {
    if (yourChoice.length > 0 && yourChoice.includes(id)) {
      if (id.charAt(0) === "c") {
        setYourChoice(yourChoice.filter((item) => item !== id));
        const shouldUpdate = products.some(
          (item) => item.categories.categoryId === parseInt(id.slice(1))
        );

        if (shouldUpdate) {
          setFilterCategory(
            filterCategory.filter(
              (item) => item.categories.categoryId !== parseInt(id.slice(1))
            )
          );
        }
      }
      if (id.charAt(0) === "b") {
        setYourChoice(yourChoice.filter((item) => item !== id));
        const shouldUpdate = products.some(
          (item) => item.brands.brandId === parseInt(id.slice(1))
        );

        if (shouldUpdate) {
          setFilterBrand(
            filterBrand.filter(
              (item) => item.brands.brandId !== parseInt(id.slice(1))
            )
          );
        }
      }
      return;
    }
    setYourChoice([...(yourChoice || []), id]);
    if (id.charAt(0) === "c") {
      products.forEach((item) => {
        if (item.categories.categoryId === parseInt(id.slice(1))) {
          setFilterCategory([...filterCategory, item]);
        }
      });
    }
    if (id.charAt(0) === "b") {
      products.forEach((item) => {
        if (item.brands.brandId === parseInt(id.slice(1))) {
          setFilterBrand([...filterBrand, item]);
        }
      });
    }
  };

  const removeSelectedItems = () => {
    setYourChoice([]);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleRangePriceChange = (newRange: [number, number]) => {
    setRangePrice(newRange);
  };

  const filterByPrice = () => {
    if (flag) {
      dataTemple.current = products;
      setFlag(false);
    }
    const filterPrice = dataTemple.current.filter(
      (item) => item.price >= rangePrice[0] && item.price <= rangePrice[1]
    );
    setProducts(filterPrice);
  };

  return (
    <div className="h-1/2 flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <div className="w-1/4 h-auto mr-5">
          <div className="px-6 py-4 flex gap-5 flex-col border shadow-lg">
            {yourChoice.length > 0 && (
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-blue-600">SELECTED</h3>
                  <div className="px-2 rounded-md text-[13px]">
                    <button
                      className="hover:text-red-400"
                      onClick={removeSelectedItems}
                    >
                      <span className="pr-1">Remove all</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterCategory.map((item: any) => (
                    <div className="bg-green-500 px-2 rounded-md text-white">
                      <button className="">
                        <CloseOutlined className="text-[13px]" />
                      </button>
                      <span className="text-lg pl-2">
                        {item.categories.categoryName}
                      </span>
                    </div>
                  ))}
                  {filterBrand.map((item: any) => (
                    <div className="bg-green-500 px-2 rounded-md text-white">
                      <button className="">
                        <CloseOutlined className="text-[13px]" />
                      </button>
                      <span className="text-lg pl-2">
                        {item.brands.brandName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">CATEGORIES</h3>
              <div className="h-44 overflow-scroll">
                <ul className="flex flex-col gap-1 text-lg">
                  {categories.map((items: any) => (
                    <li className="flex gap-1" key={items.categoryId}>
                      <form method="POST">
                        <input
                          type="checkbox"
                          id={"category" + items.categoryId}
                          name="cate"
                          className="w-4"
                          onClick={() => handleCheckbox("c" + items.categoryId)}
                        />
                      </form>
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
              <Form onFinish={filterByPrice}>
                <Form.Item>
                  <Slider
                    range
                    max={1000}
                    min={0}
                    value={rangePrice}
                    onChange={handleRangePriceChange}
                  />
                  <span className="">
                    From: {rangePrice[0]} - To: {rangePrice[1]}
                  </span>
                </Form.Item>
                <div className="flex justify-between gap-4">
                  <Button type="primary" className="w-1/2" htmlType="submit">
                    Submit
                  </Button>
                  <Button type="default" className="w-1/2" onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 300);
                  }}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">BRANDS</h3>
              <div className="h-44 overflow-scroll">
                <ul className="flex flex-col gap-1 text-lg">
                  {brands.map((items: any) => (
                    <li className="flex gap-1" key={items.brandId}>
                      <input
                        type="checkbox"
                        id={"brand" + items.brandId}
                        name="brands"
                        className="w-4"
                        onClick={() => handleCheckbox("b" + items.brandId)}
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
          <div className="flex flex-row justify-between shadow py-5 px-4">
            <div className="result">
              <p>
                Showing <span>1-9 of {count != 0 && count} results</span>
              </p>
            </div>
            <div className="flex flex-row gap-2 justify-center">
              <span className="">Sort by:</span>
              <div>
                <Select
                  defaultValue="default"
                  style={{ width: 110 }}
                  onChange={onSortAscendingOrDecreasing}
                  options={[
                    { value: null, label: "Mặc định" },
                    { value: "ascending", label: "Tăng dần" },
                    { value: "decreasing", label: "Giảm dần" },
                  ]}
                />
              </div>
            </div>
          </div>
          <PaginationComponent items={products} />
        </div>
      </div>
    </div>
  );
};
export default PageProduct;
