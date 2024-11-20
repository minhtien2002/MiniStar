import Product from '../share/Product';
import API_ENDPOINTS from '../apiConfig'; // Import API URL từ file cấu hình
import CallApi from '../share/CallApi';
import React from 'react';

const pathAllProduct = API_ENDPOINTS.getAllProduct;  // Lấy URL API từ file cấu hình
const pathQuantityAllProduct = API_ENDPOINTS.quantityAllProduct;

interface ProductData {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
}

const PageProduct: React.FC = () => {

  const [data, setData] = React.useState([] as ProductData[]);  // Khởi tạo state data
  const [count, setCount] = React.useState(0);  // Khởi tạo state count 

  // Hàm nhận dữ liệu từ component con
  const handleApiData = (data: any) => {
    setData(data);
  };

  const handleApiCountAllProduct = (data: any) => {
    setCount(data);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/4">
        <div className="">
          <div className="">
            <h3 className="">Product Categories</h3>
            <div className="">
              <ul className="">
                <li className=''>
                  <input type="checkbox" id="veg" name="veg" checked/>
                  <label htmlFor="veg">Vegetable</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="">Price Range</h3>
            <div className="">
              <div className="">
                <div className="">
                  <span className="" >Price: $40</span>
                  <span>-</span>
                  <span className="">$346</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="">Brands</h3>
            <div className="">
              <ul className="">
                <li>
                  <input type="checkbox" id="thread" name="thread" />
                  <label htmlFor="thread">Refined Threads
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="">Weight</h3>
            <div className="">
              <ul className="">
                <li>
                  <input type="checkbox" id="small" name="small" />
                  <label htmlFor="small">500gm</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <span className="">TRENDY</span>
          <h3 className="">Best wireless Shoes</h3>
          <a href="" className="">Shop Now
            <span>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.45312" y="0.914062" width="9.25346" height="2.05632" transform="rotate(45 1.45312 0.914062)"></rect>
                <rect x="8" y="7.45703" width="9.25346" height="2.05632" transform="rotate(135 8 7.45703)"></rect>
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div className="w-3/4 flex flex-col">
          <div className="flex flex-row justify-between shadow py-5">
            <div className="result">
              <CallApi onDataReceive={handleApiCountAllProduct} urlOfApi={pathQuantityAllProduct}/>
              <p>Showing <span>1-12 of {count} results</span></p>
            </div>
            <div className="flex flex-row">
              <span className="">Sort by:</span>
              <div>
                <div className="flex flex-row" >
                  <span className="default item-text">Default</span>
                  <span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#9A9A9A"></path>
                    </svg>
                  </span>
                </div>
                <div className="slectbox-body hidden" >
                  <div className="clickAway position-fixed" ></div>
                  <ul className="country-options">
                    <li className="all-option"><span className="option-text item-text">Vegetable
                    </span></li>
                    <li className="all-option"><span className="option-text item-text">Fruits</span>
                    </li>
                    <li className="all-option"><span className="option-text item-text">Juice</span>
                    </li>
                    <li className="all-option"><span className="option-text item-text">Meat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <CallApi onDataReceive={handleApiData} urlOfApi={pathAllProduct} />
          {data.map((product: any) => (
            <Product key={product.productId} productId={product.productId} productName={product.productName} price={product.price} productImage={product.productImage} />
          ))}
        </div>
      </div>

    </div>
  )
}
export default PageProduct;
