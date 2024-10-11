import React, { useEffect, useReducer } from 'react'
import Product from '../share/Product';
import API_ENDPOINTS from '../apiConfig'; // Import API URL từ file cấu hình
import CallApi from '../share/CallApi';

const pathUrl = API_ENDPOINTS.getProductById(5);  // Lấy URL API từ file cấu hình

interface ProductData {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
}

const PageProduct: React.FC = () => {

  const [data, setData] = React.useState<ProductData | null>(null);
 
  // Hàm nhận dữ liệu từ component con
  const handleApiData = (data: any) => {
    setData(data);
  };

  return (
    <div className="">

      <div>
        
      </div>
      <div className='flex flex-row justify-center gap-4'>
      {/* {state.data.map((product: any) => (
          <Product key={product.productId} productId={product.productId} productName={product.productName} price={0} productImage={''} />
        ))} */}
        <CallApi onDataReceive={handleApiData} urlOfApi={pathUrl}/>
        {data && <Product key={data.productId} productId={data.productId} productName={data.productName} price={0} productImage={''} />}

      </div>
    </div>
  )
}
export default PageProduct;
