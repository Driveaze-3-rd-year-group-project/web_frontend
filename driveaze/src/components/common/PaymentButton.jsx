import React from "react";
import axios from "axios";

const PaymentButton = ({ orderDetails, token }) => {
  const sendNotifyRequest = async (paymentObject) => {
    try {
      // Send notification to your backend
      const response = await axios.post(
        "http://localhost:8082/api/payment/notify",
        paymentObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Notification sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const initializePayment = () => {
    // PayHere Sandbox Payment Configuration
    const paymentObject = {
      sandbox: true,
      merchant_id: "1228904",
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: "http://localhost:8082/api/payment/notify",
      order_id: orderDetails.orderId,
      items: orderDetails.items,
      amount: orderDetails.amount,
      currency: "LKR",
      first_name: orderDetails.customerName,
      last_name: "",
      email: orderDetails.email,
      phone: orderDetails.phone,
      address: orderDetails.address || "",
      city: orderDetails.city || "Colombo",
      country: "Sri Lanka",
      delivery_address: orderDetails.address || "",
      delivery_city: orderDetails.city || "Colombo",
      delivery_country: "Sri Lanka",
    };

    // Send notify request
    sendNotifyRequest(paymentObject);

    // Prepare payment form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payhere.lk/pay/checkout";

    Object.entries(paymentObject).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <button
      onClick={initializePayment}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
    >
      <span>Pay with PayHere</span>
      <span>LKR {orderDetails.amount}</span>
    </button>
  );
};

export { PaymentButton };
