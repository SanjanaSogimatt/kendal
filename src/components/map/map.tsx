"use client";
import React, { useRef, useEffect, useMemo } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useStore, StoreState } from '@/store/store';
import MarkerPopup from './MarkerPopup';
import { createRoot } from 'react-dom/client';

const selectVisibleListings = (state: StoreState) => state.filteredListings;
const selectSelectedCard = (state: StoreState) => state.selectedCard;
const selectSelectedMarker = (state: StoreState) => state.selectedMarker;
const selectSetSelectedMarker = (state: StoreState) => state.setSelectedMarker;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markersRef = useRef<{ [key: string]: maptilersdk.Marker }>({});
  const popupRef = useRef<maptilersdk.Popup | null>(null);

  const visibleListings = useStore(selectVisibleListings);
  const selectedCard = useStore(selectSelectedCard);
  const selectedMarker = useStore(selectSelectedMarker);
  const setSelectedMarker = useStore(selectSetSelectedMarker);

  const center = { lng: -118.686759, lat: 34.032396 };
  const zoom = 14;

  maptilersdk.config.apiKey = "nMGXPuRsVZYF8JJLSsha";

  const highlightedMarkerRef = useRef<string | null>(null);

  const createMarkerElement = (isSelected: boolean = false) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
      <div class="marker-pin ${isSelected ? 'marker-selected' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </div>
    `;
    return el;
  };

  const updateMarkerAppearance = (markerId: string, isHighlighted: boolean) => {
    const marker = markersRef.current[markerId];
    if (marker) {
      const el = marker.getElement();
      const pin = el.querySelector('.marker-pin');
      if (pin) {
        if (isHighlighted) {
          pin.classList.add('marker-selected');
        } else {
          pin.classList.remove('marker-selected');
        }
      }
    }
  };

  const setHighlightedMarker = (markerId: string | null) => {
    if (highlightedMarkerRef.current) {
      updateMarkerAppearance(highlightedMarkerRef.current, false);
    }
    if (markerId) {
      updateMarkerAppearance(markerId, true);
      highlightedMarkerRef.current = markerId;
    } else {
      highlightedMarkerRef.current = null;
    }
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    map.current.addControl(new maptilersdk.NavigationControl(), 'top-right');
        const gc = new GeocodingControl({
      showResultsWhileTyping: true,
    });
    map.current.addControl(gc, 'top-left');

    map.current.addControl(new maptilersdk.FullscreenControl());
    
    map.current.addControl(new maptilersdk.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
    }), 'bottom-left');

    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        cursor: pointer;
      }
      .marker-pin {
        width: 30px;
        height: 30px;
        color: #3b82f6;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));
        transform-origin: bottom;
        transition: all 0.2s ease-in-out;
      }
      .marker-pin:hover {
        transform: scale(1.2);
        color: #2563eb;
      }
      .marker-selected {
        color: #ef4444;
        transform: scale(1.2);
      }
      .marker-selected:hover {
        color: #dc2626;
      }
      .maplibregl-ctrl-geocoder {
        min-width: 300px;
        font-family: inherit;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!map.current) return;

    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    if (popupRef.current) popupRef.current.remove();
    
    // Add new markers
    visibleListings.forEach((item) => {
      const isSelected = selectedCard?.displayId === item.displayId || 
                        selectedMarker?.displayId === item.displayId;
      const el = createMarkerElement(isSelected);
      
      const marker = new maptilersdk.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([item.longitude, item.latitude])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        setSelectedMarker(item);
        setHighlightedMarker(item.displayId);
        
        if (popupRef.current) popupRef.current.remove();
        
        const popupNode = document.createElement('div');
        popupNode.style.backgroundColor = 'transparent';
        const root = createRoot(popupNode);
        root.render(
          <MarkerPopup 
            listing={item} 
            onClose={() => {
              popupRef.current?.remove();
              setSelectedMarker(null);
              setHighlightedMarker(selectedCard?.displayId || null);
            }} 
          />
        );

        popupRef.current = new maptilersdk.Popup({
          offset: [0, -10],
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup',
          maxWidth: 'none'
        })
          .setLngLat([item.longitude, item.latitude])
          .setDOMContent(popupNode)
          .addTo(map.current!);
        
        map.current?.flyTo({
          center: [item.longitude, item.latitude],
          zoom: 16,
          duration: 1000,
          essential: true
        });
      });
      
      markersRef.current[item.displayId] = marker;
    });
    
    if (selectedCard) {
      setHighlightedMarker(selectedCard.displayId);
      map.current.flyTo({
        center: [selectedCard.longitude, selectedCard.latitude],
        zoom: 16,
        duration: 1000,
        essential: true
      });
    }
  }, [visibleListings, selectedCard, setSelectedMarker]);

  useEffect(() => {
    if (selectedMarker) {
      setHighlightedMarker(selectedMarker.displayId);
    } else {
      setHighlightedMarker(selectedCard?.displayId || null);
    }
  }, [selectedMarker, selectedCard]);

  useEffect(() => {
    return () => {
      if (highlightedMarkerRef.current) {
        updateMarkerAppearance(highlightedMarkerRef.current, false);
      }
    };
  }, []);

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
