import { Card } from "antd";
import Item from "antd/es/list/Item";
import { useState } from "react";
import { addToCart } from './authUtils';

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const handleSetcountUp = () => {
    setCount((count) => count + 1);
  };
  const handleSetcountDown = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const [detail] = useState([
    {
      brand: "Vegetable",
      nameProduct: "Eggplant fruit Leucinodes orbonalis",
      discound: 50,
      price: 9.99,
      priceDiscound: 6.99,
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quo vero debitis omnis, minus quaerat dolorum odio ducimus officia, dignissimos incidunt praesentium ad nostrum enim, alias rerum consequatur molestiae maxime?.",
    },
  ]);

  const [image, setImage] = useState(0);

  const handleImage = (index: any) => {
    setImage(index);
  };

  const [imgMini] = useState([
    {
      link: "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-37.webp",
    },
    {
      link: "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-38.webp",
    },
    {
      link: "https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/product-img/p-img-36.webp",
    },
  ]);

  return (
    <div className="flex justify-center items-start py-10 px-5">
      {/* Image and Discount */}

      <div className="w-1/2 ">
        <div className="relative ">
          <img
            src={imgMini[image].link}
            alt="Eggplant"
            className="w-full rounded-md shadow h-96"
          />
          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-5 py-7 rounded-full text-sm font-bold">
            -{detail.map((item) => item.discound)}%
          </div>
        </div>

        {/* Small images */}

        <div className="flex space-x-3 mt-4 w-full cursor-pointer     ">
          {imgMini.map((item, index) => (
            <img
              src={item.link}
              alt="Small Image 1"
              className="w-16 h-16 border rounded-md "
              onClick={() => handleImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      {detail.map((item) => (
        <div className="w-1/2 pl-10">
          <p className="text-sm text-green-500 uppercase">{item.brand}</p>
          <h1 className="text-3xl font-bold my-2">{item.nameProduct}</h1>

          {/* Rating */}
          <div className="flex items-center my-2">
            <div className="text-yellow-500 text-2xl">★★★★★</div>
            <span className="ml-2 text-sm text-gray-500">6 Reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3 my-2">
            <span className="text-xl font-semibold text-gray-500 line-through">
              ${item.price}
            </span>
            <span className="text-2xl font-bold text-red-500">
              ${item.priceDiscound}
            </span>
          </div>

          <p className="text-gray-600 my-3">{item.detail}</p>

          {/* Availability */}
          <div className="bg-green-50 w-auto float-left py-1 px-3 rounded-xl">
            <p className="text-black font-medium my-2">
              <span> Availability:</span>
              <span className="font-bold text-green-500">
                132 Products Available
              </span>
            </p>
          </div>
          {/* Weight */}
          <br />
          <br />
          <div className="my-3">
            <label className="text-sm font-semibold text-gray-700">
              Weight
            </label>
            <select className="block w-full mt-1 p-2 border rounded-md">
              <option disabled>Select Weight</option>
              <option value="">0.5 Kg </option>
              <option value="">1 Kg</option>
              <option value="">3 Kg</option>
              <option value="">5 Kg</option>
              {/* Options here */}
            </select>
          </div>

          {/* Quantity and Buttons */}
          <div className="flex items-center space-x-3 mt-4">
            {/* Quantity */}
            <div className="flex items-center border rounded-md px-3 py-2">
              <button
                className="text-xl font-bold"
                onClick={handleSetcountDown}
              >
                -
              </button>
              <input
                type="text"
                value={count}
                min="1"
                className="w-10 text-center border-none outline-none bg-transparent"
              />
              <button className="text-xl font-bold" onClick={handleSetcountUp}>
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center hover:bg-green-700">
              + Add to Cart
            </button>

            {/* Wishlist Button */}
            <button className="bg-gray-200 text-xl text-gray-500 px-4 py-2 rounded-md hover:bg-gray-500 hover:text-gray-200">
              ♥
            </button>
          </div>

          {/* Category and Tags */}
          <div className="my-4">
            <p className="text-gray-600">
              Category:{" "}
              <span className="text-gray-800 font-medium">Kitchen</span>
            </p>
            <p className="text-gray-600">
              Tags:
              <span className="text-gray-800 font-medium">Beer, Foamer</span>
            </p>
            <p className="text-gray-600">
              SKU: <span className="text-gray-800 font-medium">KE-91039</span>
            </p>
          </div>

          {/* Report and Share */}
          <div className="flex space-x-1 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#EA3323"
            >
              <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
            </svg>
            <a href="" className="text-red-600 text-sm">
              Report This Item
            </a>
          </div>
          <div className="flex w-72 justify-between">
            <span className="font-light">Share This:</span>
            <a href="" className="text-green-500 hover:underline">
              FaceBook
            </a>
            <a href="" className="text-green-500 hover:underline">
              YouTube
            </a>
            <a href="" className="text-green-500 hover:underline">
              Spotify
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
