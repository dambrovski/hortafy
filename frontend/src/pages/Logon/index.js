import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTruck } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/hortafy-logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api'

export default function Logon() {
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            console.log(email);
            const response = await api.post('sessions', {email});
            console.log(response.data)
            //localStorage.setItem('ongId', id);
            //localStorage.setItem('ongName', response.data.name);
            //history.push('/profile');
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
                    
                    <Link className="back-link" to="/registerClient">
                        <FiUser size={20} color="#59A52C" />
                        Quero ser cliente!
                        <Link className="back-link" to="/registerProducer">
                        <FiTruck size={20} color="#E3992A" />
                        Quero ser um Vendedor!
                    </Link>
                    </Link>
                </form>
            </section>
        </div>
    )
}