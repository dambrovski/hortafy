const {query} = require('../database/connectionMysql');

const Kit = require("../models/kit");
const Chart = require("../models/chart");

let kit = new Kit;
let chart = new Chart;

idChartFK = 0;

module.exports = {
    index(req, res){
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE a.idClienteFK = ' + parseInt(req.headers.authorization) + ' AND a.gerouPedido = 0  ';
        query("SELECT a.idCarrinho, a.gerouPedido,a.idClienteFK, b.idKitFK, c.descricaoKit, c.precoKit, c.idProdutorFK, d.emailProdutor, d.cnpjProdutor FROM carrinho AS a INNER JOIN carrinhoKit AS b ON a.idCarrinho = b.idCarrinhoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtor AS d ON d.idProdutor = c.idProdutorFK" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },
    indexProducts (req, res){
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE idClienteFK=' + parseInt(req.headers.authorization) + ' AND a.gerouPedido = 0  ';
        query("SELECT d.idProdutoKit, e.descricao, e.caloria, e.precoUnit FROM carrinho AS a INNER JOIN carrinhoKit AS b ON a.idCarrinho = b.idCarrinhoFK INNER JOIN kit AS c ON b.idKitFK = c.idKit INNER JOIN produtoKit AS d ON d.idKitFK = c.idKit INNER JOIN produto AS e ON d.idProdutoFK = e.idProduto" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    delete(req, res){
        let filter = '';
        if(req.params.idChart) filter = ' WHERE idCarrinho=' + parseInt(req.params.idChart);
        query("DELETE FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                console.log("deu erro");
            } else {
                if(req.params.idChart) filter = ' WHERE idCarrinhoFK=' + parseInt(req.params.idChart);
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
        kit.idKit = req.body['idKit'];
        chart = req.body;
        let filter = '';
        if(chart.idClienteFK) filter = ' WHERE idClienteFK=' + parseInt(chart.idClienteFK) + ' AND gerouPedido = 0  ';
         query("SELECT * FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                 res.json(error);
              } else {
                const pedidoAtivo = result;
                if(pedidoAtivo.length == 0){
                    query(`INSERT INTO carrinho (idClienteFK) VALUES 
                    ('${chart.idClienteFK}')`,
                    function (error, result, field) {
                        if (error) {
                            res.json(error);    
                        } else {
                            res.json(result);
                            chart.idCarrinho = result['insertId'];
                            query(`INSERT INTO carrinhoKit (idCarrinhoFK, idKitFK) VALUES
                            ('${chart.idCarrinho}', '${kit.idKit}')`,
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