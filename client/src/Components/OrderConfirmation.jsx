import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct.jsx";

const OrderConfirmation = () => {
  const { userOrder, UserOrder ,getAddress, userAddress } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    // Fetch user address on component mount
    UserOrder();
    getAddress();
  }, []); // Only fetch once on component mount

  useEffect(() => {
    // Set latestOrder when userOrder changes
    if (userOrder && userOrder.length > 0) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder,userAddress]);

  console.log("latestOrder", latestOrder);

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Your order has been confirmed,</h1>
        <h3 className="text-center">It will be delivered soon</h3>
      </div>

      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Order Items
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderId: {latestOrder?.orderId}</li>
                  <li>PaymentId: {latestOrder?.paymentId}</li>
                  <li>PaymentStatus: {latestOrder?.payStatus}</li>
                  {userAddress && (
                    <>
                      <li>Name: {userAddress.fullName}</li>
                      <li>Phone: {userAddress.phoneNumber}</li>
                      <li>Country: {userAddress.country}</li>
                      <li>State: {userAddress.state}</li>
                      <li>PinCode: {userAddress.pincode}</li>
                      <li>Near By: {userAddress.address}</li>
                    </>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderConfirmation;
