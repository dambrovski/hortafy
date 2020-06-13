import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTruck } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import api from '../../services/api'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function Logon() {
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const history = useHistory();

    const [value, setValue] = React.useState('cliente');

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            senha,
            value,
        };
        console.log(value);
        if(value == 'cliente'){
        try {
            console.log("tentativa de login cliente...")
            console.log(email);

                const response = await api.post('sessions', data);
                if(response.data == null){
                    alert('Email ou senha incorreta!')
                }
                else{
                    
                    localStorage.setItem('idCliente', response.data[0].idCliente);
                    localStorage.setItem('emailCliente', response.data[0].email);
                    history.push('/profileClient');
                }
             
        } catch (error) {
            alert('Falha no login Cliente, tente novamente.')
            
        }
        }else{
            try {
                console.log("tentativa de login produtor...")
                console.log(email);
                
                    const response = await api.post('sessions', data);
                    if(response.data == null){
                        alert('Email ou senha incorreta!')
                    }
                    else{
                        localStorage.setItem('idProdutor', response.data[0].idProdutor);
                        localStorage.setItem('emailProdutor', response.data[0].email);
                        localStorage.setItem('tipoUsuario', response.data[0].value);
                        
                        history.push('/ProfileProducer');
                    }
                 
            } catch (error) {
                alert('Falha no login Produtor, tente novamente.')
                
            }

        }
    }
    return(
        <div className="logon-container">
            <FormControl className="tipoAcesso" component="fieldset">
                        <RadioGroup className="tipoAcessoRadio" aria-label="tipoAcesso" name="tipoAcesso1" value={value} onChange={handleChange}>
                            <FormControlLabel className="tipoAcessoLabel" value="cliente"  control={<Radio />} label="Cliente"  />
                            <FormControlLabel className="tipoAcessoLabel" value="produtor" control={<Radio />} label="Produtor" />
                        </RadioGroup>
            </FormControl>
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
                    <button className="buttonLogin" type="submit">Entrar</button>

                    
                    
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