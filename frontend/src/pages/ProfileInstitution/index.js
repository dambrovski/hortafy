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

export default function ProfileClient(){
    const [orders, setOrder] = useState([]);    
    const history = useHistory();
    const idInstituicao = localStorage.getItem('idInstituicao');
    const emailInstituicao = localStorage.getItem('emailInstituicao');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    useEffect(() =>{
        api.get('orders/institution', {
            headers:{
                Authorization: idInstituicao,
            }
        }).then(response => {
            setOrder(response.data);
        })
    }, [idInstituicao]);



async function handleAdd(idKit) {  
  var texto = '{"idInstituicaoFK": "' +idInstituicao+'", "idKit": '+idKit+'}';
  var cabecalho = JSON.parse(texto);
  console.log(cabecalho);

  try {  
    const response = await api.post('charts', cabecalho);
    history.push('/chart');
  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
  }
}

function handleDeleteChart(id) {
    try {
        api.delete(`charts/${id}`, {
          headers: {
              Authorization: idInstituicao,                  
          }
      });
      alert('Carrinho deletado!.');
      history.push('/profileClient');
    } catch (error) {
        alert('Erro ao deletar Carrinho, tente novamente.');
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
                <span>Bem vindo(a), {emailInstituicao}!</span>

  
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Acompanhar Doações:</h1>

            <ul>
                {orders.map(order => (
                    
                    <li key={order.idPedido}>
                    <strong>ID: {order.idPedido}</strong>
                    <strong>STATUS: {order.statusPedido}</strong>
                    <strong>DOADOR: {order.emailCliente}</strong>
                    <strong>PRODUTOR RESPONSÁVEL: {order.emailProdutor}</strong>
                    
                    <strong>KIT: {order.descricaoKit}</strong>
                    
                    <strong>
                      VALOR DO KIT DOADO: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(order.precoKit)}
                    </strong>

        
                    
                </li>   
                ))}    
            </ul>  
        </div>
    );
}
