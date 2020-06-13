import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';



export default function RegisterProduct(){
    const [descricao, setDescricao] = useState('');
    const [precoUnit, setPrecoUnit] = useState('');
    const [caloria, setCaloria] = useState('');
    

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            descricao,
            precoUnit,
            caloria,

        };
        try {
            console.log("called action");
            console.log(data);
            const response = await api.post('producers', data);
            console.log(response.data);
            
            if (response.data == true){
                alert(`descricao já está cadastrado!.`);
                
            }
            else{
                alert(`Produtor Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Produtor!');
            
        }
        
    }
    return(
        <div className="register-product-container">
            <div className="content">
                
                <form onSubmit={handleRegister}>


                <Link className="buttonProfile" to="/products">Cadastrar Produtos</Link>
                <Link className="buttonProfile" to="/kits">Cadastrar Kits</Link>
                <Link className="buttonProfile" to="/orders">Gerenciar Pedidos</Link>

                    <h1>CADASTRO DE PRODUTO</h1>
      
                    <input placeholder="Descrição do Produto" 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />


                    <input placeholder="Preço Unitário"  type="number"
                    value={precoUnit}
                    onChange={e => setPrecoUnit(e.target.value)}
                    />
          

                    <input placeholder="Calorias" type="number" 
                    value={caloria}
                    onChange={e => setCaloria(e.target.value)}
                    />
                    <button className="buttonRegisterProducer" type="submit">Cadastrar</button>                   
                </form>
                
            </div>
        </div>
    )
}