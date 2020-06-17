import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';



export default function Register(){
    const [emailInstituicao, setEmailInstituicao] = useState('');
    const [cnpjInstituicao, setCnpjInstituicao] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleRegisterInstitution(e) {
        e.preventDefault();
        const data = {
            emailInstituicao,
            cnpjInstituicao,
            senha,
        };

        try {
            const response = await api.post('institutions', data);            
            if (response.data == true){
                alert(`Email já está cadastrado!.`);
            }else{
                alert(`Instituição Cadastrada com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/');
            }

        } catch (error) {
            alert('Erro durante o cadastro da Instituição!');
        }
    }
    return(
        <div className="register-container">
            <div className="content">       
                <form onSubmit={handleRegisterInstitution}>
                <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="RED" />Home
                </Link>
                <section>
                    <img src={logoImg} alt="Hortafy"/>    
                </section>

                    <input placeholder="CNPJ" 
                    value={cnpjInstituicao}
                    onChange={e => setCnpjInstituicao(e.target.value)}
                    />
                
                    <input placeholder="Email" 
                    value={emailInstituicao}
                    onChange={e => setEmailInstituicao(e.target.value)}
                    />

                    <input placeholder="Senha" type="password" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />
                    <button className="buttonRegisterInstitution" type="submit">Cadastrar</button>                   
                </form>
                
            </div>
        </div>
    )
}