import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/hortafy-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {FiPlus} from 'react-icons/fi'

//import Select from 'react-select';



export default function RegisterProduct(){
    const [descricao, setDescricao] = useState('');
    const [precoUnit, setPrecoUnit] = useState('');
    const [selectValue, setSelectValue] = useState('');  
    const idProdutor = localStorage.getItem('idProdutor');
    const [products, setProducts] = useState([]);
    const [ProdutoKits, setProdutoKits] = useState([]);
    

    const history = useHistory();

        
    useEffect(() =>{
        api.get('products/producer', {
            headers:{
                Authorization: idProdutor,
            }
        }).then(response => {
            console.log("pesquisando produtos..");
            setProducts(response.data);
        })
    }, [idProdutor]);

    function handleAdd(e) {
        e.preventDefault()
        console.log(selectValue);
        if (selectValue != 1){
            var idx = ProdutoKits.indexOf(selectValue);
            if(idx == -1){
                console.log(idx);
                ProdutoKits.push(selectValue);
                console.log(ProdutoKits);
                }
            else{
                alert("Produto já incluso no KIT!")  
            }
        }
        
        alert(selectValue)  
    }
    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            descricao,
            precoUnit,
            ProdutoKits,

        };
        try {   
            console.log("called kits post");
            const response = await api.post('kits', data   , {
                headers:{
                    Authorization: idProdutor,
                }
            });

            if (response.data == true){
                alert(`Kit já foi Cadastrado.`);
                
            }
            else{
                alert(`Kit Cadastrado com sucesso! Você será redirecionado a tela inicial.`);
                history.push('/profileProducer');
            }

        } catch (error) {
            alert('Erro durante o cadastro do Kit!');
            
        }
        
    }
    return(
        <div className="register-product-container">
            <div className="content">
                
                <form onSubmit={handleRegister}>


                <Link className="buttonProfile" to="/profileProducer">Home</Link>
                <Link className="buttonProfile" to="/products">Cadastrar Produtos</Link>
                <Link className="buttonProfile" to="/ordersProducer">Gerenciar Pedidos</Link>

                    <h1>CADASTRO DE KITS</h1>
      
                    <input placeholder="Descrição do Kit" 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />


                    <input placeholder="Preço do Kit"  type="number"
                    value={precoUnit}
                    onChange={e => setPrecoUnit(e.target.value)}
                    />
 
                    <div>
                        <select className="selectBox" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option value="" disabled>Selecione o Produto</option>
                        
                        {
                        products.map(function(product) {
                        return <option key={product.idProduto} 
                        value={product.idProduto}>{product.descricao}</option>;
                        })
                        }
                    </select>
                    <button onClick={handleAdd} type="button" >
                    <FiPlus className="btnFi" size={30} color="#59A52C"/>
                    </button>

                    </div>

                                   
              
                    <button className="buttonRegisterKit" type="submit">Cadastrar</button>                   
                </form>
                
            </div>
        </div>
    )
}