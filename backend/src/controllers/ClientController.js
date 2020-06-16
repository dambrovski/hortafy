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
        const {email, cartaoCredito, senha} = req.body;
        clienteExiste = true;
        filter = " WHERE email= '" + email;        
        query("SELECT * FROM cliente" + filter + "'", function (error, result, field) {
            if (result.length < 1){
                query(`INSERT INTO cliente 
                (email, cartaoCredito, senha) 
                VALUES 
                ('${email}', '${cartaoCredito}', '${senha}')`,
                function (error, result, field) {
                    if (error) {
                        clienteExiste = true;
                        res.json(clienteExiste);
                    } else {
                        clienteExiste = false;
                        res.json(clienteExiste);
                    }
                })
            } else {
                clienteExiste = true;
                res.json(clienteExiste);
            }
        });
    }
}