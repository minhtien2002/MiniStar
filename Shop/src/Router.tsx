import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import PageProduct from "./components/ProductPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Error from "./components/Error";
import DashBoard from "./components/admin/DashBoard";
import AdminPage from "./components/admin/AdminPage";


export function RouteConfig() {

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="*" element={<Error/>} />
                <Route index element={<Home />} />
                <Route path="product-all" element={<PageProduct />} />
                <Route path="login" element={<Login />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path="admin" element={<AdminPage />}>
                    <Route index element={<DashBoard />} />
                </Route>
        </Routes>


    )
}