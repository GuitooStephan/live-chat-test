import { useAuth0 } from '@auth0/auth0-react';


const SignUp = props => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <button className="mb-5 btn-block btn btn-outline-primary" onClick={ () => loginWithRedirect({ screen_hint: "signup", prompt: "login" }) }>
                Register
            </button>
        </>
    )
}


export default SignUp;