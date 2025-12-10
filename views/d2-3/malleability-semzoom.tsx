import React from "react";

interface SemZoomItem {
  id: string;
  content: string;
}

export const MalleabilitySemZoom = ({
  zoomLevel,
  setZoomLevel,
  attributes,
  setAttributes,
  shownAttributes,
}: {
  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
  attributes: string[];
  setAttributes: (attributes: string[]) => void;
  shownAttributes: string[];
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(Number(e.target.value));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));

    if (dragIndex === dropIndex) return;

    const newAttributes = [...attributes];
    const [draggedItem] = newAttributes.splice(dragIndex, 1);
    newAttributes.splice(dropIndex, 0, draggedItem);
    setAttributes(newAttributes.toReversed());
  };

  return (
    <div className="absolute bottom-0 left-0 flex flex-row gap-4 p-4 bg-zinc-100 dark:bg-zinc-800 m-4 rounded-lg">
      {/* Pinch Gesture Indicator */}
      <div className="absolute -top-12 left-0 right-0 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg shadow-sm">
        <svg
          className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Pinch to zoom
        </span>
      </div>
      {/* Vertical Slider */}
      <div className="h-[210px] w-[30px] flex items-center justify-center relative">
        <input
          type="range"
          min="0"
          max={attributes.length - 1}
          step="0.01"
          value={zoomLevel}
          onChange={handleSliderChange}
          className="absolute w-[210px] origin-center -rotate-[-90deg] appearance-none bg-transparent
            [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-zinc-400 [&::-webkit-slider-runnable-track]:to-zinc-200
            dark:[&::-webkit-slider-runnable-track]:from-zinc-500 dark:[&::-webkit-slider-runnable-track]:to-zinc-700
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-zinc-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 [&::-webkit-slider-thumb]:mt-[-7px]
            hover:[&::-webkit-slider-thumb]:bg-zinc-500 dark:hover:[&::-webkit-slider-thumb]:bg-zinc-400
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:shadow-sm"
        />
      </div>

      {/* Draggable List */}
      <div className="min-h-[12rem] w-36">
        {attributes.map((attribute, index) => (
          <div
            key={attribute}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`px-3 py-1 mb-2 bg-white dark:bg-gray-700 rounded-md transition-all text-sm cursor-move hover:bg-gray-50 dark:hover:bg-gray-600 ${
              shownAttributes.includes(attribute)
                ? "opacity-100 shadow-md"
                : "opacity-50"
            }`}
          >
            {attribute}
          </div>
        ))}
      </div>
    </div>
  );
};
