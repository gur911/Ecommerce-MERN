import React, { useEffect, useState } from 'react';
import AppContext from './AppContext.jsx';
import axios from 'axios';
import {ToastContainer, toast,Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([])
  const [token,setToken] = useState([]);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user,setUser] = useState()
  const [cart,setCart] = useState({items:[]})
  const [reload,setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(api.data.products);
        setProducts(api.data.products);
        setFilteredData(api.data.products);
        userProfile();
      } catch (error) {4
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
    userCart();
    getAddress();
    UserOrder();
  }, [token]);

  useEffect(()=>{
    let lstoken = localStorage.getItem('token');
    // console.log("ls token ",lstoken);
    if(lstoken){
      setToken(lstoken);
      setIsAuthenticated(true);
    }
    // userCart()
    // setToken(localStorage.getItem('token'))
  },[])

  // register user
  const register = async (name,email,password) => {
    try {
      const api = await axios.post(`${url}/user/register`,{name,email,password}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    //   alert(api.data.message)// if user already exist
    //   console.log("user register ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return api.data;
    } catch (error) {
      console.error('Error fetching register:', error);
    }
  };

  // login user
  const login = async (email,password) => {
    try {
      const api = await axios.post(`${url}/user/login`,{email,password}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    //   alert(api.data.message)// if user already exist
    //   console.log("user register ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
      // console.log("user login",api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem('token',api.data.token);
    return api.data;
    } catch (error) {
      console.error('Error fetching register:', error);
    }
  };

  // logout user
  const logout=()=>{
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem('token')
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }

  // user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Auth":token
        },
        withCredentials: true,
      });
      // console.log("User Profile",api.data);
      setUser(api.data.user);
    } catch (error) {
      console.error('Error fetching userprofile:', error);
    }
  };

  // add to cart
  const addToCart = async (productId,title,price,qty,imgSrc) => {
    try {
      const api = await axios.post(`${url}/cart/add`, {productId,title,price,qty,imgSrc},{
        headers: {
          "Content-Type": "application/json",
          "Auth":token
        },
        withCredentials: true,
      });
      setReload(!reload);
      // console.log(api);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        userCart();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    // console.log("my cart",api);
  };

  // get user cart
  const userCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json",
          'Auth':token
        },
        withCredentials: true,
      });
      // console.log("User cart",api.data.cart);
      setCart(api.data.cart);
      // setUser(api);
    } catch (error) {
      console.error('Error fetching userprofile:', error);
    }
  };

  // decrease quantity
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // // console.log("decrease cart items ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
     setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  remove Item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token,
      },
      withCredentials: true,
    });
    setReload(!reload)
    // setCart(api.data.cart);
    // setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    userCart();
  };

  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    userCart();
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  // get User latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token,
      },
      withCredentials: true,
    });
    // shippingAddress();
    //  console.log("user address ", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  // get User Order
  const UserOrder = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token,
      },
      withCredentials: true,
    });
    //  console.log("user order ", api.data);
    //  setReload(!reload);
    //  getAddress();
    // setUserAddress(api.data.userAddress);
    setUserOrder(api.data);
  };
  // console.log("UserOrder",userOrder);

  return (
    <AppContext.Provider value={{ 
      products,
      register,
      login,
      url,
      token,
      setIsAuthenticated,
      isAuthenticated, 
      filteredData, 
      setFilteredData,
      logout, 
      user,
      addToCart,
      cart,
      decreaseQty,
      removeFromCart,
      clearCart,
      shippingAddress,
      userAddress,
      userOrder,
      getAddress,UserOrder }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;