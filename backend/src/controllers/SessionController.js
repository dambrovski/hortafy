const {query} = require('../database/connectionMysql');

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
        const {email,senha,value} = req.body;
        console.log(email,senha,value);
        filter = value + " WHERE email" + value + "='";
        console.log(filter);
        query("SELECT * FROM " + filter + email + "'" + "AND senha='" + senha + "'", function (error, result, field) {
            console.log(result);
            if (result.length < 1) {
                    res.json(error);
            } else {
                res.json(result);
            }
        });
    }
}
      