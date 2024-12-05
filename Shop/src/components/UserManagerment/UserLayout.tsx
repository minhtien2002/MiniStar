import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Cookies from "js-cookie";


export const UserLayout = () => {
   
  return (
  
   
    <div className="flex w-10/12 m-auto justify-between">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <ul className="">
          <a href="/UserManagerment/InfoUser">
            <li className="flex items-center pb-5">
              <i className="fas fa-user-circle mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#5f6368"><path d="M80-560v-320h320v320H80Zm80-80h160v-160H160v160ZM80-80v-320h320v320H80Zm80-80h160v-160H160v160Zm400-400v-320h320v320H560Zm80-80h160v-160H640v160ZM560-80v-320h320v320H560Zm80-80h160v-160H640v160ZM320-640Zm0 320Zm320-320Zm0 320Z"/></svg></i> Dash Board
            </li>
          </a>
          <a href="/UserManagerment/Information">
          
            <li className="flex items-center pb-5">
              <i className="fas fa-user-circle mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg></i> Personal Info
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center  pb-5 ">
              <i className="fas fa-credit-card mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg></i> Payment Method
            </li>
          </a>
          <a href="/UserManagerment/UserOrder">
            <li className="flex items-center  pb-5">
              <i className="fas fa-shopping-cart mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></i> Order
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center pb-5">
              <i className="fas fa-heart mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></i> Wishlist
            </li>
          </a>
          <a href="/UserManagerment/Address">
            <li className="flex items-center pb-5">
              <i className="fas fa-map-marker-alt mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h200q33 0 56.5 23.5T440-760v560q0 33-23.5 56.5T360-120H160Zm440 0q-33 0-56.5-23.5T520-200v-560q0-33 23.5-56.5T600-840h200q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H600Zm-440-80h200v-560H160v560Zm440 0h200v-560H600v560ZM200-360h120v-80H200v80Zm440 0h120v-80H640v80ZM200-480h120v-80H200v80Zm440 0h120v-80H640v80ZM200-600h120v-80H200v80Zm440 0h120v-80H640v80ZM160-200h200-200Zm440 0h200-200Z"/></svg></i> Address
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center pb-5">
              <i className="fas fa-star mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400h122l200-200q9-9 13.5-20.5T580-643q0-11-5-21.5T562-684l-36-38q-9-9-20-13.5t-23-4.5q-11 0-22.5 4.5T440-722L240-522v122Zm280-243-37-37 37 37ZM300-460v-38l101-101 20 18 18 20-101 101h-38Zm121-121 18 20-38-38 20 18Zm26 181h273v-80H527l-80 80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg></i> Reviews
            </li>
          </a>
          <a href="/UserManagerment/ChangePassword">
            <li className="flex items-center  pb-5">
              <i className="fas fa-lock mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z"/></svg></i> Change Password
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center  pb-5">
              <i className="fas fa-ticket-alt mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H600l-40-80H400l-40 80H240Zm0-80h70l40-80h260l40 80h70v-640H240v640Zm80-200h320v-22q0-52-50-75t-110-23q-60 0-110 23t-50 75v22Zm160-160q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0 40Z"/></svg></i> Support Ticket
            </li>
          </a>
          <a href="">
            <li className="flex items-center pb-5 ">
              <i className="fas fa-sign-out-alt mr-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></i> Logout
            </li>
          </a>
        </ul>
      </div>

      {/* Form Section */}

      <Outlet />
    </div>
  );
};