"use client";

import { useEffect, useState } from "react";
import { CoastlineSVG } from "./CoastlineSVG";

type LayoutType = "grid" | "list" | "map";

interface ItemPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
}

export const LayoutTransitionAnimation = () => {
  const [currentLayout, setCurrentLayout] = useState<LayoutType>("grid");

  useEffect(() => {
    const layouts: LayoutType[] = ["grid", "list", "map"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % layouts.length;
      setCurrentLayout(layouts[currentIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Define positions for each item in each layout
  function vh(percent: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (percent * h) / 100;
  }

  function vw(percent: number) {
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    return (percent * w) / 100;
  }

  const getItemPosition = (
    itemIndex: number,
    layout: LayoutType
  ): ItemPosition => {
    const containerWidth = vw(30);
    const containerHeight = vh(30);

    if (layout === "grid") {
      const cols = 3;
      const rows = 2;
      const row = Math.floor(itemIndex / cols);
      const col = itemIndex % cols;
      const gap = 8;
      const padding = 14; // Equal padding on all sides

      // Calculate item dimensions to maintain equal padding
      // For 3 columns: containerWidth = 2*padding + 3*itemWidth + 2*gap
      // For 2 rows: containerHeight = 2*padding + 2*itemHeight + 1*gap
      const itemWidth =
        (containerWidth - 2 * padding - (cols - 1) * gap) / cols;
      const itemHeight =
        (containerHeight - 2 * padding - (rows - 1) * gap) / rows;

      // Only show first 4 items in grid
      if (itemIndex >= cols * rows) {
        return {
          x: padding + col * (itemWidth + gap),
          y: padding + row * (itemHeight + gap),
          width: 0,
          height: 0,
          borderRadius: 8,
        };
      }

      return {
        x: padding + col * (itemWidth + gap),
        y: padding + row * (itemHeight + gap),
        width: itemWidth,
        height: itemHeight,
        borderRadius: 8,
      };
    } else if (layout === "list") {
      const itemHeight = 48;
      const gap = 8;
      const padding = 16; // Equal padding on left and right

      return {
        x: padding,
        y: itemIndex * (itemHeight + gap) + padding,
        width: containerWidth - 2 * padding,
        height: itemHeight,
        borderRadius: 8,
      };
    } else {
      // map - convert to pins
      const positions = [
        { x: 0.4 + 0.05, y: 0.3 + 0.1 },
        { x: 0.6 + 0.05, y: 0.5 + 0.1 },
        { x: 0.3 + 0.05, y: 0.7 + 0.1 },
        { x: 0.7 + 0.05, y: 0.4 + 0.1 },
        { x: 0.5 + 0.05, y: 0.6 + 0.1 },
        { x: 0.35 + 0.05, y: 0.45 + 0.1 },
      ];
      const pos = positions[itemIndex] || positions[0];
      const pinSize = 20;
      return {
        x: pos.x * containerWidth - pinSize / 2,
        y: pos.y * containerHeight - pinSize / 2,
        width: pinSize,
        height: pinSize,
        borderRadius: 10,
      };
    }
  };

  const items = [0, 1, 2, 3, 4, 5];

  // Render content inside each item based on layout
  const renderItemContent = (
    itemIndex: number,
    width: number,
    height: number
  ) => {
    if (currentLayout === "map" || width === 0 || height === 0) return null;

    if (currentLayout === "grid") {
      // Show thumbnail and lines for grid
      return (
        <>
          <div
            style={{
              width: "100%",
              height: "60%",
              // backgroundColor: "#e8dab2",
              backgroundColor: "#BCC9C1",
              borderRadius: "4px",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              width: "80%",
              height: "4px",
              backgroundColor: "#3d4f3a",
              borderRadius: "2px",
              marginBottom: "3px",
            }}
          />
          <div
            style={{
              width: "60%",
              height: "4px",
              backgroundColor: "#3d4f3a",
              borderRadius: "2px",
              opacity: 0.5,
            }}
          />
        </>
      );
    } else if (currentLayout === "list") {
      // Show horizontal layout for list
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",

            height: "100%",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              // backgroundColor: "#e8dab2",
              backgroundColor: "#BCC9C1",
              borderRadius: "4px",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "70%",
                height: "4px",
                backgroundColor: "#3d4f3a",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "50%",
                height: "4px",
                backgroundColor: "#3d4f3a",
                borderRadius: "2px",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "30vw",
          height: "30vh",
          backgroundColor: "#eff4f1",
          border: "2px solid #3d4f3a",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "8px 8px 0 0 #3d4f3a",
          overflow: "hidden",
          position: "relative",
          transition: "background-color 0.6s ease",
        }}
      >
        {/* Coastline - only show in map mode */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "80%",
            height: "100%",
            opacity: currentLayout === "map" ? 1 : 0,
            transform:
              currentLayout === "map"
                ? "scale(1) translateX(0)"
                : "scale(0.8) translateX(20%)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
          }}
          viewBox="0 0 115 316"
          preserveAspectRatio="xMaxYMid slice"
        >
          <CoastlineSVG />
        </svg>
        {items.map((i) => {
          const position = getItemPosition(i, currentLayout);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${position.width}px`,
                height: `${position.height}px`,
                backgroundColor:
                  currentLayout === "map" ? "#3d4f3a" : "#eff4f1",
                border:
                  currentLayout === "map"
                    ? "3px solid #fffef8"
                    : "2px solid #3d4f3a",
                borderRadius: `${position.borderRadius}px`,
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow:
                  currentLayout === "map"
                    ? "0 2px 8px rgba(61, 79, 58, 0.3)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                padding: currentLayout === "map" ? "0" : "8px",
                opacity: position.width === 0 ? 0 : 1,
              }}
            >
              {renderItemContent(i, position.width, position.height)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
