import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const MainLayout: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra cookie để xác định trạng thái đăng nhập
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Xóa cookie và cập nhật trạng thái
        Cookies.remove('token');
        setIsLoggedIn(false);
        alert('Logged out successfully!');
    };
return (
    <div id="wrapper" className="bg-white ">
      <div>
        {/* header */}

        <header>
          <div className="top-header   bg-[#f5faf5]">
            <div className="flex w-10/12 m-auto justify-between">
              <ul className="flex gap-3 p-4 ">
                <li className="cursor-pointer  hover:text-red-600">
                  <a href="#"></a>Account
                </li>
                <li className="cursor-pointer  hover:text-red-600">
                  <a href="#"></a>Track Order
                </li>
                <li className="cursor-pointer  hover:text-red-600">
                  <a href="#"></a>Support
                </li>
              </ul>
              <ul className="flex gap-3 p-4">
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#78A75A"
                  >
                    <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                  </svg>
                  <span>+ 0123443223</span>
                </li>
                <li className="text-inherit">|</li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#78A75A"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>{" "}
                  <span> YourMail@mail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div id="mid-header" className=" w-10/12 m-auto flex justify-between">
            <a href="/"> <img
              className="py-6 cursor-pointer"
              src="https://quomodosoft.com/html/ecoshop/assets/images/logos/logo.webp"
              alt=""
            /></a>

            <form action="" className="flex  items-center">
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 focus:outline-none"
                  placeholder="Search Product..."
                />
                <span>|</span>
                <select className="px-4 py-2">
                  <option selected hidden disabled>
                    All Categories
                  </option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruits</option>
                  <option value="Juice">Juice</option>
                  <option value="Meet">Meet</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="submit"
                  value="Search"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md cursor-pointer "
                />
              </div>
            </form>

            <ul className="flex gap-5 pt-6">
              <li>
                <a href="" className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26px"
                    viewBox="0 -960 960 960"
                    width="26px"
                    fill="#000000"
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                  </svg>
                  <span className="text-[7px] absolute top-0 -right-1 rounded-full border bg-green-500 text-center w-3 text-white">
                    0
                  </span>
                </a>
              </li>
              <li>
                <a href="cart" className="relative ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26px"
                    viewBox="0 -960 960 960"
                    width="26px"
                    fill="#000000"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                  <span className="text-[7px] absolute top-0 -right-1 rounded-full border bg-green-500 text-center w-3 text-white">
                    0
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26px"
                    viewBox="0 -960 960 960"
                    width="26px"
                    fill="#000000"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="bot-header w-full bg-green-500 ">
            <div className="w-10/12 items-center m-auto">
              <nav className="bg-green-500 text-white flex justify-between items-center px-4 py-2">
                <div className="menu-icon text-black ">
                  <select
                    name=""
                    id=""
                    className="h-10 w-52 rounded-md px-3 cursor-pointer"
                  >
                    <option value="" disabled hidden selected>
                      All Categorie
                    </option>
                    <option value="">
                      <a href="#">Vegetable</a>
                    </option>
                    <option value="">
                      <a href="">Fruis</a>
                    </option>
                    <option value="">
                      <a href="">Juice</a>
                    </option>
                    <option value="">
                      <a href="">Meat</a>
                    </option>
                    <option value="">
                      <a href="">Smoothie</a>
                    </option>
                    <option value="">
                      <a href="">Bread</a>
                    </option>
                    <option value="">
                      <a href="">Sea Food</a>
                    </option>
                    <option value="">
                      <a href="">Pet Food</a>
                    </option>
                    <option value="">
                      <a href="">Milk & Drink</a>
                    </option>
                    <option value="">
                      <a href="">Protein</a>
                    </option>
                  </select>
                </div>
                <div className="hidden md:flex space-x-8">
                  <a href="/" className="hover:text-gray-200 font-semibold">
                    Home
                  </a>
                  <a
                    href="product-all"
                    className="hover:text-gray-200 font-semibold relative group"
                  >Shop+</a>
                  <a
                    href="#"
                    className="hover:text-gray-200 font-semibold group relative"
                  >
                    Pages+
                    <ul className=" hidden bg-white absolute w-64  shadow-xl rounded-lg p-5 text-black group-hover:block   ">
                      <li className="pb-4 hover:text-green-500">
                        <a href="">Product-details</a>
                      </li>
                      <li className="pb-4 hover:text-green-500">
                        <a href="">Privacy Policy</a>
                      </li>
                      <li className="pb-4 hover:text-green-500">
                        <a href="">Terms & Condition</a>
                      </li>
                      <li className="pb-4 hover:text-green-500">
                        <a href="">FAQ</a>
                      </li>
                      <li className="pb-4 hover:text-green-500">
                        <a href="">Shop Category Icon</a>
                      </li>
                      <li className=" hover:text-green-500">
                        <a href="">Shop List View</a>
                      </li>
                    </ul>
                  </a>
                  <a href="#" className="hover:text-gray-200 font-semibold">
                    About
                  </a>
                  <a href="#" className="hover:text-gray-200 font-semibold">
                    Blog
                  </a>
                  <a href="#" className="hover:text-gray-200 font-semibold">
                    User Dashboard
                  </a>
                  <a href="#" className="hover:text-gray-200 font-semibold">
                    Contact
                  </a>
                </div>
                 {isLoggedIn ? (
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-9 rounded">
                    Logout
                </button>
            ) : (
                <a href="/login" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-9 rounded">
                    Login
                </a>
            )}
              </nav>
            </div>
          </div>
        </header>
        {/* end header */}

        <div className=" w-10/12 m-auto mb-[5rem] pt-5">
          <Outlet />
        </div>

        {/* footer */}
        <footer className=" h-auto py-10 bg-[#212529]">
          <div className=" bg-[url('./src/assets/images/footer-top-bg.webp')]  bg-center  bg-cover w-full  h-96 z-30 -translate-y-28 ">
            <div className=" text-white py-12 ">
              <div className="container mx-auto text-center translate-y-14 translate-x-1/2 w-1/3">
                <h2 className="text-3xl font-bold mb-4">
                  Get <span className="text-yellow-400">20%</span> Off Discount
                  Coupon
                </h2>
                <p className="text-lg mb-8">by Subscribe our Newsletter</p>
                <div className="flex items-center translate-x-16">
                  <form action="">
                    <input
                      type="email"
                      className="flex-1 px-8 py-3 rounded-l-lg text-black focus:outline-none"
                      placeholder="EMAIL ADDRESS"
                    />
                    <input
                      type="submit"
                      value="Get The Coupon"
                      className="bg-yellow-500 hover:bg-yellow-600  text-black font-bold py-3 px-4 rounded-r-lg"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-10/12 m-auto">
            <div className=" text-[#c8c8c8]  -translate-y-20 flex flex-row border-b-0">
              <div className="w-1/4 ">
                <img
                  className="py-6 cursor-pointer"
                  src="https://quomodosoft.com/html/ecoshop/assets/images/logos/footer-logo.webp"
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="py-4">
                    <a className=" hover:text-green-500 " href="">
                      Track Order
                    </a>
                  </div>
                  <div className="py-4">
                    {" "}
                    <a className=" hover:text-green-500" href="">
                      Delivery & Returns
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Warranty
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/4 pt-3">
                <div className="flex flex-col">
                  <h2 className="py-4 font-bold text-xl text-white">
                    About Us
                  </h2>
                  <div className="py-4">
                    <a className=" hover:text-green-500 " href="">
                      Rave's Story
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Work With Us
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Coporate News
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Investors
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-1/4 pt-3">
                <div className="flex flex-col">
                  <h2 className="py-4 font-bold text-xl text-white">
                    Useful Links
                  </h2>
                  <div className="py-4">
                    <a className=" hover:text-green-500 " href="">
                      Secure Payment
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Privacy Policy
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Terms of Use
                    </a>
                  </div>
                  <div className="py-4">
                    <a className=" hover:text-green-500" href="">
                      Archived Products
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/4 pt-3">
                <div className="flex flex-col">
                  <h2 className="py-4 font-bold text-xl text-white">
                    Contact Info
                  </h2>
                  <div className="flex flex-row pb-7">
                    <svg
                      className=" translate-y-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="40px"
                      viewBox="0 -960 960 960"
                      width="50px"
                      fill="#c8c8c8"
                    >
                      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                    </svg>{" "}
                    <div className="px-3">
                      <p className="font-bold text-xl text-white pb-3 ">
                        Address:
                      </p>
                      <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                    </div>
                  </div>

                  <div className="flex flex-row pb-7">
                    <svg
                      className="  translate-y-3"
                      xmlns="http://www.w3.org/2000/svg"
                      height="40px"
                      viewBox="0 -960 960 960"
                      width="40px"
                      fill="#c8c8c8"
                    >
                      <path d="M795-120q-116 0-236.5-56T335-335Q232-438 176-558.5T120-795q0-19.29 12.86-32.14Q145.71-840 165-840h140q14 0 24 10t14 25l26.93 125.64Q372-665 369.5-653.5t-10.73 19.73L259-533q26 44 55 82t64 72q37 38 78 69.5t86 55.5l95-98q10-11 23.15-15 13.15-4 25.85-2l119 26q15 4 25 16.04 10 12.05 10 26.96v135q0 19.29-12.86 32.14Q814.29-120 795-120ZM229-588l81-82-23-110H180q2 42 13.5 88.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z" />
                    </svg>
                    <div className="px-3">
                      <p className="font-bold text-xl text-white pb-3 ">
                        Phone:
                      </p>
                      <p>+880171889547</p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <svg
                      className=" translate-y-3"
                      xmlns="http://www.w3.org/2000/svg"
                      height="42px"
                      viewBox="0 -960 960 960"
                      width="42px"
                      fill="#c8c8c8"
                    >
                      <path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
                    </svg>
                    <div className="px-3">
                      <p className="font-bold text-xl text-white pb-3 ">
                        Email:
                      </p>
                      <p>Demo@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-7 border-t-2 border-[#9e9c9c] flex flex-row ">
              <div className="flex flex-row translate-y-1">
                <a href="">
                  <svg
                    className="mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
                  </svg>
                </a>
              </div>
              <div className="text-[#c6c6c6] text-lg font-bold w-full">
                &copy; 2024
                <a className="text-green-500 px-1" href="https://www.facebook.com/hai.tuan.f11">
                  TunaHari.
                </a>
                All rights reserved.
              </div>
              <div className="h-6 w-full flex justify-end px-4">
                <img
                  src="https://quomodosoft.com/html/ecoshop/assets/images/homepage-one/payment-img.png"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </footer>
        {/* end footer */}
      </div>
    </div>
  );
};

export default MainLayout;
