import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import PageProduct from "./components/PageProduct";
import Cart from "./components/Cart";
import Checkout  from "./components/Checkout";
import ProductDetail  from "./components/ProductDetail";
import { Checkorder } from "./components/Checkorder";
export function RouteConfig() {

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="product-all" element={<PageProduct/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="checkout" element={<Checkout/>}/>
                <Route path="product-detail" element={<ProductDetail/>}/>
                <Route path="checkorder" element={<Checkorder/>}/>
            </Route>
            
        </Routes>


    )
}