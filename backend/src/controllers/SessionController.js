const {query} = require('../database/connectionMysql');
const Session = require("../models/session");

let session = new Session;

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
        session = req.body;
        filter = session.value + " WHERE email" + session.value + "='";
        console.log(filter);
        query("SELECT * FROM " + filter + session.email + "'" + "AND senha='" + session.senha + "'", function (error, result, field) {
            console.log(result);
            if (result.length < 1) {
                    res.json(error);
            } else {
                res.json(result);
            }
        });
    }
}