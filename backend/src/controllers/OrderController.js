const {query} = require('../database/connectionMysql');
const Order = require("../models/order");
const Kit = require("../models/kit");
const Chart = require("../models/chart");


let pedido = new Order;
let kit = new Kit;
let chart = new Chart;

kits = [];
idPedidoFK = 0;

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
    
    indexByClient(req, res){   
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE a.idClienteFK =' + parseInt(req.headers.authorization) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, a.idInstituicaoFK, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.emailProdutor, d.cnpjProdutor, e.emailInstituicao FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtor AS d ON d.idProdutor = c.idProdutorFK LEFT JOIN instituicao AS e ON a.idInstituicaoFK = e.idInstituicao" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexByProducer(req, res){
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE a.idProdutorFK =' + parseInt(req.headers.authorization) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, a.idInstituicaoFK, a.idProdutorFK, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.emailCliente, e.emailInstituicao FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN cliente AS d ON a.idClienteFK = d.idCliente LEFT JOIN instituicao AS e ON a.idInstituicaoFK = e.idInstituicao" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexByInstitution(req, res){
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE a.idInstituicaoFK =' + parseInt(req.headers.authorization) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.emailCliente, e.emailProdutor FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN cliente AS d ON a.idClienteFK = d.idCliente INNER JOIN produtor AS e ON a.idProdutorFK = e.idProdutor" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        kit.idKit = req.body['idKit'];
        pedido = req.body;
        chart = req.body;
        pedido.statusPedido = "PENDENTE";

        query(`INSERT INTO pedido (idClienteFK, idProdutorFK, statusPedido, idInstituicaoFK) VALUES 
        ('${req.headers.authorization}', '${pedido.idProdutorFK}', '${pedido.statusPedido}', '${pedido.idInstituicaoFK}')`,
        function (error, result, field) {
             if (error) {
                 res.json(error);
            } else {
                res.json(result);
                pedido.idPedido = result['insertId'];
                chart.gerouPedido = 1;
                query(`INSERT INTO pedidoKit (idPedidoFK, idKitFK) VALUES
                        ('${pedido.idPedido}', '${kit.idKit}')`,
                        function (error, results, field) {
                        if (error) {
                            console.log(error);
                        } else {
                            let filter = '';
                            filter = ' WHERE idCarrinho = ' + parseInt(chart.idCarrinhoFK);
                            query(`UPDATE carrinho SET gerouPedido = ('${chart.gerouPedido}')` + filter,
                            function (error, results, field) {
                            if (error) {
                                console.log(error);
                            } else {
                        }
                    });
                }
                });    
             }
         });       
      },

    status(req, res){
        pedido =  req.body;
        filter = ' WHERE idPedido = ' + parseInt(pedido.idPedido);
        query(`UPDATE pedido SET statusPedido = ('${pedido.statusPedido}')` + filter,
        function (error, results, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
    },
}
    
            
        


