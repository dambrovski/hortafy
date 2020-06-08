//const mysql = require('../database/connectionMysql');
const {query} = require('../database/connectionMysql');


let idKitFK;
let kit;
idChartFK = 0;


module.exports = {
    index(req, res){
        console.log("called chart controller");
        let filter = '';
        if(req.params.idChart) filter = ' WHERE idCarrinho=' + parseInt(req.params.idChart);
        query("SELECT * FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },


    create(req, res){
        console.log("create chart called");
        console.log(req.body);

        kit = req.body['idKit'];
        cabecalho = req.body['idClienteFK'];
        const idClienteFK = cabecalho;
        
        
        console.log(kit);
        console.log(idClienteFK);
        
        //SELECT * FROM carrinho WHERE idClienteFK = 2  AND gerouPedido = 0
        
        let filter = '';
        if(idClienteFK) filter = ' WHERE idClienteFK=' + parseInt(idClienteFK) + ' AND gerouPedido = 0  ';
         query("SELECT * FROM carrinho" + filter, function (error, result, field) {
            if (error) {
                 res.json(error);
              } else {
                const pedidoAtivo = result;
                console.log("printando resultado da busca");
                console.log(pedidoAtivo);
                if(pedidoAtivo.length == 0){
                query(`INSERT INTO carrinho (idClienteFK) VALUES 
               ('${idClienteFK}')`,
               function (error, result, field) {
                    if (error) {
                        res.json(error);
                       console.log("noticia ruim");
                   } else {
                       res.json(result);
                       idChartFK = result['insertId'];
                       console.log(idChartFK);
                       query(`INSERT INTO carrinhoKit (idCarrinhoFK, idKitFK) VALUES
                        ('${idChartFK}', '${kit}')`,
                        function (error, results, field) {
                        if (error) {
                            console.log(results);
                            console.log(error);
                            console.log("Carrinho deu Erro!")
                        } else {
                            console.log("Carrinho deu buena");
                        }
                    });
                   }
                });       
            }
            else{
                console.log("salve");
             }
            }
        });
        }
    }

   

