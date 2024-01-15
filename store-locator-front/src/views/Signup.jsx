import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


export default function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({data}) =>{
                setToken(data.token);
                setUser(data.user);

            })
            .catch(err =>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
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
                    {errors &&(
                        errors.name &&
                         <div className="alert">
                            <p>{errors.name}</p>
                        </div>)
                    }
                    <input ref={emailRef} type="email" placeholder="Email" />
                    {errors && (
                        errors.email &&
                        <div className="alert">
                            <p>{errors.email}</p>
                        </div>
                        )
                    }
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    {errors &&
                        (errors.password &&
                        <div className="alert">
                            <p>{errors.password}</p>
                        </div>
                        )
                    }
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
