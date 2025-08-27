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

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/dashboard.png",
    "/workspace.png"
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-gray-100 overflow-y-auto">
      {/* Navigation */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-800 flex items-center justify-between bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800">
        <div className="flex items-center gap-2">
          <Image
            src="/ai.png"
            alt="Noter.AI"
            width={50}
            height={30}
            className="object-contain"
          />
          <span className="font-bold text-2xl text-gray-100">Noter.AI</span>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-200 bg-gray-800/50 hover:bg-gray-700"
                >
                  Go to Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-200 bg-gray-800/50 hover:bg-gray-700"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
 {/* Announcement Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center text-sm sm:text-base font-medium">
        <div className="flex items-center justify-center gap-2">
          <Megaphone className="h-5 w-5" />
          <span>
            Limited Time Offer: Sign up now and get a{" "}
            <span className="font-bold underline">FREE Premium Upgrade!</span> New
            pricing is coming soon.
          </span>
        </div>
      </div> */}
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-y-0 right-1/3 w-1/3 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute inset-y-0 left-1/3 w-1/3 bg-purple-500/10 blur-3xl rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 gradient-text">
            Intelligent PDF Note-Taking <br /> Powered by AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Upload your PDFs, take smart notes, and use AI to extract insights
            from your documents. Perfect for students, researchers, and
            professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Image Carousel */}
          {/* Image Carousel */}
<div className="p-1 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-blue-500/40 rounded-2xl">
  <div className="bg-gray-900/90 rounded-xl overflow-hidden">
    <div className="relative aspect-[16/9] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Noter.AI Screenshot ${index + 1}`}
            fill
            className="object-contain" // Changed from object-cover to object-contain
            priority
          />
        </div>
      ))}

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentImage === index
                ? "bg-blue-500 scale-110"
                : "bg-gray-400/50 hover:bg-gray-300/60"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

      {/* Caption */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-white font-medium px-4">
        {currentImage === 0 && "Organize your PDFs in one place"}
        {currentImage === 1 && "Take notes alongside your documents"}
        {currentImage === 2 && "Ask AI questions about your PDFs"}
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-850 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/70 transition-all">
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-5">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                PDF Management
              </h3>
              <p className="text-gray-300">
                Upload and organize multiple PDF files in one secure place.
                Access your documents anytime, anywhere.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 hover:bg-gray-800/70 transition-all">
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-5">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                AI-Powered Search
              </h3>
              <p className="text-gray-300">
                Ask questions about your documents and get instant answers. Our
                AI understands your PDFs and extracts relevant information.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 hover:bg-gray-800/70 transition-all">
              <div className="h-12 w-12 rounded-lg bg-cyan-600/20 flex items-center justify-center mb-5">
                <Sparkles className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                Smart Note-Taking
              </h3>
              <p className="text-gray-300">
                Take and organize notes directly alongside your PDFs. Format
                your notes with a rich text editor for better organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Section - NEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">
            See Noter.AI in Action
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-16">
            Explore our intuitive interface and powerful AI features designed to
            help you work efficiently with your PDF documents.
          </p>

          <div className="group mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-gray-700/50 mb-4 transition-all group-hover:border-blue-500/30">
              <div className="relative aspect-video">
                <Image
                  src="/workspace.png"
                  alt="PDF Workspace"
                  fill
                  className="object-contain bg-gray-900"
                  priority
                />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white text-center">
              Powerful PDF Workspace
            </h3>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              Our clean, intuitive interface gives you a distraction-free
              environment to study and take notes alongside your PDF documents.
            </p>
          </div>

          {/* Add a second image if you want */}
          <div className="group mx-auto max-w-4xl mt-16">
            <div className="overflow-hidden rounded-xl border border-gray-700/50 mb-4 transition-all group-hover:border-purple-500/30">
              <div className="relative aspect-video">
                <Image
                  src="/dashboard.png"
                  alt="PDF Dashboard"
                  fill
                  className="object-contain bg-gray-900"
                  priority
                />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white text-center">
              Organized Dashboard
            </h3>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              Keep all your documents organized and easily accessible from your
              personalized dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Rest of your sections... */}

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-850">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "1",
                title: "Upload PDF",
                desc: "Upload your PDF documents to your secure workspace",
              },
              {
                num: "2",
                title: "Study Content",
                desc: "View and read your PDF files in our clean interface",
              },
              {
                num: "3",
                title: "Ask AI",
                desc: "Use AI to search and extract information from your documents",
              },
              {
                num: "4",
                title: "Take Notes",
                desc: "Create and save notes alongside your PDF content",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-400">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent absolute left-1/2 top-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* Footer */}
      <footer className="mt-20 py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/ai.png"
              alt="Noter.AI"
              width={40}
              height={24}
              className="object-contain"
            />
            <span className="font-medium text-lg text-gray-300">Noter.AI</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/KISHANsingh0001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kishan-singh-thakur-26b912255/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/KishanS36200218"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:kishanthakur27@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-right">
            © {new Date().getFullYear()} ❤️ Kishan Singh Thakur. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* Add this style for gradient text */}
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
