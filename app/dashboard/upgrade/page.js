// "use client"
// import { api } from "@/convex/_generated/api";
// import { userUpgradePlan } from "@/convex/user";
// import { useUser } from "@clerk/nextjs";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { useMutation } from "convex/react";
// import React from "react";
// import { toast } from "sonner";

// function Upgrade() {
//   const {user} = useUser();
//   const upgradeUserPlan = useMutation(api.user.userUpgradePlan)
//   const OnpaymentSuccess = async()=>{
//     const result = await upgradeUserPlan({userEmail:user?.primaryEmailAddress?.emailAddress});
//     toast("Plan Upgraded Successfully")

//   }
//   return (
//     <div>
//       <h2 className="font-medium  text-3xl">Plans</h2>
//       <p>Update Your Plan To Upload Multiple Pdf to take Notes</p>

//       <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
//           <div className="rounded-2xl border border-indigo-600 p-6 shadow-xs ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Unlimited
//                 <span className="sr-only">Unlimited</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   9.99${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /One Time
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700">Unlimited PDF Upload </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Unlimited Notes Taking </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>
//             <div className="mt-5">
//             <PayPalButtons

//              onApprove={()=>OnpaymentSuccess()}
//             onCancel={()=>console.log("Order Cancel")
//             }
//              createOrder={(_,actions)=>{
//               return actions?.order?.create({
//                 purchase_units:[
//                   {
//                     amount:{
//                      value:9.99,
//                      currency_code:'USD'
//                   }
//                   }
//                 ]
//               })
//              }}
//             />
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Free
//                 <span className="sr-only">Free</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   0${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /month
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> 5 PDF Upload </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Unlimited Notes Taking</span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>

//             <a
//               href="#"
//               className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
//             >
//              Current Plan
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Upgrade;
"use client";
import { api } from "@/convex/_generated/api";
import { userUpgradePlan } from "@/convex/user";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Upgrade() {
  const { user } = useUser();
  const router = useRouter()
  const upgradeUserPlan = useMutation(api.user.userUpgradePlan);
  const OnpaymentSuccess = async () => {
    const result = await upgradeUserPlan({
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    toast("Plan Upgraded Successfully");
     setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
  };

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-gray-200 p-4 md:p-6">
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
                  <strong className="text-3xl font-bold text-white">$0</strong>

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
                    $9.99
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

              <div className="mt-6 bg-gray-700/20 p-3 rounded-md">
                <PayPalButtons
                  style={{
                    color: "gold",
                    height: 40,
                    shape: "pill",
                  }}
                  onApprove={() => OnpaymentSuccess()}
                  onCancel={() => console.log("Order Cancel")}
                  createOrder={(_, actions) => {
                    return actions?.order?.create({
                      purchase_units: [
                        {
                          amount: {
                            value: 9.99,
                            currency_code: "USD",
                          },
                        },
                      ],
                      application_context: {
                        shipping_preference: "NO_SHIPPING",
                        user_action: "PAY_NOW",
                        return_url: window.location.href,
                        cancel_url: window.location.href,
                        brand_name: "Noter.AI",
                        popup:true,
                        landing_page: "LOGIN",
                        payment_method: {
                          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
                        },
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
