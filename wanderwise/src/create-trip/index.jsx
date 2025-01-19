import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';

// Function to update map center dynamically
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

function CreateTrip() {
  const inputRef = useRef(null);
  const [center, setCenter] = useState({ lat: 26.8467, lng: 80.9462 }); // Default: Lucknow, India
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('Updated Form Data:', formData);
  }, [formData]);

  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const newCenter = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setCenter(newCenter);

        // Store location with city name and details
        handleInputChange('location', { 
          label: data[0].display_name, 
          value: { description: data[0].display_name } 
        });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px=56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our planner will generate a customized itinerary based on your preference.
      </p>
      
      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Search */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is the destination of choice?</h2>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Search for places"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
              Search
            </button>
          </div>

          {/* Map Container */}
          <MapContainer center={center} zoom={12} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
              <Popup>Selected Location</Popup>
            </Marker>
            <ChangeView center={center} />
          </MapContainer>
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type='number' />
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className="p-4 border cursor-pointer rounded-lg hover:shadow">
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companion Selection */}
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelList.map((item, index) => (
            <div key={index} className="p-4 border cursor-pointer rounded-lg hover:shadow">
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className='mt-10 justify-end flex'>
        <button className="px-6 py-2 bg-green-500 text-white rounded">Generate Trip</button>
      </div>
    </div>
  );
}

export default CreateTrip;
