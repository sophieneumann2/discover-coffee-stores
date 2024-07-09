'use client';

import { useState } from 'react';

type PositionType = { latitude: number; longitude: number };

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState<boolean>(false);
  const [longLat, setLongLat] = useState<string>('');
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>('');

  function success(position: { coords: PositionType }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);

    setIsFindingLocation(false);
    setLocationErrorMsg('');

    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMsg('Unable to retrieve your location');
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
    } else {
      setIsFindingLocation(true);
      setLocationErrorMsg('');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { isFindingLocation, longLat, locationErrorMsg, handleTrackLocation };
};

export default useTrackLocation;
