import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';



export default function Register(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            email,
            senha,

        };
        try {
            
            console.log("chamaram cadastro cliente front")
            const response = await api.post('clients', data);
            
            console.log("vortei")
            console.log(response.data);
            
            if (response.data == true){
                alert(`Email já está cadastrado!.`);
                
            }
            else{
                alert(`Cliente Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/');
            }
            
            
            //console.log(response.data);
            //
        } catch (error) {
            alert('Erro durante o cadastro do Cliente!');
            
        }
        
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro de Cliente</h1>
                    <p>Faça seu cadastro, e comece já a mudança em sua alimentação hoje mesmo!.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#59A52C" />
                        Home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />


                    <input placeholder="Senha" type="password" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />


                    
                    <button className="buttonRegisterClient" type="submit">Cadastrar</button>                   
                </form>
            </div>
        </div>
    )
}