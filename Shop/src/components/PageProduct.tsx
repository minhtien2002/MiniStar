import React from 'react'
import Product from '../share/Product';

interface ProductProps {
    ProductId: number;
    ProductName: string;
    Price: number;
    ProductImage: string;
  }
 

const initialProduct: ProductProps = {
    ProductId: 1,
    ProductName: 'Fresh Avocado',
    Price: 1.99,
    ProductImage: '/src/assets/images/product.webp',
    
}

const PageProduct: React.FC = () => {
  return (
    <div className='flex flex-row justify-center gap-4'>
        <Product {...initialProduct}  />
        <Product {...initialProduct}  />
        <Product {...initialProduct}  />
        <Product {...initialProduct}  />
    </div>
  )
}
export default PageProduct;
