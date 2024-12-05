import React from "react";
import Login from "./Login";
<link rel="stylesheet" href="./public/CSS/reset.css" />;

const Home: React.FC = () => {
  return (
    <div className="container w-11/12  pl-20 ">
      <section className="flex ">
        <div className="pt-14">
          <p className="text-3xl font-bold text-green-600 mb-4">
            FRESH GROCERY
          </p>
          <p className="text-7xl font-bold mb-8">
            There's you can Buy your all of Grocery Products.
          </p>
          <a
            href="product-all"
            className="bg-yellow-500 hover:bg-black text-black hover:text-white font-bold  p-4 rounded"
          >
            Shop Now
          </a>
        </div>
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/hero-img-1.webp"
          alt="Fresh Vegetables"
          className="mx-auto w-3/5 mb-8"
        />
      </section>
      {/* 222222222 */}
      <section className="flex ">
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/hero-img-2.webp"
          alt="Fresh Vegetables"
          className="mx-auto w-2/5 mb-8 pr-11"
        />
        <div className="pt-14">
          <p className="text-3xl font-bold text-green-600 mb-4">
            FRESH GROCERY
          </p>
          <p className="text-7xl font-bold mb-8  pb-6">
          We Provide Fresh and Organic Fruits To Your Door.
          </p>
          <a
            href="product-all"
            className="bg-yellow-500 hover:bg-black text-black hover:text-white font-bold  p-4 rounded"
          >
            Shop Now
          </a>
        </div>
      </section>
      {/* 333333333 */}
      <section className="flex ">
        <div className="pt-14">
          <p className="text-3xl font-bold text-green-600 mb-4">
            FRESH GROCERY
          </p>
          <p className="text-7xl font-bold mb-8 pb-6">
          You Can Buy All 
          <br />the Grocery Items Hasslefree
          </p>
          <a
            href="product-all"
            className="bg-yellow-500 hover:bg-black text-black hover:text-white font-bold  p-4 rounded"
          >
            Shop Now
          </a>
        </div>
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/hero-img-3.webp"
          alt="Fresh Vegetables"
          className="mx-auto w-3/5 mb-8"
        />
      </section>

      {/* 44444444 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Card 1 */}
      <div className="bg-green-100 rounded-lg shadow-md p-6 flex flex-col ">
        <div className="text-sm text-green-600 font-bold">FRUITS</div>
        <h2 className="text-4xl font-bold text-gray-800 pb-4 my-2">Healthy & Goods Fruits</h2>
        <a  href="Product-all" className="bg-green-500 w-2/5  text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Shop Now →
        </a>
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-1.webp"
          alt="Fruits"
          className="w-full h-auto mb-4"
        />
        
      </div>

      {/* Card 2 */}
      <div className="bg-pink-100 rounded-lg shadow-md p-6 flex flex-col">
        
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-2.webp"
          alt="Vegetable"
          className="w-full h-auto mb-4"
        />
        <div className="text-sm text-red-600 font-bold">VEGETABLE</div>
        <h2 className="text-4xl font-bold text-gray-800 my-2 pb-4">Frash & Goods Vegetable</h2>
        <a href="Product-all" className="bg-red-500 w-2/5  text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Shop Now →
        </a>
      </div>

      {/* Card 3 */}
      <div className="bg-purple-100 rounded-lg shadow-md p-6 flex flex-col ">
        <div className="text-sm text-purple-600 font-bold">JUICES</div>
        <h2 className="text-2xl font-bold text-gray-800 pb-4 my-2">Best Fruits Juices</h2>
        <a  href="Product-all" className="bg-purple-500 w-2/5  text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          Shop Now →
        </a>  
        <img
          src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/category-img/c-shop-img-3.webp"
          alt="Juices"
          className="w-full h-auto mb-4"
        />
        
      </div>
    </div>
    </div>
  );
};

export default Home;
