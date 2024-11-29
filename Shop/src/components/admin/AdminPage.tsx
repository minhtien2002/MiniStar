import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FloatButton } from "antd";
import { Switch } from "antd";
import DashBoard from "./DashBoard";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  console.log(title);

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
    } else handelSetmodeLight();
  };
  return (
    <div className="flex h-screen relative">
      {/* Thanh bên trái */}
      <div className="bg-gray-800 w-1/5 text-white  p-4 fixed top-0 left-0 h-screen z-40">
        <a href="/admin">
          <div className="px-6 py-4 text-2xl font-bold">Admin Panel</div>
        </a>
        <nav>
          <ul>
            <NavLink to="/admin" onClick={() => onChangeTitle("Dashboard")}>
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Dashboard</span>
              </li>
            </NavLink>
            <NavLink
              to="/admin/Management/Product/Index"
              onClick={() => onChangeTitle("Quản lý sản phẩm")}
            >
              <li className="py-3 px-6 hover:bg-gray-700">
                <span className="block">Quản lý sản phẩm</span>
              </li>
            </NavLink>
            <NavLink to="">
              <li
                className="py-3 px-6 hover:bg-gray-700"
                onClick={() => onChangeTitle("Quản lý đơn hàng")}
              >
                <span className="block">Quản lý đơn hàng</span>
              </li>
            </NavLink>

            <NavLink to="">
              <li
                className="py-3 px-6 hover:bg-gray-700"
                onClick={() => onChangeTitle("Quản lý khách hàng")}
              >
                <span className="block">Quản lý khách hàng</span>
              </li>
            </NavLink>
            <NavLink to="">
              <li
                className="py-3 px-6 hover:bg-gray-700"
                onClick={() => onChangeTitle("Thống kê")}
              >
                <span className="block">Thống kê</span>
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>

      {/* Nội dung chính */}
      <div className="w-4/5 absolute right-0 top-14">
        <div className="bg-gray-100 rounded-md">
          <div className={mode}>
            <Outlet />
          </div>
        </div>
      </div>

      <a href="/" title="Go Home">
        <FloatButton onClick={() => console.log("onClick")} />
      </a>
      {/* Thanh trên */}
      <div className="bg-gray-200 p-4 fixed top-0 right-0 w-4/5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold ">{title}</h2>
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
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
