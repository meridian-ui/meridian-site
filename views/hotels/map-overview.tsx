"use client";

import {
  MeridianItem,
  OverviewConfig,
  AttributeType,
  useODI,
  FetchedItemType,
  ViewOptions,
  FetchedAttributeValueType,
} from "@meridian-ui/meridian";
import { useState, useCallback, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
// import { useDragStore } from '@/store/drag.store';

export interface OverviewMapType extends OverviewConfig {
  type: "map";
  itemView: { type: "pin" };
  details: [
    {
      type: "basic";
      openFrom: ["item"];
    }
  ];
}

export const mapDefault: Partial<OverviewMapType> = {
  shownAttributes: ["key-attribute"],
  itemView: { type: "pin" },
  detailViews: [
    {
      type: "basic",
      openIn: "pop-up",
      openFrom: ["item"],
    },
  ],
};

interface MapAttributes {
  coordinates: (Position | undefined)[];
}

const getMapData = (items: FetchedItemType[]): MapAttributes => {
  const coordinates = items.map((item) => {
    // Collect coordinates from internalAttributes
    const latAttribute = item.internalAttributes?.find(
      (attr) => attr && typeof attr === "object" && attr.label === "lat"
    );

    const lngAttribute = item.internalAttributes?.find(
      (attr) => attr && typeof attr === "object" && attr.label === "lng"
    );

    const numberCoordinate = {
      lat: parseFloat(
        (latAttribute as FetchedAttributeValueType)?.value ?? "0"
      ),
      lng: parseFloat(
        (lngAttribute as FetchedAttributeValueType)?.value ?? "0"
      ),
    };

    return numberCoordinate;
  });

  return {
    coordinates,
  };
};

export const OverviewMap = (options: ViewOptions) => {
  const mapOverview = options.overview as OverviewMapType;

  const {
    odi,
    setSelectedItemEntity,
    highlightAttributes,
    addAttributeBinding,
  } = useODI();
  // const { draggedItem, setDraggedItem, roleToDropOn, setRoleToDropOn } =
  //   useDragStore();

  // Always declare all hooks at the top level
  const [hoveredItemId, setHoveredItemId] = useState("");

  // Always define these callbacks, even if we don't use them in all cases
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const role = "map-coordinates";

  const { coordinates } = getMapData(
    odi?.dataBinding[0].items ?? []
  );

  const hasValidCoordinates = coordinates?.every((p) => p && p.lat && p.lng);

  // Calculate map bounds regardless of whether we'll use them
  const { defaultCenter, defaultZoom } = calculateMapBounds(coordinates);

  // Find the detail view that should open from clicking this attribute
  const detailToOpen = mapOverview.detailViews?.find(
    (detail) => typeof detail === "object" && detail.openFrom?.includes("item")
  );

  // Define the CoordinateDropZone component outside of any conditional logic
  const CoordinateDropZone = ({
    coordinateType,
    handleDragOver,
    roleToDropOn,
    setRoleToDropOn,
    draggedItem,
    addAttributeBinding,
    setDraggedItem,
    coordinates,
  }: {
    coordinateType: "lat" | "lng";
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    roleToDropOn: string | null;
    setRoleToDropOn: (role: string | null) => void;
    draggedItem: any;
    addAttributeBinding: (
      attribute: AttributeType,
      isInternal?: boolean
    ) => void;
    setDraggedItem: (item: any) => void;
    coordinates: (Position | undefined)[];
  }) => {
    const dropZoneRole = `map-coordinates-${coordinateType}`;
    const displayName = coordinateType === "lat" ? "lat" : "lng";

    // Get the first item's coordinate value if it exists
    const firstItemCoordinate = coordinates?.at(0)?.[coordinateType];
    const hasCoordinate =
      firstItemCoordinate !== undefined && !isNaN(firstItemCoordinate);

    return (
      <div
        className={`p-3 ${
          hasCoordinate
            ? "bg-green-50 text-green-700"
            : "bg-blue-50 text-blue-700"
        } rounded-md ${
          roleToDropOn === dropZoneRole ? "ring-2 ring-blue-400" : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={(e) => {
          e.stopPropagation();
          if (roleToDropOn !== dropZoneRole) {
            setRoleToDropOn(dropZoneRole);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (draggedItem && roleToDropOn === dropZoneRole) {
            const bindingAttribute: AttributeType = {
              value: `.${draggedItem.path}`,
              label: coordinateType,
            };
            addAttributeBinding(bindingAttribute, true);
            setDraggedItem(null);
            setRoleToDropOn(null);
          }
        }}
      >
        {hasCoordinate ? (
          <>
            <span className="font-medium">{displayName}</span> attribute set:
            <code className="ml-1 bg-green-100 px-1 py-0.5 rounded">
              {firstItemCoordinate}
            </code>
          </>
        ) : (
          <>
            Drop here to add{" "}
            <code className="bg-blue-100 px-1 py-0.5 rounded">
              {displayName}
            </code>{" "}
            attribute
          </>
        )}
      </div>
    );
  };

  // Now use conditional rendering for the UI, not for hook calls
  if (!hasValidCoordinates) {
    return (
      <div
        className={"w-full h-full flex flex-col items-center justify-center py-8 px-4 z-1000000"}
        style={{ pointerEvents: "auto" }}
      >
        <div className="max-w-md text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Map Locations
          </h2>
          <p className="text-gray-600 mb-4">
            The items in this view don't have valid location coordinates. Please
            ensure your data includes latitude and longitude values.
          </p>
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
            Coordinates should be defined as{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">lat</code> and{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">lng</code> values
            in your item attributes.
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {/* 
            <button
              className="mt-4 p-4 border border-gray-300 rounded-md"
              onClick={() => {
                setApiKeyInput(
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
                );
              }}
            >
              View Map
            </button> */}
          </div>
        </div>
      </div>
    );
  }

  // Fix Leaflet default marker icon issue in Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  // Custom component to add markers using useMap hook
  const MapMarkers = () => {
    const map = useMap();
    const markersRef = useRef<L.Marker[]>([]);

    useEffect(() => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      coordinates.forEach((position, index) => {
        if (!position) return;

        const item = options.items[index];

        // Create a div element for the marker content
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-meridian-marker-wrapper';

        // Render the MeridianItem as HTML string
        markerElement.innerHTML = renderToString(
          <div className="w-fit max-w-[300px]">
            <MeridianItem
              item={item}
              options={options}
              index={index}
              itemView={options.overview.itemView}
            />
          </div>
        );

        // Create custom divIcon with the rendered content
        const customIcon = L.divIcon({
          className: 'custom-pill-marker',
          html: markerElement.innerHTML,
          iconSize: [300, 100],
          iconAnchor: [150, 50],
        });

        // Create and add marker to map
        const marker = L.marker([position.lat, position.lng], {
          icon: customIcon,
        }).addTo(map);

        // Add hover effects
        marker.on('mouseover', () => {
          setHoveredItemId(item?.itemId ?? "");
          const element = marker.getElement();
          if (element) {
            element.style.transform = 'scale(1.1)';
            element.style.zIndex = '1000';
            element.style.transition = 'transform 0.2s ease';
          }
        });

        marker.on('mouseout', () => {
          setHoveredItemId("");
          const element = marker.getElement();
          if (element) {
            element.style.transform = 'scale(1)';
            element.style.zIndex = '1';
          }
        });

        markersRef.current.push(marker);
      });

      // Cleanup on unmount
      return () => {
        markersRef.current.forEach(marker => marker.remove());
      };
    }, [map, coordinates, options.items]);

    return null;
  };

  // If we have valid coordinates, render the map
  return (
    <div className="w-full h-full flex flex-col items-center py-8 px-4">
      <div className="w-full h-[90vh] rounded-lg overflow-hidden">
        <MapContainer
          key={"map" + mapOverview.id}
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={defaultZoom}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapMarkers />
        </MapContainer>
      </div>
    </div>
  );
};

type Position = {
  lat: number;
  lng: number;
};

type MapBounds = {
  defaultCenter: Position;
  defaultZoom: number;
};

const calculateMapBounds = (positions: (Position | undefined)[]): MapBounds => {
  const positionsFiltered = positions.filter(Boolean) as Position[];

  // Handle empty array or undefined positions
  if (!positionsFiltered || positionsFiltered.length === 0) {
    return {
      defaultCenter: { lat: 0, lng: 0 },
      defaultZoom: 2,
    };
  }

  // If only one position exists, center on it with a higher zoom
  if (positionsFiltered.length === 1) {
    return {
      defaultCenter: positionsFiltered[0],
      defaultZoom: 14, // Increased from 13
    };
  }

  // Find the bounds of all positions
  const bounds = {
    north: -90,
    south: 90,
    east: -180,
    west: 180,
  };

  // Calculate the bounds that contain all markers
  positionsFiltered.forEach((position) => {
    bounds.north = Math.max(bounds.north, position.lat);
    bounds.south = Math.min(bounds.south, position.lat);
    bounds.east = Math.max(bounds.east, position.lng);
    bounds.west = Math.min(bounds.west, position.lng);
  });

  // Calculate center
  const defaultCenter: Position = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };

  // Calculate zoom based on the size of the bounding box
  const latDistance = bounds.north - bounds.south;
  const lngDistance = bounds.east - bounds.west;

  // Reduce padding to allow for closer zoom
  const padding = 0.2; // Reduced from 0.5
  const paddedLatDistance = latDistance + padding;
  const paddedLngDistance = lngDistance + padding;

  // Calculate zoom based on the larger of the two dimensions
  const latZoom = Math.log2(360 / paddedLatDistance);
  const lngZoom = Math.log2(360 / paddedLngDistance);

  // Use the smaller zoom level to ensure all markers are visible
  let defaultZoom = Math.floor(Math.min(latZoom, lngZoom));

  // Add a zoom boost to get closer by default
  const zoomBoost = 5; // Increase this value for more zoom
  defaultZoom += zoomBoost;

  // Constrain zoom to reasonable limits
  defaultZoom = Math.max(defaultZoom, 4); // Don't zoom out beyond minZoom
  defaultZoom = Math.min(defaultZoom, 15); // Don't zoom in too far

  return { defaultCenter, defaultZoom };
};
