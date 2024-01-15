import { useRef, useState} from "react";
import { Link} from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);


    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axiosClient.post('/login', payload)
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
                    Login into your account
                </h1>
                <form onSubmit={onSubmit}>
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
                    <button className="btn btn-block">
                        Login
                    </button>
                    <p className="message">
                        Not Registered? <Link to={"/signup"}>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
