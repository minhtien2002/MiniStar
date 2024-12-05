import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import PageProduct from "./components/ProductPage";
import Cart from "./components/Cart";
import Checkout  from "./components/Checkout";
import Error from "./components/Error";
import DashBoard from "./components/admin/DashBoard";
import AdminPage from "./components/admin/AdminPage";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import { Checkorder } from "./components/Checkorder";
import { Register } from "./components/Register";
import { Index } from "./components/admin/Management/Product/Index";


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
                <Route path="product-detail" element={<ProductDetail/>}/>
                <Route path="checkorder" element={<Checkorder/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            <Route path="admin" element={<AdminPage />}>
                    <Route index element={<DashBoard />} />
                    <Route path="Management/Product/Index" element={<Index />} />
                </Route>
        </Routes>


    )
}
