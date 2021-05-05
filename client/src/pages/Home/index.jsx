import SignUpComponent from './SignUp';
import LoginComponent from './Login';


const Home = props => {
    return (
        <>
            <section className="h-100-vh d-flex justify-content-center align-items-center">
                <div className="max-w-400">
                    <h3 className="mb-5">Welcome to Live Chat</h3>
                    <LoginComponent></LoginComponent>
                    <SignUpComponent></SignUpComponent>
                </div>
            </section>
        </>
    )
}

export default Home;
