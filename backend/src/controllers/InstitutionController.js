const {query} = require('../database/connectionMysql');

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
        const {emailInstituicao, cnpj, senha} = req.body;
        instituicaoExiste = true;
        filter = " WHERE emailInstituicao= '" + emailInstituicao;        
        query("SELECT * FROM instituicao" + filter + "'", function (error, result, field) {
        if (result.length < 1){
            query(`INSERT INTO instituicao 
            (emailInstituicao, cnpjInstituicao, senha) 
            VALUES 
            ('${emailInstituicao}', '${cnpj}', '${senha}')`,
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
