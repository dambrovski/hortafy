import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function RegisterProduct(){
    const [descricao, setDescricao] = useState('');
    const [precoUnit, setPrecoUnit] = useState('');
    const [caloria, setCaloria] = useState('');
    const idProdutor = localStorage.getItem('idProdutor');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            descricao,
            precoUnit,
            caloria,

        };
        try {
            console.log("called product post");
            console.log(data);
            const response = await api.post('products', data   , {
                headers:{
                    Authorization: idProdutor,
                }
            });
           
            if (response.data == true){
                alert(`Produto já está cadastrado!.`);
                
            }
            else{
                alert(`Produto Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/profileProducer');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Produto!');
            
        }
        
    }
    return(
        <div className="register-product-container">
            <div className="content">
                <form onSubmit={handleRegister}>
                <Link className="buttonProfile" to="/profileProducer">Home</Link>
                <Link className="buttonProfile" to="/kits">Cadastrar Kits</Link>
                <Link className="buttonProfile" to="/ordersProducer">Gerenciar Pedidos</Link>

                    <h1>CADASTRO DE PRODUTOS</h1>
      
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