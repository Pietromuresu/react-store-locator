import { Link, Navigate, Outlet } from "react-router-dom";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";



export default function DefaultLayout(){

    const {user, token, setUser, setToken} =  useStateContext();


    // Se l'utente non è loggato fallo loggare per non arrivare a dati protetti

    if(!token){
        return <Navigate to={"/login"} />
    }

    // Richiamo i dati dello user loggato dall'api di laravel
    useEffect(( ) =>{
        axiosClient.get('/user')
                .then(({data}) =>{
                    setUser(data);
                })
            },[])

            const onLogout = (e) =>{
                axiosClient.post('/logout')
                .then(({data}) => {
                    setUser({});
                    setToken(null);
                })
    }

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/stores">Stores</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout" >Logout</a>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
