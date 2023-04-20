import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import '../App.css';
import { useNavigate } from "react-router-dom" // to redirect to home page after logging in
export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider); // wait for the user's information
        console.log(result);
        navigate("/"); // the redirection function to redirect after logging in
    }
    return(
        <div> 
            <p>Sign in with google to continue</p>
            <button onClick={signInWithGoogle}>
                Sign in with google
            </button>
        </div>
    )
}