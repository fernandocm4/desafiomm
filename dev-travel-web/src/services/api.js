import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});



export const createUser= async (nome, email, password) => {
    return api.post('/users', {nome, email, password});
}


export const createSession = async (email, password) => {
    return api.post('/sessions', {email, password});
};

export const getTravels = async(user_id, query) => {

    let url = `/users/${user_id}/travels/`
    if(query !== ''){
        url += `?q=${query}`;
    }

    return api.get(url);
};


export const getOrigins = async(user_id, query) => {

    let url = `/users/${user_id}/travels/origins`
    if(query !== ''){
        url += `?q=${query}`;
    }
    console.log(url);
    //http://localhost:5000/users/userId/travels/?q=xxx

    return api.get(url);
};



export const createTravel = async(user_id, destino,position)=>{

    const url = `/users/${user_id}/travels/`;

    return api.post(url,{user_id: user_id, destino: destino, position: position});

}


export const createOrigin = async(user_id, origem)=>{
    //const travelDestination = getTravelsDestination(origin,destination);

    let url = `/users/${user_id}/travels/origins`;
    console.log(url);



    return api.post(url,{ origin: origem});

}



export const calculateDistance = async(user_id, origin)=>{
    //const travelDestination = getTravelsDestination(origin,destination);

    let url = `/users/${user_id}/travels/calculate-distances`;

    console.log(url);
    //http://localhost:5000/users/userId/travels/?newposition=1&oldposition=2

    return api.post(url, {origin: origin});

}


export const updateTravel = async(user_id, destinoid,destino,index)=>{
    //const travelDestination = getTravelsDestination(origin,destination);

    let url = `/users/${user_id}/travels/${destinoid}`;
    /*if(query !== ''){
        url += `?${query}`;
    }*/
    console.log(url);
    //http://localhost:5000/users/userId/travels/?newposition=1&oldposition=2

    return api.put(url,{...destino, position: index+1});

}

export const updateTravelUp = async(user_id, query)=>{
    //const travelDestination = getTravelsDestination(origin,destination);

    let url = `/users/${user_id}/travels/`;
    if(query !== ''){
        url += `?${query}`;
    }
    console.log(url);
    //http://localhost:5000/users/userId/travels/?newposition=1&oldposition=2

    return api.put(url);

}

export const destroyTravel = async (user_id, id) => {
    const url = `/users/${user_id}/travels/${id}`;
    return api.delete(url);
}

export const destroyOrigin =async (user_id) => {
    const url = `/users/${user_id}/origins`;
    return api.delete(url);
}

