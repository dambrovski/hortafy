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

    
    indexByClient(req, res){
        const idCliente = req.headers.authorization;
        console.log(idCliente);
        console.log("called order controller");
        let filter = '';
        if(idCliente) filter = ' WHERE a.idClienteFK =' + parseInt(idCliente) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.nome, d.cnpjProdutor FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtor AS d ON d.idProdutor = c.idProdutorFK" + filter, function (error, result, field) {
            if (error) {
                console.log("erro");
                res.json(error);
            } else {
                console.log(result);
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
        console.log("create order called");
        console.log(req.body);

        kit = req.body['idKit'];
        cabecalho = req.body;

        const idProdutorFK = cabecalho.idProdutorFK;
        const idCarrinhoFK = cabecalho.idCarrinhoFK;
        console.log(idCarrinhoFK);

        const statusPedido = "PENDENTE"
        
        const idClienteFK = req.headers.authorization;
        query(`INSERT INTO pedido (idClienteFK, idProdutorFK, statusPedido) VALUES 
        ('${idClienteFK}', '${idProdutorFK}', '${statusPedido}')`,
        function (error, result, field) {
             if (error) {
                 res.json(error);
                console.log("noticia ruim");
            } else {
                res.json(result);
                idPedidoFK = result['insertId'];
                const gerouPedido = 1;
                query(`INSERT INTO pedidoKit (idPedidoFK, idKitFK) VALUES
                        ('${idPedidoFK}', '${kit}')`,
                        function (error, results, field) {
                        if (error) {
                            console.log(results);
                            console.log(error);
                            console.log("Carrinho deu Erro!")
                        } else {
                            console.log("Carrinho deu buena");
                            let filter = '';
                            filter = ' WHERE idCarrinho = ' + parseInt(idCarrinhoFK);
                            query(`UPDATE carrinho SET gerouPedido = ('${gerouPedido}')` + filter,

                            function (error, results, field) {
                            if (error) {
                                console.log(results);
                                console.log(error);
                                console.log("Pedido deu Erro!")
                            } else {
                                console.log("Pedido deu buena");
                        }
                    });
                }
            });    
             }
         });
                   
      }
    }
            
        


