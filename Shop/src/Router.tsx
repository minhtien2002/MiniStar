import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import PageProduct from "./components/PageProduct";


export function RouteConfig() {

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="product-all" element={<PageProduct/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="product" element={<Login/>}/>
                
            </Route>
        </Routes>


    )
}