import UserService from "../service/UserService";
import { PaymentButton } from "./PaymentButton";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderInfo = location.state?.orderInfo; // Access passed order info
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        contactNumber: "",
        city: "",
    });

    useEffect(() => {
        fetchUserProfile();
    }, []); 

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const userProfile = await UserService.getYourProfile(token);
            console.log("user profile", userProfile.ourUsers);
            setUser({
                name: userProfile.ourUsers.name,
                email: userProfile.ourUsers.email,
                role: userProfile.ourUsers.role,
                contactNumber: userProfile.ourUsers.contactNumber,
                id: userProfile.ourUsers.id,
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const orderDetails = {
        orderId: orderInfo.billId || "",
        items: "Service/Reapir Bill",
        amount: orderInfo.price || "",
        customerName: user.name || "",
        email: user?.email || "",
        phone: user?.contactNumber || "",
        city: user?.city || "Colombo"
    };
  
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 -top-2 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <FaArrowLeft className="w-5 h-5 mr-1"/>
                    <span>Back</span>
                </button>

                {/* PayHere-style header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Complete your purchase securely with PayHere
                    </p>
                </div>

                {/* Main checkout card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Order summary section */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                    </div>

                    {/* Order details */}
                    <div className="px-6 py-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Order ID</span>
                            <span className="text-gray-900 font-medium">{orderDetails.orderId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Amount</span>
                            <span className="text-gray-900 font-medium">LKR {orderDetails.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Customer</span>
                            <span className="text-gray-900 font-medium">{orderDetails.customerName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Email</span>
                            <span className="text-gray-900 font-medium">{orderDetails.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Contact Number</span>
                            <span className="text-gray-900 font-medium">{orderDetails.phone}</span>
                        </div>
                    </div>

                    {/* Total amount section */}
                    <div className="bg-gray-50 px-6 py-4">
                        <div className="flex justify-between">
                            <span className="text-base font-medium text-gray-900">Total Amount</span>
                            <span className="text-base font-medium text-gray-900">LKR {orderDetails.amount}</span>
                        </div>
                    </div>

                    {/* Payment button section */}
                    <div className="px-6 py-4">
                        <PaymentButton orderDetails={orderDetails} />
                    </div>

                    {/* Security badges */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="text-xs text-gray-500 text-center">
                                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Secure Payment
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                SSL Encrypted
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <p className="mt-4 text-center text-xs text-gray-500">
                    By proceeding with the payment, you agree to PayHere's terms of service
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;