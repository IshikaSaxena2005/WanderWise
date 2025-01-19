import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

import { Input } from '../components/ui/input'; // Adjust the relative path
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';


function CreateTrip() {
  const inputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS, // Ensure this variable is correct
    libraries: ['places'],
  });

  // Handle places changed event from StandaloneSearchBox
  const handlePlacesChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(newCenter); // Update map center based on selected place
      map.panTo(newCenter); // Pan map to the new center
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px=56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our planner will generate a customized itinerary based on your preference.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is the destination of choice?</h2>

          {/* Map with StandaloneSearchBox */}
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={center}
            zoom={12}
            onLoad={(mapInstance) => setMap(mapInstance)} // Set map reference once loaded
          >
            {/* StandaloneSearchBox for searching places */}
            <StandaloneSearchBox
              onLoad={(ref) => {
                inputRef.current = ref; // Link search box with the map
              }}
              onPlacesChanged={handlePlacesChanged} // Handle place changes
            >
              <input
                type="text"
                placeholder="Search for places"
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  width: '300px',
                  borderRadius: '5px',
                  marginTop: '20px',
                }}
              />

            </StandaloneSearchBox>
          </GoogleMap>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
          <Input placeholder={'Ex.3'} type='number'></Input>
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className="p-4 border cursor-pointer rounded-lg hover:shadow"> {/* Corrected className placement */}
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelList.map((item, index) => (
            <div key={index} className="p-4 border cursor-pointer rounded-lg hover:shadow"> {/* Corrected className placement */}
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>

      </div>
      <div className='mt-10 justify-end flex'><button>Genrate Trip</button></div>
      
    </div>
  );
}

export default CreateTrip;
