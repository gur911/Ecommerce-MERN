// "rzp_test_LZebZCstoqRNu7"
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;

      var options = {
        key: "rzp_test_LZebZCstoqRNu7", // Use environment variable
        amount: orderAmount * 100,
        currency: "INR",
        name: "MERN Payment",
        description: "Web Dev Mastery",
        order_id: orderId,
        handler: async function (response) {
          try {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: orderAmount,
              orderItems: cart?.items,
              userId: user._id,
              userShipping: userAddress,
            };

            const api = await axios.post(
              `${url}/payment/verify-payment`,
              paymentData
            );

            if (api.data.success) {
              clearCart();
              navigate("/orderconfirmation");
            } else {
              alert('Payment verification failed. Please try again.');
            }
          } catch (error) {
            console.error("Payment verification error", error);
            alert('There was an error verifying your payment. Please try again.');
          }
        },
        prefill: {
          name: user?.name || "MERN Payment",
          email: user?.email || "sardarji@gmail.com",
          contact: user?.contact || "9000090000",
        },
        notes: {
          address: userAddress?.address || "Jorian YamunaNagar",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization error", error);
      alert('There was an error initializing the payment. Please try again.');
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>PinCode: {userAddress?.pincode}</li>
                  <li>Near By: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
