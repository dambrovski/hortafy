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
        clienteExiste = true;
        filter = " WHERE email= '" + email;        
        query("SELECT * FROM cliente" + filter + "'", function (error, result, field) {
            console.log(result);
            if (result.length < 1){
                query(`INSERT INTO cliente 
                (email, cartaoCredito, instituicaoCaridosa, admin, senha) 
                VALUES 
                ('${email}', '${cartaoCredito}', '${instituicaoCaridosa}', '${admin}', '${senha}')`,
                function (error, result, field) {
                    if (error) {
                        clienteExiste = true;
                        res.json(clienteExiste);
                        //res.json(error);
                    } else {
                        clienteExiste = false;
                        res.json(clienteExiste);
                    }
            })
            } else {
                console.log("existe na base");
                clienteExiste = true;
                res.json(clienteExiste);
                
                

            }
        });
        

    },
}
