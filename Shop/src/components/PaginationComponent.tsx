import { Pagination } from 'antd';
import React, { useState } from 'react';
import Product from '../share/Product';
import path from 'path';

interface ProductData {
    productId: number;
    productName: string;
    price: number;
    productImage: string;
    isDeleted: boolean;
  }

interface Props {
    items: Array<ProductData>;
}

const PaginationComponent:React.FC<Props> = ({items}) => {
  // Dữ liệu mẫu (danh sách các mục)
  const data = items;

  // Số mục hiển thị trên mỗi trang
  const itemsPerPage = 9;

  // State để lưu trữ trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán chỉ số đầu và cuối của danh sách trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Dữ liệu của trang hiện tại
  const currentItems = data.slice(startIndex, endIndex);

   // Tính tổng số trang
   const totalPages = Math.ceil(data.length / itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
        <div className="grid grid-cols-3 gap-4 mt-8">
            {currentItems.map((product: any) => (
              <Product
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                price={product.price}
                productImage={product.productImage}
                isDeleted={product.isDeleted}
              />
            ))}
          </div>
          <Pagination
            align="center"
            current={currentPage}
            total={totalPages*10}
            onChange={handlePageChange}
            className="mt-3"
          />
    </>
  );
};

export default PaginationComponent;
