import React, { useContext } from "react";
import AppContext from "./Context/AppContext.jsx";
import ShowProduct from "./Components/Product/ShowProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Product/ProductDetail.jsx";
import Navbar from "./Components/Navbar.jsx";
import SearchProduct from "./Components/Product/SearchProduct.jsx";
import Register from "./Components/User/Register.jsx";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/User/Login.jsx";
import Profile from "./Components/User/Profile.jsx";
import Cart from "./Components/Cart.jsx";
import Address from "./Components/Address.jsx"
import Checkout from "./Components/Checkout.jsx";
import OrderConfirmation from "./Components/OrderConfirmation.jsx"

function App() {
  // const {data} = useContext(AppContext)// ye method ye btara h ki paas wale provider ko call krke data do
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/product/search/:term" element={<SearchProduct/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orderconfirmation" element={<OrderConfirmation/>}/>
      </Routes>
    </Router>
  );
}

export default App;
