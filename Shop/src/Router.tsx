import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import PageProduct from "./components/ProductPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Error from "./components/Error";
import DashBoard from "./components/admin/DashBoard";
import AdminPage from "./components/admin/AdminPage";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import { Checkorder } from "./components/Checkorder";
import { Register } from "./components/Register";
import { Index } from "./components/admin/Management/Product/Index";
import { UserLayout } from "./components/UserManagerment/UserLayout";
import { DashBoardUser } from "./components/UserManagerment/InforUser/DashBoardUser";
import { Information } from "./components/UserManagerment/InforUser/Information";
import { Address } from "./components/UserManagerment/InforUser/Address";
import ChangePassword from "./components/UserManagerment/InforUser/ChangePassword";
import EditUserProfile from "./components/UserManagerment/InforUser/EditUserProfile";
import { UserOrder } from "./components/UserManagerment/InforUser/UserOrder";
import { Contact } from "./components/Contact";
import { IndexUser } from "./components/admin/Management/User/IndexUser";
import { IndexOrder } from "./components/admin/Management/Order/IndexOrder";
import AboutUs from "./components/AboutUs";
import Blog from "./components/Blog";
export function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="*" element={<Error />} />
        <Route index element={<Home />} />
        <Route path="product-all" element={<PageProduct />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product-detail" element={<ProductDetail />} />
        <Route path="checkorder/:orderId" element={<Checkorder />} />
        <Route path="register" element={<Register />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="Bloger" element={<Blog />} />
        <Route path="UserManagerment" element={<UserLayout />}>
          <Route index element={<DashBoardUser />} />
          <Route path="InfoUser" element={<DashBoardUser />} />
          <Route path="Information" element={<Information />} />
          <Route path="Address" element={<Address />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
          <Route path="EditUserProfile" element={<EditUserProfile />} />
          <Route path="UserOrder" element={<UserOrder />} />
        </Route>
      </Route>
      <Route path="admin" element={<AdminPage />}>
        <Route index element={<DashBoard />} />
        <Route path="Management/Product/Index" element={<Index />} />
        <Route path="Management/User/IndexUser" element={<IndexUser />} />
        <Route path="Management/Order/IndexOrder" element={<IndexOrder />} />

      </Route>
    </Routes>
  );
}
