import { createContext, useContext, useState } from "react";

//
const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: ()=>{},
    setToken: ()=>{}
})

export const ContextProvider = ({children}) =>{

    const [user, SetUser] = useState({
        name: "Jhon"
    });
    // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [token, _setToken] = useState(12);

    const setToken = (token) =>{
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            SetUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () =>  useContext(StateContext);
