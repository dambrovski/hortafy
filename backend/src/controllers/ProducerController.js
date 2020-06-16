const {query} = require('../database/connectionMysql');

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idProdutor) filter = ' WHERE idProdutor=' + parseInt(req.params.idProdutor);
        query("SELECT * FROM produtor" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        const {emailProdutor, cnpj, senha} = req.body;
        produtorExiste = true;
        filter = " WHERE emailProdutor= '" + emailProdutor;        
        query("SELECT * FROM produtor" + filter + "'", function (error, result, field) {
        if (result.length < 1){
            query(`INSERT INTO produtor 
            (emailProdutor, cnpjProdutor, senha) 
            VALUES 
            ('${emailProdutor}', '${cnpj}', '${senha}')`,
            function (error, result, field) {
                if (error) {
                    res.json(error);
                } else {
                    res.json(result);
                }
            })
                }else{
                    produtorExiste = true;
                    res.json(produtorExiste);
                }
        });
    }
}
