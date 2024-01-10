import { Link, Navigate, Outlet } from "react-router-dom";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout(){

    const {user, token} =  useStateContext();
    // Se l'utente non è loggato fallo loggare per non arrivare a dati protetti


    if(!token){
        return <Navigate to={"/login"} />
    }

    const onLogout = (e) =>{

    }

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
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

            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
