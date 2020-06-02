import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/hortafy-logo.svg';
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api';

export default function Profile(){
    const [kits, setKits] = useState([]);
    //const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const idCliente = localStorage.getItem('idCliente');
    const emailCliente = localStorage.getItem('emailCliente');
    useEffect(() =>{
        api.get('clients', {
            headers:{
                Authorization: idCliente,
            }
        }).then(response => {
            console.log("pesquisando kits..");
            setKits(response.data);
        })
    }, [idCliente]);

    async function handleDeleteIncident(id) {
        try {
          await api.delete(`kits/${id}`, {
              headers: {
                  Authorization: idCliente,                  
              }
          });
          setKits(kits.filter(kit => kit.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
}

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo(a), {emailCliente}!</span>
                <Link className="button" to="/kits">Buscar Produtos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Kits</h1>
            <ul>
                {kits.map(kit => (
                    <li key={kit.idKit}>
                    <strong>Kit:</strong>
                    <p>{kit.descricaoKit}</p>

                    <strong>ID PRODUTOR</strong>
                    <p>{kit.idProdutorFK}</p>

                    <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(kit.precoKit)}</p>
                    <button onClick={() => handleDeleteIncident(kit.idKit)} type="button" >
                        <FiTrash2  size={20} color="a8a8b3"/>
                    </button>
                </li>   
                ))}    
            </ul>
        </div>
    );
}