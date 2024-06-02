import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import Nav from "./Nav";
import New from "./New";
import Neworigin from "./Neworigin";
import Listtravels from "./Listtravels";
import {
    getTravels,
    getOrigins,
    createTravel,
    destroyTravel,
    calculateDistance,
    destroyOrigin,
    updateTravel,
    createOrigin
} from "../../services/api";

import { AuthContext } from "../../contexts/auth";

import { Link } from "react-router-dom";

const MainPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [travels, setTravels] = useState([]);
    const [newTravel, setNewTravel] = useState([]);
    //const [origin, setOrigin] = useState('');
    const [distances, setDistances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const [totalDistance, setTotalDistance] = useState('');
    const [totalDuration, setTotalDuration] = useState('');

    
    //const [origin, setOrigin] = useState('');
    //const [destination, setDestination] = useState('');

    const [requestRoute, setRequestRoute] = useState(false);

    const loadData = async (query = '') => {
        try {
            setLoading(true);
            const response = await getTravels(user?.id, query);
            const responseOrigins = await getOrigins(user?.id, query);
            setTravels(response.data);
            //setOrigins(responseOrigins.data);
            setLoading(false);
        } catch (error) {
            setLoadingError(true);
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, []);

    const handleLogout = () => {
        logout();
    }

    const handleDeleteTravel = async (travel, origem) => {
        await destroyTravel(user?.id, travel._id);
        await loadData();
        calculaDistancia(origem);
    }

    const handleDeleteOrigin = async (origin) => {
        await destroyOrigin(user?.id);

        await loadData();
    }

    const handleNewTravel = async (destino, origem) => {
        try {
            if(destino == ""){
                alert('Você precisa informar um destino final!!!');
                return;
            }
            if(origem == ""){
                alert('Você precisa informar um ponto de partida para a sua viagem!!!');
                return;
            }
            const position = travels.length ? travels[travels.length - 1].position + 1 : 1;
            await createTravel(user?.id, destino, position);
            calculaDistancia(origem);
            await loadData();
            console.log("travelcreate:", destino.length);
            console.log("travelinfo:", travels);
        } catch (error) {
            setLoadingError(true);
        }
    }


    const handleUpTravel = async (index, origem) => {
        try {
            if (index === 0) return;
            const newTravels = [...travels];
            [newTravels[index - 1], newTravels[index]] = [newTravels[index], newTravels[index - 1]];
            setTravels(newTravels);
            updatePositions(newTravels, origem);
            //await updateTravelDown(user?.id,query)
            //await loadData();
        } catch (error) {
            setLoadingError(true);
        }
    }

    const handleDownTravel = async (index, origem) => {
        try {
            if (index === travels.length - 1) return;
            const newTravels = [...travels];
            [newTravels[index + 1], newTravels[index]] = [newTravels[index], newTravels[index + 1]];
            setTravels(newTravels);
            updatePositions(newTravels, origem);

        } catch (error) {
            setLoadingError(true);
        }
    }

    const updatePositions = async (updatedDestinations, origem) => {
        try {
            await Promise.all(
                updatedDestinations.map(async (destino, index) =>
                    await updateTravel(user?.id, destino._id, destino, index)
                    //axios.put(`${api}/${destino._id}`, { ...destino, position: index + 1 })
                )
            );
            calculaDistancia(origem);
        } catch (error) {
            console.error('Error updating positions', error);
        }
    };

    const calculaDistancia = async (origem) => {
        if (!origem) return;
        try {
            const response = await calculateDistance(user?.id, origem);
            console.log(response);
            setTotalDistance(response.data.totalDistance);
            setTotalDuration(response.data.totalDuration);
            //setDistances(response.data.distances);
        } catch (error) {
            console.error('Error calculating distances', error);
        }
    }




    //MAPA
    



    if (loadingError) {
        return (
            <div className="loading">
                Erro ao carregar os dados de destinos. <Link to="/login">Voltar</Link>.
            </div>
        )
    }

    if (loading) {
        return (
            <div className="loading">
                Carregando...
            </div>
        )
    }

    return (
        <div id="main">


            <Nav onLogout={handleLogout}></Nav>
            



            <Listtravels
                travels={travels}
                origins={origin}
                distances={distances}
                totalDistance={totalDistance}
                totalDuration={totalDuration}
                onUpTravel={handleUpTravel}
                onDownTravel={handleDownTravel}
                onDeleteTravel={handleDeleteTravel}
                onDeleteOrigin={handleDeleteOrigin}
                onNewTravel={handleNewTravel}
                onCalculateDistance={calculaDistancia}>
            </Listtravels>





        </div>
    )
};

export default MainPage;