"use client";

import { useEffect, useRef, useState } from "react";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import { useParams } from "next/navigation";
import { ProjectType, ScreenConfig } from "@/type/type";
import axios from "axios";

export default function WorkspacePage() {
  const params = useParams();
  const projectId = params?.projectId as string;

  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
  const [projectDetail, setProjectDetail] = useState<ProjectType | null>(null);

  const [loading, setLoading] = useState(true);

  const canvasRef = useRef<HTMLDivElement>(null);

  // ---------------- FETCH PROJECT ----------------
  const getProjectDetail = async () => {
    try {
      setLoading(true);

      const result = await axios.get(
        `/api/project?projectId=${projectId}`
      );

      setProjectDetail(result?.data?.projectDetail || null);
      setScreenConfig(result?.data?.screenConfig || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- GENERATE CONFIG ----------------
  const generateScreenConfig = async () => {
    if (!projectDetail) return;

    try {
      setLoading(true);

      const result = await axios.post("/api/generate-config", {
        projectId,
        deviceType: projectDetail.device,
        userInput: projectDetail.userInput,
      });

      console.log("AI RESPONSE:", result.data);

      setScreenConfig(result.data?.content || []);
    } catch (err) {
      console.error("Generate Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EFFECT: LOAD PROJECT ----------------
  useEffect(() => {
    if (projectId) {
      getProjectDetail();
    }
  }, [projectId]);

  // ---------------- EFFECT: AUTO GENERATE ----------------
  useEffect(() => {
    if (projectDetail && screenConfig.length === 0) {
      generateScreenConfig();
    }
  }, [projectDetail, screenConfig.length]);

  const handleGenerate = (prompt: string, theme: string, font: string) => {
    console.log({ prompt, theme, font });
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f6f7fb] flex flex-col">
      <ProjectHeader onSave={() => {}} />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[320px] min-w-[320px] border-r border-gray-200 bg-white">
          <SettingsSection
            projectName={projectDetail?.userInput || "Untitled Project"}
            canvasRef={canvasRef}
            onGenerate={handleGenerate}
          />
        </div>

        {/* RIGHT PREVIEW */}
        <main className="flex-1 overflow-hidden bg-[#f6f7fb]">
          <div className="h-full flex items-center justify-center">
            {loading ? (
              <div className="text-gray-500 text-sm">
                Loading Project...
              </div>
            ) : (
              <div
                ref={canvasRef}
                className="w-[430px] h-[850px] bg-white rounded-[28px] border border-gray-200 shadow-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Design Preview
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Generate a design to see it here
                  </p>

                  {projectDetail && (
                    <div className="mt-6 text-left bg-gray-50 rounded-xl p-4 border border-gray-200 max-w-sm">
                      <p>
                        <strong>Device:</strong> {projectDetail.device}
                      </p>

                      <p className="mt-2">
                        <strong>Prompt:</strong>
                      </p>

                      <p className="text-gray-600 text-sm">
                        {projectDetail.userInput}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}