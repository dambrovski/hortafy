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

export default function OrderClient(){
    const [orders, setOrder] = useState([]);    
    const history = useHistory();
    const idCliente = localStorage.getItem('idCliente');
    const emailCliente = localStorage.getItem('emailCliente');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    useEffect(() =>{
        api.get('orders/client', {
            headers:{
                Authorization: idCliente,
            }
        }).then(response => {
            setOrder(response.data);
        })
    }, [idCliente]);

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

async function handleAdd(idKit) {  
  var texto = '{"idClienteFK": "' +idCliente+'", "idKit": '+idKit+'}';
  var cabecalho = JSON.parse(texto);
  console.log(cabecalho);

  try {  
    const response = await api.post('charts', cabecalho);
    history.push('/chart');
  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
  }
}

function handleLogout() {
    localStorage.clear()
    history.push('/')
    }

    return (
        <div className="chart-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo(a), {emailCliente}!</span>
  
                <Link className="button" to="/profileClient">Home</Link>
                <Link className="button" to="/charts">Visualizar Carrinho</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Acompanhar pedidos:</h1>

            <ul>
                {orders.map(order => {
                    if(order.idInstituicaoFK != 0){
                    return(
                    <li key={order.idPedido}>
                    <strong>ID: {order.idPedido}</strong>
                    <h2><strong>KIT DOADO P/ INSTITUIÇÃO: {order.emailInstituicao}</strong></h2>
                    <strong>STATUS: {order.statusPedido}</strong>
                    <strong>Produtor: {order.emailProdutor}</strong>
                    <strong>KIT: {order.descricaoKit}</strong>
                    
                    <strong>
                      VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(order.precoKit)}
                    </strong>
                    </li>   
                    )} else {  
                  return(
                    <li key={order.idPedido}>
                    <strong>ID: {order.idPedido}</strong>
                    <strong>STATUS: {order.statusPedido}</strong>
                    <strong>Produtor: {order.emailProdutor}</strong>
                    <strong>KIT: {order.descricaoKit}</strong>
                    <strong>
                      VALOR: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(order.precoKit)}
                    </strong>
                    </li>   

                  )}
                
                })}    
            </ul>  
        </div>
    );
}
