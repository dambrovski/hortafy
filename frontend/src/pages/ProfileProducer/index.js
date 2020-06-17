import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/hortafy-logo.svg';
import {FiPower} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {FiMaximize2} from 'react-icons/fi'
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

export default function ProfileProducer(){
    const [kits, setKits] = useState([]);
    const history = useHistory();
    const idProdutor = localStorage.getItem('idProdutor');
    const emailProdutor = localStorage.getItem('emailProdutor');
    
    useEffect(() =>{
        api.get('kits/producer', {
            headers:{
                Authorization: idProdutor,
            }
        }).then(response => {
            setKits(response.data);
        })
    }, [idProdutor]);


async function handleExpandKit(id) {
    try {
      setOpen(true);
      const teste = await api.get(`kits/list/${id}`, {
      });
    } catch (error) {
        alert('Erro ao incluir no carrinho, tente novamente.');
    }
}

async function handleAddChart(idKit) {  
  const cabecalho = '{"cabecalho":{"idClienteFK": '+ idProdutor + '}, "kits":[{"idKit":' + '"' + idKit + '"' + '}]}';
  try {
    await api.post('charts', cabecalho);
    history.push('/chart');
  } catch (error) {
    alert('Erro durante a inclusão do item no carrinho!');   
  }
}

async function handleAdd(idKit) {
  var texto = '{"idClienteFK": "' +idProdutor+'", "idKit": '+idKit+'}';
  var cabecalho = JSON.parse(texto);
  try {
    const response = await api.post('charts', cabecalho);
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
                <span>Bem vindo(a), {emailProdutor}!</span>
  
                <Link className="buttonProfile" to="/products">Cadastrar Produtos</Link>
                <Link className="buttonProfile" to="/kits">Cadastrar Kits</Link>
                <Link className="buttonProfile" to="/ordersProducer">Gerenciar Pedidos</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Kits Cadastrados:</h1>
            <ul>
                {kits.map(kit => (
                    <li key={kit.idKit}>
                    <strong>{kit.descricaoKit}</strong>
                    <button className="btnExpandir" onClick={() => handleOpen()} type="button" >
                        <FiMaximize2 className='btnFi' size={30} color="#59A52C"/>
                    </button>

                    <strong>VALOR:  
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(kit.precoKit)}
                    </strong>

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
              }}>           
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
