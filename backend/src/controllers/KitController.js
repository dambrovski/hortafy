//const mysql = require('../database/connectionMysql');
const {query} = require('../database/connectionMysql');


let idKitFK;
produtos = [];
idProdutoFK = 0;


const crypto = require('crypto');

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idKit) filter = ' WHERE a.idKit=' + parseInt(req.params.idKit);
        query("SELECT * FROM kit AS a INNER JOIN produtor AS b ON a.idProdutorFK = b.idProdutor" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexFull(req, res){
        
        let filter = '';
        if(req.params.idKit) filter = ' WHERE a.idKit=' + parseInt(req.params.idKit);
        console.log(filter);
        query("SELECT a.idKit, a.descricaoKit, a.precoKit, a.idProdutorFK, b.idKitFK, b.idProdutoFK, c.nome, c.cnpjProdutor FROM kit AS a INNER JOIN produtoKit AS b ON a.idKit = b.idKitFK INNER JOIN produtor AS c ON a.idProdutorFK = c.idProdutor" + filter, function (error, result, field) {
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
        query("SELECT * FROM kit" + filter, function (error, result, field) { 
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        const {descricaoKit, precoKit} = req.body['cabecalho'];
        produtos = req.body['produtos'];
        
        const idProdutorFK = req.headers.authorization;
        query(`INSERT INTO kit (descricaoKit, precoKit, idProdutorFK) VALUES 
        ('${descricaoKit}', '${precoKit}','${idProdutorFK}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
                idKitFK = result['insertId'];
                console.log(idKitFK);
                for (let index = 0; index < produtos.length; index++) {
                    element = produtos[index];
                    idProdutoFK = element.idProduto;
                   console.log(idProdutoFK);
                   query(`INSERT INTO produtoKit (idKitFK, idProdutoFK) VALUES
                   ('${idKitFK}', '${idProdutoFK}')`,
                   function (error, results, field) {
                       if (error) {
                           console.log("oi")
                       } else {
                           console.log("tchau")
                    }
                  });
               }
            }
        });
        

    }
}

   
