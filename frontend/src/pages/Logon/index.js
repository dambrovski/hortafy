import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTruck } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/hortafy-logo.svg';

import api from '../../services/api'

export default function Logon() {
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            senha,

        };
        
        try {
            console.log("tentativa de login...")
            console.log(email);
            const response = await api.post('sessions', data);
            
            if(response.data == null){
                alert('Email ou senha incorreta!')
            }
            else{
                
                localStorage.setItem('idCliente', response.data[0].idCliente);
                localStorage.setItem('emailCliente', response.data[0].email);
                
                history.push('/profile');
            }
            
            //localStorage.setItem('ongId', id);
            //localStorage.setItem('ongName', response.data.name);
            
        } catch (error) {
            alert('Falha no login, tente novamente.')
            
        }
        
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Hortafy"/>
                <form onSubmit={handleLogin}>
                    <input placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Senha" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />  
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link-client" to="/registerClient">
                        <FiUser size={16} color="#59A52C" />
                        Quero ser cliente!
                        <Link className="back-link-producer" to="/registerProducer">
                        <FiTruck size={16} color="#E3992A" />
                        Quero ser um Vendedor!
                    </Link>
                    </Link>
                </form>
            </section>
        </div>
    )
}