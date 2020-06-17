import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';


export default function Register(){
    const [emailProdutor, setEmailProdutor] = useState('');
    const [cnpjProdutor, setCnpjProdutor] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            emailProdutor,
            cnpjProdutor,
            senha,
        };

        try {
            const response = await api.post('producers', data);            
            if (response.data == true){
                alert(`Email já está cadastrado!.`);
            }else{
                alert(`Produtor Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Produtor!');
        }
    }
    return(
        <div className="register-container">
            <div className="content">       
                <form onSubmit={handleRegister}>
                <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E3992A" />Home
                </Link>
                <section>
                    <img src={logoImg} alt="Hortafy"/>    
                </section>

                    <input placeholder="CNPJ" 
                    value={cnpjProdutor}
                    onChange={e => setCnpjProdutor(e.target.value)}
                    />
                
                    <input placeholder="Email" 
                    value={emailProdutor}
                    onChange={e => setEmailProdutor(e.target.value)}
                    />

                    <input placeholder="Senha" type="password" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />
                    <button className="buttonRegisterProducer" type="submit">Cadastrar</button>                   
                </form>
                
            </div>
        </div>
    )
}