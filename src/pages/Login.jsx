
import  { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {


  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };


    return (
        <div className="formContainer">
         <div className="formWrapper">
            <span className="logo">FIPI CHAT </span>
            <span className="title"> Login</span>
            <form action="" onSubmit={handleSubmit}>
            
                <input type="email" placeholder="email"  />
                <input type="password" placeholder="password"/>
             
                <button>Login</button>
            </form>
            <p>You dont have a account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      )
}
