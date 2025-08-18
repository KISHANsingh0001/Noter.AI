import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from "next/font/google"
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"


export const metadata = {
  title: "Noter.AI - Intelligent PDF Note-Taking",
  description: "Noter.AI is a powerful tool for managing PDFs, taking notes, and leveraging AI to extract insights from your documents.",
};
const outfit = Outfit({subsets:['latin']})
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
          <link rel="icon" href="/ai.png" type="image/x-icon" />
          <meta name="description" content={metadata.description} />
        </head>
      <body className={outfit.className}>
        <Provider>
          {children}
          <Toaster/>
        </Provider>
      </body>
    </html>
  </ClerkProvider>
  );
}
