import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout(){

    const {user, token} =  useStateContext();
    // Se l'utente non è loggato fallo loggare per non arrivare a dati protetti

    if(!token){
        return <Navigate to={"/login"} />
    }

    return(
        <div>
            Default
            <Outlet />
        </div>
    )
}
