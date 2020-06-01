//const mysql = require('../database/connectionMysql');
const {query} = require('../database/connectionMysql');


let idKitFK;
produtos = [];
idProdutoFK = 0;


const crypto = require('crypto');

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idKit) filter = ' WHERE idKit=' + parseInt(req.params.idKit);
        query("SELECT * FROM kit" + filter, function (error, result, field) {
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

   
