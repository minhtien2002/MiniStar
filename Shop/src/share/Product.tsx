import React from 'react'

interface ProductProps {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
}

const Product: React.FC<ProductProps> = ({ productId, productName, price, productImage }) => {
  return (
    <div className={"flex flex-col justify-center items-center border border-white my-8 p-6 rounded-md shadow-lg cursor-pointer group/item hover:border-solid hover:border hover:border-[#34A853]"}>
      <div className="mt-2 mb-4">
        <img src={productImage} alt={productName} className='group-hover/item:scale-110' />
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <span className='font-bold text-2xl'>{productName}</span>
        <span className='text-red-500 font-bold text-xl'>${price}</span>
        <div className="w-full text-[#34A853] font-medium rounded-lg bg-green-100 hover:bg-[#34A853] flex justify-center gap-1 group hover:text-white">
          <img src="./src/assets/images/icon-plus-green.svg" alt="" className='group-hover:hidden' />
          <img src="./src/assets/images/icon-plus-white.svg" alt="" className='hidden group-hover:block' />
          <button type="button" className='py-2' >Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product;
