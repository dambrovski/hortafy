//const mysql = require('../database/connectionMysql');
const {query} = require('../database/connectionMysql');


let idKitFK;
kits = [];
idPedidoFK = 0;


const crypto = require('crypto');

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idOrder) filter = ' WHERE idPedido=' + parseInt(req.params.idOrder);
        query("SELECT * FROM pedido" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexByProducer(req, res){
        let filter = '';
        const idProdutorFK = req.headers.authorization;
        if(idProdutorFK) filter = ' WHERE idProdutorFK=' + parseInt(idProdutorFK);
        query("SELECT * FROM pedido" + filter, function (error, result, field) { 
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        const {idProdutorFK} = req.body['cabecalho'];
        //kits = req.body['produtos'];
        kits = req.body['kits'];
        //console.log(kits);
        const idClienteFK = req.headers.authorization;
        query(`INSERT INTO pedido (idClienteFK, idProdutorFK) VALUES 
        ('${idClienteFK}', '${idProdutorFK}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
                idPedidoFK = result['insertId'];
                console.log(idPedidoFK);
                for (let index = 0; index < kits.length; index++) {
                    element = kits[index];
                    idKitFK = element.idKit;
                    query(`INSERT INTO pedidoKit (idPedidoFK, idKitFK) VALUES
                    ('${idPedidoFK}', '${idKitFK}')`,
                    function (error, results, field) {
                        if (error) {
                            console.log(results);
                            console.log(error);
                            console.log("Pedido deu Erro!")
                        } else {
                            console.log("Pedido salvo!")
                        }
                    });
                }
                }
            });
        

        }
    }

   

