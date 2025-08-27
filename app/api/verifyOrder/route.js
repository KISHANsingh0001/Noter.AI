import { NextResponse } from "next/server";
import crypto from "crypto";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_SECRET_ID;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");

  return sig;
};

export async function POST(request) {
  const { orderId, razorpayPaymentId, razorpaySignature, userEmail } = await request.json();

  if (!orderId || !razorpayPaymentId || !razorpaySignature || !userEmail) {
    return NextResponse.json(
      { message: "Missing required payment parameters", isOk: false },
      { status: 400 }
    );
  }

  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "Payment verification failed", isOk: false },
      { status: 400 }
    );
  }
  
  try {
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    
    // Call the userUpgradePlan mutation directly through the client
    await convex.mutation(api.user.userUpgradePlan, { 
      userEmail: userEmail 
    });
    
    console.log(`User plan upgraded successfully for ${userEmail}`);
    
    return NextResponse.json(
      { message: "Payment verified and user upgraded successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to upgrade user plan:", error);
    return NextResponse.json(
      { message: "Payment verified but upgrade failed", isOk: false, error: error.message },
      { status: 500 }
    );
  }
}