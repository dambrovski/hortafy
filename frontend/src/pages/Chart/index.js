import React, { useState, useEffect } from 'react';
import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/hortafy-logo.svg';
import {FiPower} from 'react-icons/fi'
import {FiDelete} from 'react-icons/fi'

import api from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Profile(){
    const [charts, setChart] = useState([]);
    const [chartsProducts, setChartsProducts] = useState([]);

    const [idKitFK, setIdKitFK] = useState([]);
    const [idProdutorFK, setProdutorFK] = useState([]);
    const [idCarrinhoFK, setCarrinhoFK] = useState([]);

    
    const history = useHistory();
    const idCliente = localStorage.getItem('idCliente');
    const emailCliente = localStorage.getItem('emailCliente');
    

    
    
    useEffect(() =>{
        api.get('charts', {
            headers:{
                Authorization: idCliente,
            }
        }).then(response => {
            console.log("pesquisando carrinho..");
            let dados;
            dados = response.data[0];
            console.log(dados);
            if(dados != null){

              setIdKitFK(dados.idKitFK);
              setProdutorFK(dados.idProdutorFK);
              setCarrinhoFK(dados.idCarrinho);
            }
            
            
            setChart(response.data);
        })
    }, [idCliente]);

    useEffect(() =>{
        api.get('charts/products', {
            headers:{
                Authorization: idCliente,
            }
        }).then(response => {
            console.log("pesquisando itens do carrinho..");
            setChartsProducts(response.data);
        })
    }, [idCliente])




async function handleAddOrder() {
  
  var texto = '{"idProdutorFK": "' +idProdutorFK+'", "idCarrinhoFK": "' +idCarrinhoFK+'", "idKit": '+idKitFK+'}';
  var cabecalho = JSON.parse(texto);
  console.log(cabecalho);

  try {

    console.log("inclusão pedido no front")
    
    const response = await api.post('orders', cabecalho);
    console.log(response.data);
      
    console.log("vortei");
    //console.log(response.data);
    //history.push('/chart');
    alert('Pedido Gerado!');   

  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
  }
}



function handleDeleteChart(id) {
    try {
        api.delete(`charts/${id}`, {
          headers: {
              Authorization: idCliente,                  
          }
      });
      alert('Carrinho deletado!.');
      history.push('/profile');
    } catch (error) {
        alert('Erro ao deletar Carrinho, tente novamente.');
    }
}

  function teste(variavel) {
  alert(idKitFK);
  alert(idProdutorFK);
  }


  
    

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    
    }

  

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <div className="chart-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo(a), {emailCliente}!</span>

  
                <Link className="button" to="/profile">Home</Link>
                <Link className="button" to="/orders">Visualizar Pedidos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Finalizar pedido:</h1>

            <ul>
                {charts.map(chart => (
                    
                    <li key={chart.idCarrinho}>
                    <strong>ID: {chart.idCarrinho}</strong>

                    <strong>ID KIT: {chart.idKitFK}</strong>
                    <strong>Descrição: {chart.descricaoKit}</strong>

                    <strong>ID Produtor: {chart.idProdutorFK}</strong>
                    <strong>Produtor: {chart.nome}</strong>
                    <strong>CNPJ: {chart.cnpjProdutor}</strong>
                    
      

                    <strong>
                      VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(chart.precoKit)}
                    </strong>

                    <button onClick={() => handleDeleteChart(chart.idCarrinho)} type="button" >
                        <FiDelete className='btnFi' size={30} color="#E02041"/>
                    </button>
                    
                </li>   
                ))}    
            </ul>  
    

            
            <h1>Itens do KIT:</h1>
            <ul className="descricaoPedidoUl">
                {chartsProducts.map(chartProduct => (
                    
                    <li className="descricaoPedidoLi" key={chartProduct.idProdutoKit}>
                    <strong>Nome: {chartProduct.descricao}</strong>
                
                    <strong>Calorias: {chartProduct.caloria}</strong>

                    <strong>
                      VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(chartProduct.precoUnit)}
                    </strong>
                    
      

                </li>   
                ))}    
            </ul>



                <button className='buttonFinalizar' onClick={() => handleAddOrder()} type="button">
                        Finalizar Pedido
                    </button>
        

        </div>
        
    );
}
