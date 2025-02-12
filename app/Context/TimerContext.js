'use client';

import { createContext, useState, useEffect } from 'react';
import { getAddressFromCoordinates } from '../Components/FetchCoords';
import { updateShipmentLocation } from '../api/supabaseapi';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [presentLocation, setPresentLocation] = useState('');
  const [address, setAddress] = useState('');
  const [activeShipment, setActiveAddress] = useState();

  useEffect(() => {
    async function fetchAddress() {
      if (presentLocation) {
        const [lat, lng] = presentLocation;
        const location = await getAddressFromCoordinates(lat, lng);
        setAddress(location);
      }
      if (address) {
        const response = await updateShipmentLocation(activeShipment, address);

        if (response && response.data) {
          const { data } = response; // Only destructure if 'data' exists
          // Handle your data here
        } else {
          console.error('Error: Response does not contain expected data.');
          // Handle the error gracefully, maybe show a message to the user
        }
      }
    }
    fetchAddress();
  }, [presentLocation, address, activeShipment]);
  console.log(address);
  return (
    <TimerContext.Provider
      value={{ presentLocation, setPresentLocation, address, setActiveAddress }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export default TimerContext;
