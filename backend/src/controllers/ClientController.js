const {query} = require('../database/connectionMysql');
const Client = require("../models/client");
let cliente = new Client;

module.exports = {
    index(req, res){
        let filter = ''
        if(req.params.idCliente) filter = ' WHERE idCliente=' + parseInt(req.params.idCliente);
        query("SELECT * FROM cliente" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        cliente = req.body;
        clienteExiste = true;
 
        filter = " WHERE emailCliente= '" + cliente.emailCliente;        
        query("SELECT * FROM cliente" + filter + "'", function (error, result, field) {
            if (result.length < 1){
                query(`INSERT INTO cliente 
                (emailCliente, cartaoCredito, senha) 
                VALUES 
                ('${cliente.emailCliente}', '${cliente.cartaoCredito}', '${cliente.senha}')`,
                function (error, result, field) {
                    if (error) {
                        clienteExiste = true;
                        res.json(clienteExiste);
                    } else {
                        clienteExiste = false;
                        res.json(clienteExiste);
                    }
                })
            } else {
                clienteExiste = true;
                res.json(clienteExiste);
            }
        });
    }
}