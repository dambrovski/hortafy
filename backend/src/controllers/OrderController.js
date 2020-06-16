const {query} = require('../database/connectionMysql');

let idKitFK;
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
        const idCliente = req.headers.authorization;
        let filter = '';
        if(idCliente) filter = ' WHERE a.idClienteFK =' + parseInt(idCliente) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.email, d.cnpjProdutor FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtor AS d ON d.idProdutor = c.idProdutorFK" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexByProducer(req, res){
        const idProdutor = req.headers.authorization;
        let filter = '';
        if(idProdutor) filter = ' WHERE a.idProdutorFK =' + parseInt(idProdutor) + ' ORDER BY a.idPedido DESC';
        query("SELECT a.idPedido, a.idClienteFK, a.statusPedido, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.email, d.instituicaoCaridosa FROM pedido AS a INNER JOIN pedidoKit AS b ON a.idPedido = b.idPedidoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN cliente AS d ON a.idClienteFK = d.idCliente" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        kit = req.body['idKit'];
        cabecalho = req.body;
        const idProdutorFK = cabecalho.idProdutorFK;
        const idCarrinhoFK = cabecalho.idCarrinhoFK;
        const statusPedido = "PENDENTE"
        const idClienteFK = req.headers.authorization;

        query(`INSERT INTO pedido (idClienteFK, idProdutorFK, statusPedido) VALUES 
        ('${idClienteFK}', '${idProdutorFK}', '${statusPedido}')`,
        function (error, result, field) {
             if (error) {
                 res.json(error);
            } else {
                res.json(result);
                idPedidoFK = result['insertId'];
                const gerouPedido = 1;
                query(`INSERT INTO pedidoKit (idPedidoFK, idKitFK) VALUES
                        ('${idPedidoFK}', '${kit}')`,
                        function (error, results, field) {
                        if (error) {
                            console.log(error);
                        } else {
                            let filter = '';
                            filter = ' WHERE idCarrinho = ' + parseInt(idCarrinhoFK);
                            query(`UPDATE carrinho SET gerouPedido = ('${gerouPedido}')` + filter,
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
        const status = req.body.status;
        const idPedidoFK = req.body.idPedido;
        filter = ' WHERE idPedido = ' + parseInt(idPedidoFK);
        if(req.params.idPedidoFK) filter = ' WHERE idPedido=' + parseInt(req.params.idPedido);
        query(`UPDATE pedido SET statusPedido = ('${status}')` + filter,
        function (error, results, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
    },
}
    
            
        


