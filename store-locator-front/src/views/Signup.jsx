import { useRef, Ref } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirmation: passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({data}) =>{
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err =>{
                const response = err.response;
                console.log(response);
                if(response && response.status === 422){
                    console.log(response.data);
                }
            })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">
                    Create your account
                </h1>
                <form onSubmit={onSubmit}>
                    <input ref={nameRef} type="text" placeholder="Full name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation" />
                    <button className="btn btn-block">
                        Login
                    </button>
                    <p className="message">
                        Already Registered? <Link to={"/login"}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
