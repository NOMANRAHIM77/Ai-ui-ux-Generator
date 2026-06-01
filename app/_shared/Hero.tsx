"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    title: "Travel Planner\nApp",
    icon: "✈️",
    prompt:
      "Create a modern travel planner mobile app with trip scheduling, destination search, itinerary management, hotel booking, flight tracking, travel budget management, interactive maps, dark mode, and a clean user-friendly UI.",
  },
  {
    title: "AI Learning\nPlatform",
    icon: "📚",
    prompt:
      "Design an AI-powered learning platform with personalized courses, progress tracking, quizzes, AI tutor chat, certificates, student dashboard, responsive design, and a modern educational interface.",
  },
  {
    title: "Finance\nTracker",
    icon: "💳",
    prompt:
      "Create a finance tracker app with expense management, income tracking, analytics charts, monthly budgets, savings goals, transaction history, financial insights, and a modern dashboard UI.",
  },
  {
    title: "E-Commerce\nStore",
    icon: "🛒",
    prompt:
      "Design a modern e-commerce platform with product listings, categories, shopping cart, checkout flow, product reviews, wishlist, order tracking, responsive design, and premium UI components.",
  },
  {
    title: "Smart To-Do\nPlanner",
    icon: "🗓️",
    prompt:
      "Create a smart productivity planner with task management, calendar integration, reminders, priority levels, drag-and-drop tasks, progress tracking, and a clean modern interface.",
  },
  {
    title: "Food Delivery\nApp",
    icon: "🍔",
    prompt:
      "Design a food delivery mobile app with restaurant listings, menu browsing, online ordering, live delivery tracking, payment integration, customer reviews, and a modern user experience.",
  },
  {
    title: "Kids Learning\nApp",
    icon: "🐥",
    prompt:
      "Create a colorful kids learning application with interactive games, quizzes, animated characters, progress tracking, rewards system, educational content, and child-friendly design.",
  },
];

export default function Hero() {
  const [userInput, setUserInput] = useState("");
  const [device, setDevice] = useState("mobile");
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (prompt: string) => {
    setUserInput(prompt);

    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  const onCreateProject = async () => {
    if (!userInput.trim()) {
      console.warn("Input is empty");
      return;
    }

    setLoading(true);

    const projectId = crypto.randomUUID();

    console.log("▶ Sending to API:");
    console.log("userInput:", userInput);
    console.log("device:", device);
    console.log("projectId:", projectId);

    try {
      const result = await axios.post("/api/project", {
        userInput,
        device,
        projectId,
      });

      console.log("✅ API Response:", result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Status:", error.response?.status);
        console.error("❌ Error:", error.response?.data);
      } else {
        console.error("❌ Unknown Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f8f5fb] px-4 py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,211,252,0.25),transparent_45%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.15),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-[#e8d8ff] bg-white/70 px-5 py-2 backdrop-blur-md">
          <span className="text-lg">🪄</span>
          <p className="text-sm font-medium text-[#f08d74]">
            Introducing Magic UI
          </p>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-center text-5xl font-extrabold leading-tight tracking-tight text-[#0b0720] md:text-7xl">
          Design High Quality{" "}
          <span className="bg-gradient-to-r from-[#ff8a7a] to-[#e76f6f] bg-clip-text text-transparent">
            Website and
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#ff8a7a] to-[#e76f6f] bg-clip-text text-transparent">
            Mobile App
          </span>{" "}
          Designs
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-4xl text-center text-lg text-[#4b5563]">
          From websites to mobile apps, we turn ideas into intuitive,
          high-impact digital experiences. ✨
        </p>

        {/* Input Box */}
        <div className="mt-10 w-full max-w-3xl rounded-[28px] border border-[#ece7f5] bg-white/80 p-4 shadow-xl backdrop-blur-md">
          <textarea
            placeholder="Enter what design you want to create"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="h-40 w-full resize-none bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
          />

          <div className="mt-4 flex items-center justify-between">
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger className="h-12 w-[180px] rounded-2xl border border-[#e8e4ef] bg-[#fafafa] text-base shadow-none">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="website">Website</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="h-12 w-12 rounded-2xl bg-[#ff7d6d] hover:bg-[#ff6d5b]"
              onClick={onCreateProject}
              disabled={loading}
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.prompt)}
              className="flex h-[120px] w-[140px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#e9e4ef] bg-white/80 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#ff7d6d] hover:shadow-xl"
            >
              <div className="mb-2 text-3xl">{item.icon}</div>

              <p className="whitespace-pre-line text-[17px] font-medium text-[#1f2937]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}