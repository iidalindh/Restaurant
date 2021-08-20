import React, {useState} from 'react';
import axios from 'axios';
import type {FormEvent} from "react";

export const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    async function register(e : FormEvent) {
        e.preventDefault();

        try {
            const registerData = {
                email,
                password,
                passwordVerify
            };

            const response = await axios.post("http://localhost:8000/register", registerData);
            console.log(response);
             
        } catch (err) {
           console.log(err); 
        }

    }
    return (
        <div className="register-container">
            <h1>Registrera ett nytt konto</h1>
            <form onSubmit={register}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="password" placeholder="Repeat password" onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify} />
                <button type="submit">Registrera</button>    
            </form> 
            
        </div>
    )
}