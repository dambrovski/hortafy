const {query} = require('../database/connectionMysql');
const Product = require("../models/product");
let produto = new Product;

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idProduto) filter = ' WHERE idProduto=' + parseInt(req.params.idProduto);
        query("SELECT * FROM produto" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    indexByProducer(req, res){
        let filter = '';
        produto.idProdutorFK = req.headers.authorization;
        if(produto.idProdutorFK) filter = ' WHERE idProdutorFK=' + parseInt(produto.idProdutorFK);
        query("SELECT * FROM produto" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        produto = req.body;
        produtoExiste = true;

        filter = " WHERE descricao= '" + produto.descricao + "AND idProdutorFK = " + req.headers.authorization;        
        query("SELECT * FROM produto" + filter + "'", function (error, result, field) {
            
        if (result.length < 1){
            query(`INSERT INTO produto
            (descricao, precoUnit, caloria, idProdutorFK) 
            VALUES 
            ('${produto.descricao}', '${produto.precoUnit}', '${produto.caloria}', '${req.headers.authorization}')`,
            function (error, result, field) {
                if (error) {
                    res.json(error);
                } else {
                    res.json(result);
                }
            })
        }else{
            produtoExiste = true;
            res.json(produtoExiste);
        }
        });
    }
}
