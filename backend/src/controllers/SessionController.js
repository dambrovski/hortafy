const {query} = require('../database/connectionMysql');

const crypto = require('crypto');

module.exports = {

    
    index(req, res){
        let filter = ''
        if(req.params.idCliente) filter = ' WHERE idCliente=' + parseInt(req.params.idCliente);
        query("SELECT * FROM cliente" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        console.log("criei a sessão");
        const {email,senha} = req.body;
        console.log(email);
        console.log(email);
        filter = " WHERE email= '";
        
        console.log(filter);
        console.log("cheguei aqui filter")
        
        
        query("SELECT * FROM cliente" + filter + email + "'", function (error, result, field) {
            console.log(result);
            if (error) {
                    res.json(error);
                    console.log("erro blz");
            } else {
                res.json(result);
            }
        });
    }
}
      