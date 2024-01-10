import { Link } from "react-router-dom";

export default function Signup(){
    const onSubmit = (e) =>{
        e.preventDefault();
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">
                    Create your account
                </h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Full name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Password confirmation" />
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
