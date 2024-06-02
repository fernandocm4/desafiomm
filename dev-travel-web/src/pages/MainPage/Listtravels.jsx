import React, { useState } from "react";
import { GoogleMap, useJsApiLoader,LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
//import ReactTooltip from 'react-tooltip';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Listtravels = ({ travels, origins, distances, totalDistance, totalDuration, onDeleteTravel, onDeleteOrigin, onCalculateDistance, onCalculateDistanceMap, onNewTravel, onUpTravel, onDownTravel }) => {

    const [newTravel, setNewTravel] = useState("");
    const [origin, setOrigin] = useState('');

    const [originmap, setOriginMap] = useState('');
    const [destination, setDestination] = useState('');
    const [responsemap, setResponsemap] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [requestRoute, setRequestRoute] = useState(false);

    const {isLoaded} = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['geometry','drawing'],
    });


    const handleDirections = (responsemap) => {
        
        if (responsemap !== null) {
            if (responsemap.status === 'OK') {
                setResponsemap(responsemap);

                const route = responsemap.routes[0].legs[0];
                setDistance(route.distance.text);
                setDuration(route.duration.text);
            } else {
                console.log('response: ', responsemap);
                
            }
            setRequestRoute(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setResponsemap(null);  // Reset the response to clear previous routes
        setDistance('');
        setDuration('');
        setRequestRoute(true);
    };



    return (



        <div className="allitens">

            <div className="card-travels">

                <div className="main-title">
                    <h2>Minhas viagens</h2>
                </div>



                <div className="params">

                    <input name="partida"
                        type="text"
                        placeholder="Informe o ponto de partida"
                        value={origin}
                        required
                        onChange={(e) => setOrigin(e.target.value)} />

                    <input
                        type="text"
                        placeholder="Informe um destino"
                        name="new-travel"
                        id="new-travel"
                        value={newTravel}
                        required
                        onChange={(e) => setNewTravel(e.target.value)} />
                        


                </div>

                <ul className="list">
                    {
                        travels.map((travel, index) => (
                            <li className="item" key={travel._id}>
                                <div className="info-buttons">
                                    <button data-tooltip-id="message"
                                        data-tooltip-content="Mover para cima"
                                        onClick={() => onUpTravel(index, origin)}><FaChevronCircleUp /><ReactTooltip id="message" /></button>

                                    <button data-tooltip-id="message"
                                        data-tooltip-content="Mover para baixo"
                                        onClick={() => onDownTravel(index, origin)}><FaChevronCircleDown /></button>
                                </div>
                                <div className="info">

                                    {travel.destino}
                                </div>
                                <button className="remove" onClick={() => onDeleteTravel(travel, origin)}>Remover</button>



                            </li>

                        ))
                    }
                </ul>

                <div className="distance-info">
                    {distance && duration && (
                        <div className="distances">
                            <p>Distância: {distance}</p>
                            <p>Duração: {duration}</p>
                        </div>
                    )}
                </div>
                <div className="distance-info">
                    {totalDistance && (
                        <div className="distances">
                            <p>Distância total: {totalDistance}</p>
                            <p>Duração total: {totalDuration}</p>
                        </div>
                    )}
                </div>
                <button className="buttondestino" onClick={() => onNewTravel(newTravel, origin)}>Adicionar destino</button>
                <button className="buttondestino" onClick={handleSubmit}>Get Route</button>
            </div>

            <div className="mapa">
            
                {isLoaded && <GoogleMap
                        id="direction-example"
                        mapContainerStyle={{
                            height: '100%',
                            width: '100%',
                        }}
                        zoom={10}
                        center={{
                            lat: -25.093198,
                            lng: -50.160228
                        }}
                    >
                        {requestRoute && (
                            <DirectionsService
                                options={{
                                    destination: newTravel,
                                    origin: origin,
                                    travelMode: 'DRIVING',
                                    waypoints: travels.map(waypoint => ({ location: waypoint.destino, stopover: true }))

                                }}
                                callback={handleDirections}
                            />
                        )}
                        {responsemap !== null && (
                            <DirectionsRenderer
                                options={{
                                    directions: responsemap,
                                }}
                            />
                        )}
                    </GoogleMap>}
            </div>

        </div>
    )
}

export default Listtravels;