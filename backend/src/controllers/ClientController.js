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
        
        const {email, cartaoCredito, instituicaoCaridosa, admin, senha} = req.body;
        
        filter = " WHERE email= '" + email;        
        teste = query("SELECT * FROM cliente" + filter + "'", function (error, result, field) {
            if (error) {

                query(`INSERT INTO cliente 
                (email, cartaoCredito, instituicaoCaridosa, admin, senha) 
                VALUES 
                ('${email}', '${cartaoCredito}', '${instituicaoCaridosa}', '${admin}', '${senha}')`,
                function (error, result, field) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(result);
                    }
            })
            } else {
                console.log("existe na base");
                res.json(result);
            }
        });
        

    },
}
