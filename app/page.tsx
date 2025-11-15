"use client";

import Link from "next/link";
import { useState } from "react";
import CopyIcon from "@/components/CopyIcon";
import CheckIcon from "@/components/CheckIcon";
import { LayoutTransitionAnimation } from "@/components/LayoutTransitionAnimation";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const installCommand = "npm install meridian";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3d4f3a 1px, transparent 1px),
            linear-gradient(to bottom, #3d4f3a 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",

          opacity: 0.04,
        }}
      />
      <div className="flex flex-col-reverse items-center justify-center">
        <div className="relative pt-[11vh] z-10 flex flex-col items-center">
          <div className="flex items-center gap-8 justify-center select-none">
            <img src="/logo.svg" alt="Meridian" className="h-36" />
            <h1 className="text-9xl tracking-[-0.07em]">Meridian</h1>
          </div>
          <p className="mt-8">
            A design framework for Malleable Overview-Detail Interfaces
          </p>
          <div className="mt-8 flex items-center gap-2 bg-foreground shadow-xl  rounded-xl  font-mono text-sm">
            <span className="text-background px-6 py-4">{installCommand}</span>
            <button
              onClick={handleCopy}
              className="ml-4 p-2 mr-2 hover:bg-background/10 cursor-pointer rounded transition-colors text-background"
              aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
        <LayoutTransitionAnimation />
      </div>
    </div>
  );
}
