import React from "react";
import Cookies from "js-cookie";
import API_ENDPOINTS from "../apiConfig";

interface ProductProps {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
  isDeleted: boolean;
}

const Product: React.FC<ProductProps> = ({
  productId,
  productName,
  price,
  productImage,
  isDeleted,
}) => {
  const getUserId = (): string | null => {
    const userId: any = Cookies.get("userId"); // Lấy userId từ cookie
    if (!userId) {
      throw new Error("UserId is not available in cookies");
    }
    return userId;
  };
  const addToCart = async (productId: number, quantity: number) => {
    try {
      const token = Cookies.get("token"); // Hàm getCookie sẽ lấy giá trị của cookie 'token'

      if (!token) {
        // Nếu không có token, yêu cầu người dùng đăng nhập
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
      }
      const userId = getUserId();
      if (!userId) {
        console.error("User not logged in.");
        return;
      }

      const url = API_ENDPOINTS.addToCart(userId, productId, quantity);

      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Product added to cart successfully");
      } else {
        const error = await response.text();
        console.error("Failed to add product to cart:", error);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <>
      {isDeleted && (
        <a>
          <div
            className={
              "flex flex-col justify-center items-center border border-[#dadada] my-2 p-6 rounded-md shadow-lg cursor-pointer group/item hover:border-solid hover:border hover:border-[#34A853]"
            }
          >
            <img
              src={"./src/assets/images/" + productImage}
              alt={productName}
              className=" w-40 h-40 group-hover/item:scale-110"
            />
            <div className=" w-full flex flex-col gap-2 justify-center items-center">
              <div className="flex flex-col items-center">
                <p className="font-bold text-2xl pt-2">{productName}</p>
              </div>
              <span className="text-red-500 font-bold text-xl">${price}</span>
              <div className="w-full text-[#34A853] font-medium rounded-lg bg-green-100 hover:bg-[#34A853] flex justify-center gap-1 group hover:text-white">
                <img
                  src="./src/assets/images/icon-plus-green.svg"
                  alt=""
                  className="group-hover:hidden"
                />
                <img
                  src="./src/assets/images/icon-plus-white.svg"
                  alt=""
                  className="hidden group-hover:block"
                />
                <a
                  onClick={() => addToCart(productId, 1)}
                  type="button"
                  className="py-2"
                >
                  Add To Cart
                </a>
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default Product;
