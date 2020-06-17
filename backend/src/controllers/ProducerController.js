const {query} = require('../database/connectionMysql');
const Producer = require("../models/producer");
let produtor = new Producer;

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
        produtor = req.body;
        console.log(produtor);
        produtorExiste = true;
        filter = " WHERE emailProdutor='" + produtor.emailProdutor + "'";        
        console.log(produtor.emailProdutor);
        console.log(filter);
        query("SELECT * FROM produtor" + filter, function (error, result, field) {
        if (result.length < 1){
            query(`INSERT INTO produtor 
            (emailProdutor, cnpjProdutor, senha) 
            VALUES 
            ('${produtor.emailProdutor}', '${produtor.cnpjProdutor}', '${produtor.senha}')`,
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
