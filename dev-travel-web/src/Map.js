import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Map = () => {
  const [responsemap, setResponsemap] = useState(null);

  //const [origin, setOrigin] = useState('');
  //const [destination, setDestination] = useState('');

  const [requestRoute, setRequestRoute] = useState(false);
  //const [distance, setDistance] = useState('');
  //const [duration, setDuration] = useState('');

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);

        const route = response.routes[0].legs[0];
        setDistance(route.distance.text);
        setDuration(route.duration.text);
      } else {
        console.log('response: ', response);
      }
      setRequestRoute(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResponse(null);  // Reset the response to clear previous routes
    setDistance('');
    setDuration('');
    setRequestRoute(true);
  };
};

export default Map;
