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
        console.log("producer controller called");
        const {email, cnpj, senha} = req.body;
        produtorExiste = true;
        filter = " WHERE email= '" + email;        
        query("SELECT * FROM produtor" + filter + "'", function (error, result, field) {
        console.log(result);
        if (result.length < 1){
        query(`INSERT INTO produtor 
        (email, cnpjProdutor, senha) 
        VALUES 
        ('${email}', '${cnpj}', '${senha}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        })
        }else{
            console.log("existe na base");
            produtorExiste = true;
            res.json(produtorExiste);
        }
    });
    }
}
