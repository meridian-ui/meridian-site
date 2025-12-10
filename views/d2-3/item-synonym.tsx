import {
  getAttributesByRole,
  getAttributesWithoutRoles,
  Role,
  ItemViewConfig,
  FetchedAttributeValueType,
  FetchedItemType,
  ViewOptions,
  useODI,
  Attribute,
} from "@meridian-ui/meridian";
import { useState, useRef, useEffect } from "react";

export interface ItemSynonymType extends ItemViewConfig {
  type: "synonym";
}

export const ItemSynonym = ({
  options,
  item,
  index,
  className,
  style,
}: {
  options: ViewOptions;
  item: FetchedItemType | undefined;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  if (!item) return <></>;
  const {} = useODI();

  const unlabeledAttributes = getAttributesWithoutRoles(item) ?? [];
  const shownAttributes = (options.overview as any)?.shownAttributes || [];
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0, lastDelta: 0 });
  const detailViewRef = useRef<HTMLElement | null>(null);

  const relevance = (
    getAttributesByRole(item, "relevance")?.at(0) as FetchedAttributeValueType
  )?.value;

  const isAttributeShown = (role: string) => {
    return shownAttributes.includes(role);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    // Find the detail view element
    detailViewRef.current = document.querySelector('.detail-view');

    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      lastDelta: 0,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !detailViewRef.current) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    const totalDelta = deltaX + deltaY;

    // Only trigger if delta has changed significantly
    const deltaDiff = totalDelta - startPosRef.current.lastDelta;

    if (Math.abs(deltaDiff) > 10) {
      // Create and dispatch a synthetic wheel event with ctrlKey
      const wheelEvent = new WheelEvent('wheel', {
        deltaY: -deltaDiff * 3,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      });

      detailViewRef.current.dispatchEvent(wheelEvent);
      startPosRef.current.lastDelta = totalDelta;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    detailViewRef.current = null;
  };

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className={`w-fit px-2 py-[2px] text-lg flex justify-center items-center rounded-md transition-all ease-in-out relative ${className} ${
        isDragging ? "cursor-nwse-resize" : "duration-300"
      }`}
      style={{
        ...style,
        color: relevance > 2 ? "white" : "#a33c00",
        backgroundColor:
          relevance > 2
            ? "#f75b00"
            : relevance === 2
            ? "#fdceaa"
            : relevance === 1
            ? "#fef0e6"
            : "",
        zIndex: isDragging ? 50 : 1,
      }}
    >
      {/* Bottom-right corner indicator - draggable handle */}
      <div
        className="absolute -bottom-[2px] -right-[2px] w-4 h-4 opacity-30 rounded-br-md cursor-nwse-resize hover:opacity-60 transition-opacity"
        style={{
          border: `2px solid ${relevance > 2 ? "white" : "#a33c00"}`,
          borderTop: "none",
          borderLeft: "none",
        }}
        onMouseDown={handleMouseDown}
      />
      {/* Main Content Section */}
      <div className="transition-all duration-300 ease-in-out">
        <div className="">
          <div className="column">
            {["subtitle", "title"].map((role) => {
              const attr = getAttributesByRole(item, role as Role);
              const isShown = isAttributeShown(role);
              return attr ? (
                <div
                  key={role}
                  className="title-area transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isShown ? "500px" : "0",
                    opacity: isShown ? 1 : 0,
                    marginTop: isShown ? undefined : 0,
                    marginBottom: isShown ? undefined : 0,
                  }}
                >
                  <Attribute
                    className={
                      role === "title"
                        ? "font-bold"
                        : role === "subtitle"
                        ? "text-sm opacity-60"
                        : ""
                    }
                    options={options}
                    attribute={attr}
                  />
                </div>
              ) : null;
            })}
          </div>
          <div className="">
            {["description", "key-attribute"].map((role) => {
              const attr = getAttributesByRole(item, role as Role);
              const isShown = isAttributeShown(role);
              return attr ? (
                <div
                  key={role}
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isShown ? "500px" : "0",
                    opacity: isShown ? 1 : 0,
                    marginTop: isShown ? undefined : 0,
                    marginBottom: isShown ? undefined : 0,
                  }}
                >
                  <Attribute
                    className={"font-bold"}
                    options={options}
                    attribute={attr}
                  />
                </div>
              ) : null;
            })}
          </div>
          {getAttributesByRole(item, "as-in") && (
            <div
              className="flex flex-row gap-1 text-sm italic transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isAttributeShown("as-in") ? "500px" : "0",
                opacity: isAttributeShown("as-in") ? 0.7 : 0,
                marginTop: isAttributeShown("as-in") ? undefined : 0,
                marginBottom: isAttributeShown("as-in") ? undefined : 0,
              }}
            >
              <Attribute
                key={"as-in"}
                options={options}
                attribute={getAttributesByRole(item, "as-in")}
                showLabel
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            {["definition", "sentence"].map((role) => {
              const attr = getAttributesByRole(item, role as Role);
              const isShown = isAttributeShown(role);
              return attr ? (
                <div
                  key={role}
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isShown ? "500px" : "0",
                    opacity: isShown ? 1 : 0,
                    marginTop: isShown ? undefined : 0,
                    marginBottom: isShown ? undefined : 0,
                  }}
                >
                  <Attribute
                    className={
                      "text-sm " +
                      (role === "sentence" ? "opacity-50 italic" : "")
                    }
                    options={options}
                    attribute={attr}
                  />
                </div>
              ) : null;
            })}
          </div>
          {unlabeledAttributes.length > 0 && (
            <div className="fl g-2 transition-all duration-300 ease-in-out">
              {unlabeledAttributes.map((attr, idx) => (
                <Attribute key={idx} options={options} attribute={attr} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
