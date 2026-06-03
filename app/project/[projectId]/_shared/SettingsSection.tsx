"use client";

import { useState } from "react";
import {
  Camera,
  Sparkles,
  ChevronDown,
  Type,
} from "lucide-react";

const themes = [
  {
    id: "netflix",
    name: "Netflix",
    colors: ["#E50914", "#141414", "#B81D24", "#FFFFFF"],
  },
  {
    id: "spotify",
    name: "Spotify",
    colors: ["#1DB954", "#191414", "#1ED760", "#FFFFFF"],
  },
  {
    id: "amazon",
    name: "Amazon",
    colors: ["#FF9900", "#232F3E", "#146EB4", "#FFFFFF"],
  },
  {
    id: "google",
    name: "Google",
    colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
  },
  {
    id: "apple",
    name: "Apple",
    colors: ["#000000", "#555555", "#AAAAAA", "#FFFFFF"],
  },
  {
    id: "meta",
    name: "Meta",
    colors: ["#0866FF", "#1C2B33", "#42B72A", "#FFFFFF"],
  },
  {
    id: "youtube",
    name: "YouTube",
    colors: ["#FF0000", "#282828", "#606060", "#FFFFFF"],
  },
  {
    id: "airbnb",
    name: "Airbnb",
    colors: ["#FF5A5F", "#484848", "#767676", "#FFFFFF"],
  },
];

const fonts = [
  "Plus Jakarta Sans",
  "Inter",
  "Geist",
  "Poppins",
  "Sora",
  "DM Sans",
];

interface SettingsSectionProps {
  projectName?: string;
  onGenerate?: (
    prompt: string,
    theme: string,
    font: string
  ) => void;
  onScreenshot?: () => void;
  canvasRef?: React.RefObject<HTMLDivElement>;
}

export default function SettingsSection({
  projectName = "My Screen",
  onGenerate,
  onScreenshot,
}: SettingsSectionProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedTheme, setSelectedTheme] =
    useState("aurora");
  const [selectedFont, setSelectedFont] =
    useState("Plus Jakarta Sans");
  const [fontOpen, setFontOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);

    try {
      await onGenerate?.(
        prompt,
        selectedTheme,
        selectedFont
      );
    } finally {
      setGenerating(false);
    }
  };

  
  return (
   <aside className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">
          Settings
        </h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Project */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-2 block">
            Project
          </label>

          <div className="h-11 px-4 flex items-center rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700">
            {projectName}
          </div>
        </div>

        {/* Prompt */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            AI Prompt
          </label>

          <textarea
            rows={5}
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Describe the screen UI/UX you want..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-orange-400
              focus:ring-4
              focus:ring-orange-100
            "
          />

          <button
            onClick={handleGenerate}
            disabled={
              generating || !prompt.trim()
            }
            className="
              mt-3
              h-11
              w-full
              rounded-xl
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              text-sm
              font-medium
              transition
              hover:opacity-95
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {generating
              ? "Generating..."
              : "Generate"}
          </button>
        </div>

        {/* Themes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Themes
            </h3>

            <span className="text-xs text-gray-400">
              {themes.length}
            </span>
          </div>

          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() =>
                  setSelectedTheme(theme.id)
                }
                className={`
                  w-full
                  rounded-2xl
                  border
                  p-3
                  bg-white
                  transition-all
                  text-left
                  ${
                    selectedTheme === theme.id
                      ? "border-orange-400 ring-2 ring-orange-100"
                      : "border-gray-200 hover:border-orange-200"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">
                    {theme.name}
                  </span>

                  <div className="flex gap-1">
                    {theme.colors.map(
                      (color, index) => (
                        <span
                          key={index}
                          className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            <Type className="w-3.5 h-3.5" />
            Font
          </label>

          <div className="relative">
            <button
              onClick={() =>
                setFontOpen(!fontOpen)
              }
              className="
                w-full
                h-11
                rounded-xl
                bg-white
                border
                border-gray-200
                px-4
                flex
                items-center
                justify-between
                text-sm
              "
            >
              <span>{selectedFont}</span>

              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  fontOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {fontOpen && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  mt-2
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  shadow-xl
                  overflow-hidden
                  z-50
                "
              >
                {fonts.map((font) => (
                  <button
                    key={font}
                    onClick={() => {
                      setSelectedFont(font);
                      setFontOpen(false);
                    }}
                    className={`
                      w-full
                      text-left
                      px-4
                      py-3
                      text-sm
                      transition
                      ${
                        selectedFont === font
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    {font}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-200 p-4 bg-[#fafafa]">
        <button
          onClick={onScreenshot}
          className="
            w-full
            h-11
            rounded-xl
            border
            border-gray-200
            bg-white
            flex
            items-center
            justify-center
            gap-2
            text-sm
            font-medium
            hover:bg-gray-50
            transition
          "
        >
          <Camera className="w-4 h-4" />
          Screenshot
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-2">
          Save canvas as PNG
        </p>
      </div>
    </aside>
  );
}