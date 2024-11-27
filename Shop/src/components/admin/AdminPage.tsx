import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FloatButton } from "antd";
import { Switch } from "antd";

function AdminPanel() {
  const [mode, setMode] = useState("text-[#26303e] bg-white");
  const handelSetmodeDask = () => {
    setMode("bg-[#26303e] text-white");
  };
  const handelSetmodeLight = () => {
    setMode("text-[#26303e] bg-white");
  };
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked == false) {
      handelSetmodeDask();
    }else handelSetmodeLight()
  };
  return (
    <div className="flex h-screen ">
      {/* Thanh bên trái */}
      <div className="bg-gray-800 w-64 text-white  p-4 fixed top-0 left-0 h-screen z-40">
        <a href="/admin/Dashboard">
          <div className="px-6 py-4 text-2xl font-bold">Admin Panel</div>
        </a>
        <nav>
          <ul>
            <a href="/admin/Dashboard">
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Dashboard</span>
              </li>
            </a>
            <a href="/admin/Management/Product/Index">
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Quản lý sản phẩm</span>
              </li>
            </a>
            <a href="">
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Quản lý đơn hàng</span>
              </li>
            </a>

            <a href="">
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Quản lý khách hàng</span>
              </li>
            </a>
            <a href="">
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Thống kê</span>
              </li>
            </a>
          </ul>
        </nav>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold ">Dashboard</h2>
          <div className="ml-60 mt-3">
            <div className={mode}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <a href="/" title="Go Home">
        <FloatButton onClick={() => console.log("onClick")} />
      </a>
      {/* Thanh trên */}
      <div className="bg-gray-200 p-4 fixed top-0 right-0 w-full">
        <div className="flex justify-end">
          <div className="p-1">
            <label htmlFor="">Thanos Búng Tay </label>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md">
            Tìm kiếm
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
