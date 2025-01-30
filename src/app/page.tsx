"use client";
import { useState } from "react";
import Map from "../components/map/map";
import WrappedCardList from "@/components/card/WrappedCardList";
import Navbar from "@/components/Navbar";

const ViewToggleButton = ({ showMap, onToggle }: { showMap: boolean; onToggle: () => void }) => (
  <button
    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
    onClick={onToggle}
  >
    {showMap ? "View List" : "View Map"}
  </button>
);

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const toggleView = () => setShowMap(prev => !prev);

  return (
    <div className="h-screen flex flex-col">
      <div className="border border-b-2">
        <Navbar />
      </div>
      
      <div className="flex md:hidden justify-center p-4">
        <ViewToggleButton showMap={showMap} onToggle={toggleView} />
      </div>

      <div className="flex-1 grid md:grid-cols-2 h-full">
        <div className={`map-container ${showMap ? "block" : "hidden"} md:block h-full`}>
          <Map />
        </div>
        
        <div className={`card-list ${!showMap ? "block" : "hidden"} md:block overflow-y-auto`}>
          <WrappedCardList />
        </div>
      </div>
    </div>
  );
}
