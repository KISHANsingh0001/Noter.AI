"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <ConvexProvider client={convex}>
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            debug:true,
            currency:'USD'
           }}
        >
          {children}
        </PayPalScriptProvider>
      </ConvexProvider>
    </div>
  );
}

export default Provider;
