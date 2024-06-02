import React, {useContext, useState} from "react";

import { createUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const RegisterPage = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleRegister = async () => {
        if(email == "" || password == "" || name == ""){
            alert("Preencha todos os campos!");
            return;
        }
        createUser(name, email, password);
        navigate('/login');
    }
    
    return(
        <div id="register">
            <h1 className="title">Register</h1>
            <div className="form">
                <div className="field">
                    <label htmlFor="email">Nome</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="password">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                

                <div className="actions">
                    <button onClick={handleRegister}>Registrar</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;