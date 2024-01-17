import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

export default function Stores(){

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getStores();
    }, [])

    const getStores = () =>{
        setLoading(true);
        axiosClient.get('/stores')
        .then(({data}) =>{
                    setLoading(false);
                    console.log(data);
                })
                .catch(err =>{
                    setLoading(false);
                    console.log(err);
                })
    }

    return(
        <div>
            stores
        </div>
    )
}
