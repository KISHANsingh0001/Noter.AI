import { NextResponse } from "next/server";

const Razorpay = require("razorpay");


const razorpay = new Razorpay({
    key_id:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET_ID,
});

export async function POST(req) {
    const { amount} = await req.json();
    try {
        const order = await razorpay.orders.create({
            amount,
            currency:"INR",
        });
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}