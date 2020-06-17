const {query} = require('../database/connectionMysql');
const Institution = require("../models/institution");
let instituicao = new Institution;

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idInstituicao) filter = ' WHERE idInstituicao=' + parseInt(req.params.idInstituicao);
        query("SELECT * FROM instituicao" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        instituicao = req.body;

        instituicaoExiste = true;
        filter = " WHERE emailInstituicao= '" + instituicao.emailInstituicao;        
        query("SELECT * FROM instituicao" + filter + "'", function (error, result, field) {
        if (result.length < 1){
            query(`INSERT INTO instituicao 
            (emailInstituicao, cnpjInstituicao, senha) 
            VALUES 
            ('${instituicao.emailInstituicao}', '${instituicao.cnpjInstituicao}', '${instituicao.senha}')`,
            function (error, result, field) {
                if (error) {
                    res.json(error);
                    console.log(result);
                } else {
                    res.json(result);
                }
            })
                }else{
                    instituicaoExiste = true;
                    res.json(instituicaoExiste);
                }
        });
    }
}
