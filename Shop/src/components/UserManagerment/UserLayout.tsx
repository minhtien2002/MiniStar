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
              <i className="fas fa-user-circle mr-2"></i> Dash Board
            </li>
          </a>
          <a href="/UserManagerment/Information">
            <li className="flex items-center pb-5">
              <i className="fas fa-user-circle mr-2"></i> Personal Info
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center  pb-5 ">
              <i className="fas fa-credit-card mr-2"></i> Payment Method
            </li>
          </a>
          <a href="/UserManagerment/UserOrder">
            <li className="flex items-center  pb-5">
              <i className="fas fa-shopping-cart mr-2"></i> Order
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center pb-5">
              <i className="fas fa-heart mr-2"></i> Wishlist
            </li>
          </a>
          <a href="/UserManagerment/Address">
            <li className="flex items-center pb-5">
              <i className="fas fa-map-marker-alt mr-2"></i> Address
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center pb-5">
              <i className="fas fa-star mr-2"></i> Reviews
            </li>
          </a>
          <a href="/UserManagerment/ChangePassword">
            <li className="flex items-center  pb-5">
              <i className="fas fa-lock mr-2"></i> Change Password
            </li>
          </a>
          <a href="" className="pointer-events-none text-gray-500">
            <li className="flex items-center  pb-5">
              <i className="fas fa-ticket-alt mr-2"></i> Support Ticket
            </li>
          </a>
          <a href="">
            <li className="flex items-center pb-5 ">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </li>
          </a>
        </ul>
      </div>

      {/* Form Section */}

      <Outlet />
    </div>
  );
};
