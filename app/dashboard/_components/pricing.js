"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  Brain,
  Search,
  Megaphone,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
function Pricing() {
 const { isSignedIn } = useUser();
  return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="mb-4 text-gray-400 text-sm uppercase font-medium tracking-wide">
                Free
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white">₹0</h3>
              <p className="text-gray-300 mb-6 text-sm">Forever free</p>

              <div className="h-px w-full bg-gray-700/50 my-6"></div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">5 PDF uploads</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">Unlimited note-taking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">AI-powered search</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
           <div className="relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-blue-700/30 hover:border-blue-600/50 transition-all">
              <div className="absolute -top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="mb-4 text-blue-400 text-sm uppercase font-medium tracking-wide">
                Premium
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white">₹499</h3>
              <p className="text-gray-300 mb-6 text-sm">One-time payment</p>

              <div className="h-px w-full bg-blue-700/30 my-6"></div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">Unlimited PDF uploads</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">Unlimited note-taking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300">Advanced AI features</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-gray-300 font-medium">
                    Delete files anytime
                  </span>
                </li>
              </ul>
              <Link href={isSignedIn ? "/" : "/sign-up"}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Upgrade to Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Pricing;
