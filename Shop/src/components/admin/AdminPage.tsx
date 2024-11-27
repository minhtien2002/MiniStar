import React from "react";
import { Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="">
        <div className="w-1/4 border-solid border-[.5px] border-[#969696] fixed top-0 left-0 z-10 bg-white">
          <div className="h-20 flex justify-center items-center">
            <h2>ADMIN</h2>
          </div>
        </div>
        <div className="h-screen w-1/4 fixed left-0 top-0 overflow-y-scroll custom-scroll mt-20 border">
          <ul className="p-4">
            <li className="rounded-lg hover:bg-[rgb(245,204,255)] text-[#8a1faa]">
              <a className="flex px-3 py-2" href="/admin">
                Dashboard
              </a>
            </li>
            <li className="flex px-4 py-2">Task</li>
            <li className="rounded-lg hover:bg-[rgb(245,204,255)] text-[#8a1faa]">
              <a className="flex px-3 py-2" href="/admin/product-manage">
                Quản lý sản phẩm
              </a>
            </li>
            <li className="rounded-lg hover:bg-[rgb(245,204,255)] text-[#8a1faa]">
              <a className="flex px-3 py-2" href="/admin">
                Quản lý khách hàng
              </a>
            </li>
            <li className="rounded-lg hover:bg-[rgb(245,204,255)] text-[#8a1faa]">
              <a className="flex px-3 py-2" href="/admin">
                Quản lý đơn hàng
              </a>
            </li>
            <li className="rounded-lg hover:bg-[rgb(245,204,255)] text-[#8a1faa]">
              <a className="flex px-3 py-2" href="/admin">
                Thống kê
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-auto  col-span-3">
        <div className="w-full border-solid border-[.5px] border-[#969696]">
          <div className="h-20"></div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
