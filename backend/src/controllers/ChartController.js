const {query} = require('../database/connectionMysql');

let idKitFK;
let kit;
idChartFK = 0;

module.exports = {
    index(req, res){
        const idCliente = req.headers.authorization;
        let filter = '';
        if(idCliente) filter = ' WHERE a.idClienteFK = ' + parseInt(idCliente) + ' AND a.gerouPedido = 0  ';
        query("SELECT a.idCarrinho, a.gerouPedido,a.idClienteFK, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.emailProdutor, d.cnpjProdutor FROM carrinho AS a INNER JOIN carrinhoKit AS b ON a.idCarrinho = b.idCarrinhoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtor AS d ON d.idProdutor = c.idProdutorFK" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },
    indexProducts (req, res){
        const idCliente = req.headers.authorization;
        let filter = '';
        if(idCliente) filter = ' WHERE idClienteFK=' + parseInt(idCliente) + ' AND a.gerouPedido = 0  ';
        query("SELECT d.idProdutoKit, e.descricao, e.caloria, e.precoUnit FROM carrinho AS a INNER JOIN carrinhoKit AS b ON a.idCarrinho = b.idCarrinhoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtoKit AS d ON d.idKitFK = c.idKit INNER JOIN produto AS e ON d.idProdutoFK = e.idProduto" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    delete(req, res){
        const idChart = req.params.idChart;
        let filter = '';
        if(idChart) filter = ' WHERE idCarrinho=' + parseInt(idChart);
        query("DELETE FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                console.log("deu erro");
            } else {
                if(idChart) filter = ' WHERE idCarrinhoFK=' + parseInt(idChart);
                    query("DELETE FROM carrinhoKit;" + filter, function (error, result, field) {
                    if (error) {
                        console.log("deu erro")
                    } else {
                        console.log("carrinho totalmente excluido")
                    }
                });
            }
        });
        
    },

    create(req, res){
        kit = req.body['idKit'];
        cabecalho = req.body['idClienteFK'];
        const idClienteFK = cabecalho;
        let filter = '';
        if(idClienteFK) filter = ' WHERE idClienteFK=' + parseInt(idClienteFK) + ' AND gerouPedido = 0  ';
         query("SELECT * FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                 res.json(error);
              } else {
                const pedidoAtivo = result;
                if(pedidoAtivo.length == 0){
                    query(`INSERT INTO carrinho (idClienteFK) VALUES 
                    ('${idClienteFK}')`,
                    function (error, result, field) {
                        if (error) {
                            res.json(error);    
                        } else {
                            res.json(result);
                            idChartFK = result['insertId'];
                            query(`INSERT INTO carrinhoKit (idCarrinhoFK, idKitFK) VALUES
                            ('${idChartFK}', '${kit}')`,
                            function (error, results, field) {
                                if (error) {
                                    console.log("Carrinho deu Erro!")
                                } else {
                                    console.log("Carrinho deu buena");
                                }
                            });
                        }
                    });       
                }
                else{
                    console.log("Revisar.");
                }
            }
        });
    }
}