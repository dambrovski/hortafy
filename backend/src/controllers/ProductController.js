const {query} = require('../database/connectionMysql');

const crypto = require('crypto');

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
        const idProdutorFK = req.headers.authorization;
        if(idProdutorFK) filter = ' WHERE idProdutorFK=' + parseInt(idProdutorFK);
        query("SELECT * FROM produto" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        const {descricao, precoUnit, caloria} = req.body;
        const idProdutorFK = req.headers.authorization;
        query(`INSERT INTO produto
        (descricao, precoUnit, caloria, idProdutorFK) 
        VALUES 
        ('${descricao}', '${precoUnit}', '${caloria}', '${idProdutorFK}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    }
}
    
