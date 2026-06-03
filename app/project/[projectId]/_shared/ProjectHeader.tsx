"use client";

import { Check, Save } from "lucide-react";
import { useState } from "react";

interface ProjectHeaderProps {
  projectName?: string;
  onSave?: () => void;
}

export default function ProjectHeader({
  onSave,
}: ProjectHeaderProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onSave?.();

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <header className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>

        <div>
          <h1 className="font-semibold text-gray-900">Magic UI</h1>
          <p className="text-xs text-gray-500">
            AI Design Workspace
          </p>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-medium transition-all
        ${
          saved
            ? "bg-green-50 text-green-600 border border-green-200"
            : "bg-gray-900 text-white hover:bg-black"
        }`}
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" />
            Saved
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save
          </>
        )}
      </button>
    </header>
  );
}