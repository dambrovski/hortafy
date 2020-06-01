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
        const {nome, cnpjProdutor, senha} = req.body;
        query(`INSERT INTO produtor 
        (nome, cnpjProdutor, senha) 
        VALUES 
        ('${nome}', '${cnpjProdutor}', '${senha}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    }
}