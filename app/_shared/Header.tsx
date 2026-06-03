// components/Header.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#f1edf7] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5b21b6] to-[#ec4899] shadow-md">
            <div className="h-5 w-5 rotate-45 rounded-sm bg-white/80" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#ff7d6d]">UIUX</span>{" "}
            <span className="text-[#1e1b4b]">MOCK</span>
          </h2>
        </div>

        {/* Links */}
        <nav className="hidden items-center gap-12 md:flex">
          <Link
            href="/"
            className="text-[17px] font-medium text-[#111827] transition hover:text-[#ff7d6d]"
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className="text-[17px] font-medium text-[#111827] transition hover:text-[#ff7d6d]"
          >
            Pricing
          </Link>
        </nav>

        {/* CTA */}
        <SignInButton   mode="modal" >
        <Button className="rounded-xl bg-[#ff7d6d] px-7 py-6 text-[15px] font-semibold shadow-md transition hover:bg-[#ff6d5b]">
          Get Started
        </Button>
        </SignInButton>
        
      </div>
    </header>
  );
}