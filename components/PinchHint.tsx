"use client";

import { useEffect, useState } from "react";

export const PinchHint = ({ onDismiss }: { onDismiss?: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
      {/* Top-left circle */}
      <div
        className="absolute w-8 h-8 bg-gray-400/80 dark:bg-gray-500/80 rounded-full shadow-lg"
        style={{
          animation: "pinchTopLeft 2s ease-in-out infinite",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Bottom-right circle */}
      <div
        className="absolute w-8 h-8 bg-gray-400/80 dark:bg-gray-500/80 rounded-full shadow-lg"
        style={{
          animation: "pinchBottomRight 2s ease-in-out infinite",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <style jsx>{`
        @keyframes pinchTopLeft {
          0%, 100% {
            transform: translate(-50%, -50%);
            opacity: 0.9;
          }
          50% {
            transform: translate(calc(-50% - 30px), calc(-50% - 30px));
            opacity: 0.6;
          }
        }

        @keyframes pinchBottomRight {
          0%, 100% {
            transform: translate(-50%, -50%);
            opacity: 0.9;
          }
          50% {
            transform: translate(calc(-50% + 30px), calc(-50% + 30px));
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};
