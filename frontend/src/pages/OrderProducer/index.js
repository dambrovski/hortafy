import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/hortafy-logo.svg';
import {FiPower} from 'react-icons/fi'
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

export default function OrderProducer(){
    const [orders, setOrder] = useState([]);
    
    
    const history = useHistory();
    const idProdutor = localStorage.getItem('idProdutor');
    const emailProdutor = localStorage.getItem('emailProdutor');
    
    useEffect(() =>{
        api.get('orders/producer', {
            headers:{
                Authorization: idProdutor,
            }
        }).then(response => {
            console.log("pesquisando pedidos..");
            setOrder(response.data);
        })
    }, [idProdutor]);


async function handleExpandKit(id) {
    try {
      setOpen(true);
      const teste = await api.get(`kits/list/${id}`, {
      });
      console.log(teste.data);
      
    } catch (error) {
        alert('Erro ao incluir no carrinho, tente novamente.');
    }
}


function handleSetStatus(idPedido, statusPedido) {
  
  try {
    console.log("setando status do pedido")
    console.log(idPedido, statusPedido);
    const cabecalho = {idPedido, statusPedido};
    const response = api.post('orders/status', cabecalho);
    console.log(response.data);
      
    alert('Status Atualizado Com Sucesso!');
    history.push('/profileProducer')
    //console.log(response.data);

  } catch (error) {
    alert('Erro durante a alteração do status');   
  }
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
                <span>Bem vindo(a), {emailProdutor}!</span>
                <Link className="button" to="/profileProducer">Home</Link>
                <Link className="button" to="/products">Cadastrar Produtos</Link>
                <Link className="button" to="/kits">Cadastrar Kits</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Selecione o Status atual do pedido:</h1>
            <ul>
                {orders.map(order => {
                    if(order.idInstituicaoFK != 0){
                    return(
                    
                    <li key={order.idPedido}>
                    <h2><strong>KIT DOADO P/ INSTITUIÇÃO: {order.emailInstituicao}</strong></h2>
                    <strong>ID PEDIDO: {order.idPedido}</strong>
                    <strong>STATUS: {order.statusPedido}</strong>
                    <strong>DOADOR: {order.emailCliente}</strong>
                    <strong>KIT: {order.descricaoKit}</strong>
                    
                    <strong>
                      VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(order.precoKit)}
                    </strong>
                    <button className='btnFiPendente' onClick={() => handleSetStatus(order.idPedido, "PENDENTE")} type="button" >
                      PENDENTE
                    </button>
                    <button className='btnFiProcessamento' onClick={() => handleSetStatus(order.idPedido, "ACEITO")} type="button" >
                        ACEITO
                    </button>
                    <button className='btnFiEntregue' onClick={() => handleSetStatus(order.idPedido, "ENTREGUE")} type="button" >
                        ENTREGUE
                    </button> 
                </li> 

                    )} else {  
                        return( 
                          <li key={order.idPedido}>
                          <strong>ID PEDIDO: {order.idPedido}</strong>
                          <strong>STATUS: {order.statusPedido}</strong>
                          <strong>ID CLIENTE: {order.idClienteFK}</strong>
                          <strong>EMAIL: {order.emailCliente}</strong>
                          <strong>KIT: {order.descricaoKit}</strong>
                          
                          <strong>
                            VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(order.precoKit)}
                          </strong>
                          <button className='btnFiPendente' onClick={() => handleSetStatus(order.idPedido, "PENDENTE")} type="button" >
                            PENDENTE
                          </button>
                          <button className='btnFiProcessamento' onClick={() => handleSetStatus(order.idPedido, "ACEITO")} type="button" >
                              ACEITO
                          </button>
                          <button className='btnFiEntregue' onClick={() => handleSetStatus(order.idPedido, "ENTREGUE")} type="button" >
                              ENTREGUE
                          </button>
                          </li>   
                          )}
                        })}    
                  </ul>  
            </div>
          );
        }
