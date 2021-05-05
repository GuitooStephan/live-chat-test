import { useAuth0 } from "@auth0/auth0-react";


const Login = props => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <button className="mb-3 btn-block btn btn-primary" onClick={ () => loginWithRedirect() }>
                Login
            </button>
        </>
    )
}

export default Login;