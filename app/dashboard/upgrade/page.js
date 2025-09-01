
"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Script from "next/script";

function Upgrade() {
  const [amount, setAmount] = useState(1);

  const { user } = useUser();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const createOrder = async () => {
  try {
    setIsProcessing(true);
    const res = await fetch("/api/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: amount * 100 }),
    });
    
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}: ${await res.text()}`);
    }
    
    const data = await res.json();
    
    if (!data || !data.id) {
      throw new Error("Invalid response from server");
    }

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,
      amount: data.amount,
      handler: async function (response) {
        try {
          const res = await fetch("/api/verifyOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userEmail: user?.primaryEmailAddress?.emailAddress
            }),
          });
          
          if (!res.ok) {
            throw new Error(`Verification failed with status: ${res.status}`);
          }
          
          const data = await res.json();
          
          if (data.isOk) {
            toast.success("Plan Upgraded Successfully");
            setTimeout(() => {
              router.push("/dashboard");
            }, 1500);
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Failed to verify payment. Please contact support.");
        }
      },
    };
    
    // Initialize Razorpay
    const razorpay = new window.Razorpay(paymentData);
    razorpay.open();
  } catch (error) {
    console.error("Order creation error:", error);
    toast.error("Failed to create order: " + error.message);
  } finally {
    setIsProcessing(false);
  }
};
  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-gray-200 p-4 md:p-6">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>

      <div className="max-w-4xl mx-auto">
        <h2 className="font-medium text-2xl md:text-3xl text-white">Plans</h2>
        <p className="text-gray-400 mb-4">
          Update Your Plan To Upload Multiple Pdf to take Notes
        </p>

        <div className="mx-auto px-0 py-4 sm:px-2 sm:py-6 lg:px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-4 md:grid-cols-2 md:items-stretch">
            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-700 p-4 md:p-6 shadow-lg bg-gradient-to-b from-gray-800 to-gray-850 sm:px-6 lg:p-8 h-full">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-300">
                  Free
                  <span className="sr-only">Free</span>
                </h2>

                <p className="mt-2">
                  <strong className="text-3xl font-bold text-white">0₹</strong>

                  <span className="text-sm font-medium text-gray-400 ml-1">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    5 PDF Upload{" "}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Unlimited Notes Taking
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Email support{" "}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-red-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    Can Not Delete Files
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Help center access{" "}
                  </span>
                </li>
              </ul>

              <div className="mt-6 md:mt-8 block rounded-full border border-blue-500 bg-gray-700/30 px-4 py-3 text-center text-sm font-medium text-blue-300">
                Current Plan
              </div>
            </div>

            {/* Premium Plan */}
            <div className="rounded-2xl border border-blue-500 p-4 md:p-6 shadow-lg bg-gradient-to-b from-gray-800 to-gray-850 sm:px-6 lg:p-8 h-full">
              <div className="text-center">
                <h2 className="text-lg font-medium text-blue-300">
                  Unlimited
                  <span className="sr-only">Unlimited</span>
                </h2>

                <p className="mt-2">
                  <strong className="text-3xl font-bold text-white">
                    ₹299
                  </strong>

                  <span className="text-sm font-medium text-gray-400 ml-1">
                    /One Time
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    Unlimited PDF Upload{" "}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Unlimited Notes Taking{" "}
                  </span>
                </li>
                <li className="flex items-center gap-2 py-1.5 px-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-green-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-blue-300 font-medium text-sm md:text-base">
                    Delete Files Anytime
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Email support{" "}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-blue-400 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-gray-300 text-sm md:text-base">
                    {" "}
                    Help center access{" "}
                  </span>
                </li>
              </ul>

              <div className="flex justify-center">
                <button
                  onClick={createOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 md:mt-8 block rounded-full border border-blue-500 bg-gray-700/30 px-4 py-3 text-center text-sm font-medium text-blue-300 hover:bg-gray-700"
                >
                  Pay with Razorpay (UPI/Cards)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
