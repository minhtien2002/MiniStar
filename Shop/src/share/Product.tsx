import React from 'react'

interface ProductProps {
  ProductId: number;
  ProductName: string;
  Price: number;
  ProductImage: string;
}

const Product: React.FC<ProductProps> = ({ ProductId, ProductName, Price, ProductImage }) => {
  return (
    <div className={"flex flex-col justify-center items-center border border-white my-8 p-6 rounded-md shadow-lg hover:border-solid hover:border hover:border-[#34A853]"}>
      <div className="mt-2 mb-4">
        <img src={ProductImage} alt={ProductName} className='w-full scale-100 object-contain transition-all duration-300 ease-in-out align-middle ' />
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <span className='font-bold text-2xl'>{ProductName}</span>
        <span className='text-red-500 font-bold text-xl'>${Price}</span>
        <div className="w-full text-[#34A853] font-medium rounded-lg bg-green-100 hover:bg-[#34A853] flex justify-center gap-1 group hover:text-white">
          <img src="./src/assets/images/icon-plus-green.svg" alt="" className='group-hover:hidden' />
          <img src="./src/assets/images/icon-plus-white.svg" alt="" className='hidden group-hover:block' />
          <button type="button" className='py-2 '>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product;
