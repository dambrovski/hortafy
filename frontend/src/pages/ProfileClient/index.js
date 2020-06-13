import React, { useState, useEffect } from 'react';
import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/hortafy-logo.svg';
import {FiPower} from 'react-icons/fi'
import {FiShoppingCart} from 'react-icons/fi'
import {FiMaximize2} from 'react-icons/fi'
import Button from '@material-ui/core/Button';
import api from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    const [kits, setKits] = useState([]);
    const [ProdutoKits, setProdutoKits] = useState([]);
    

    

    //const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const idCliente = localStorage.getItem('idCliente');
    const emailCliente = localStorage.getItem('emailCliente');
    
    useEffect(() =>{
        api.get('kits', {
            headers:{
                Authorization: idCliente,
            }
        }).then(response => {
            console.log("pesquisando kits..");
            setKits(response.data);
        })
    }, [idCliente]);


async function handleExpandKit(id) {
    try {
      setOpen(true);
      const teste = await api.get(`kits/list/${id}`, {
      });
      console.log(teste.data);
      //setKits(kits.filter(kit => kit.idKit !== id));
    } catch (error) {
        alert('Erro ao incluir no carrinho, tente novamente.');
    }
}


async function handleAddChart(idKit) {
  
  const cabecalho = '{"cabecalho":{"idClienteFK": '+ idCliente + '}, "kits":[{"idKit":' + '"' + idKit + '"' + '}]}'
  console.log(cabecalho);
  try {

    console.log("inclusão kit carrinho no front")
    //const response = await api.post('charts', cabecalho);
    await api.post('charts', cabecalho);
      
    console.log("vortei");
    //console.log(response.data);
    history.push('/chart');

  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
  }
}

async function handleAdd(idKit) {
  var texto = '{"idClienteFK": "' +idCliente+'", "idKit": '+idKit+'}';
  var cabecalho = JSON.parse(texto);
  
  try {
    console.log("inclusão kit carrinho no front")
    const response = await api.post('charts', cabecalho);
    console.log(response.data);
    history.push('/charts');

  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
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
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo(a), {emailCliente}!</span>

  
                <Link className="button" to="/charts">Visualizar Carrinho</Link>
                <Link className="button" to="/orders">Visualizar Pedidos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Conheça os Kits de nossos vendedores:</h1>
            <ul>
                {kits.map(kit => (
                    
                    <li key={kit.idKit}>
                    <strong>{kit.descricaoKit}</strong>
                    

                    <strong>Produtor: {kit.nome}</strong>
                    
                    <button className="btnExpandir" onClick={() => handleOpen()} type="button" >
                        <FiMaximize2 className='btnFi' size={30} color="#59A52C"/>
                    </button>


                    <strong>VALOR:  
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(kit.precoKit)}</strong>
                    <button onClick={() => handleAdd(kit.idKit)} type="button" >
                        <FiShoppingCart className="btnFi" size={30} color="#59A52C"/>
                    </button>
                </li>   
                ))}    
            </ul>
            <div>
            
            
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
   closeAfterTransition
   BackdropComponent={Backdrop}
   BackdropProps={{
     timeout: 500,
   }}
 >
   <Fade in={open}>
     <div className={classes.paper}>
         

                            <h2 id="transition-modal-title">Produtos do Kit</h2>
                            <p id="transition-modal-description">ITENS</p>
         
         

     
     </div>
   </Fade>
 </Modal>
</div>


        </div>
    );
}
