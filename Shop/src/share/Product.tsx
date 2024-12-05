import React from 'react'

interface ProductProps {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
}

const Product: React.FC<ProductProps> = ({ productId, productName, price, productImage }) => {
  return (
    <a href="111"><div className={"flex flex-col justify-center items-center border border-[#dadada] my-2 p-6 rounded-md shadow-lg cursor-pointer group/item hover:border-solid hover:border hover:border-[#34A853]"}>
    <img src={"./src/assets/images/" + productImage} alt={productName} className=' w-40 h-40  group-hover/item:scale-110' />
    <div className=" w-full flex flex-col gap-2 justify-center items-center">
      <div className="flex flex-col items-center">
        <p className='font-bold text-2xl pt-2'>{productName}</p>
        <span className='font-light text-[13px] '>123</span>
      </div>
      <span className='text-red-500 font-bold text-xl'>${price}</span>
      <div className="w-full text-[#34A853] font-medium rounded-lg bg-green-100 hover:bg-[#34A853] flex justify-center gap-1 group hover:text-white">
        <img src="./src/assets/images/icon-plus-green.svg" alt="" className='group-hover:hidden' />
        <img src="./src/assets/images/icon-plus-white.svg" alt="" className='hidden group-hover:block' />
        <a href='333' type="button" className='py-2' >Add To Cart</a>
      </div>
    </div>
  </div></a>
  )
}

export default Product;
