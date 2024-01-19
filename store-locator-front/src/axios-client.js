import axios from "axios";

// GOOGLE MAPS KEY : AIzaSyCXGkJs4aXBbWd5MYuZvZTmopfrxoK1l5I


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

// PRIMA FUNZIONE è ON RESPONSE
// SECONDA FUNZIONE è ON REJECTION
axiosClient.interceptors.response.use((response) =>{
    return response;
}, (error)=>{
    const {response} = error;
    if(response.status === 401){
        localStorage.removeItem("ACCESS_TOKEN");
    }

    throw error;
})

export default axiosClient;



/**
 *
 *
 *
 */
