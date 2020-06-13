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
        const {email,senha,value} = req.body;
        console.log(value);
        filter = value + " WHERE email= '";
        
        console.log(filter);
        console.log("cheguei aqui filter")
        
        
        query("SELECT * FROM " + filter + email + "'" + "AND senha='" + senha + "'", function (error, result, field) {
            console.log(result);
            if (result.length < 1) {
                    res.json(error);
                    console.log("erro blz senha ou login, sei la");
            } else {
                res.json(result);
                console.log("achei pelo menos um aqui");
            }
        });
    }
}
      